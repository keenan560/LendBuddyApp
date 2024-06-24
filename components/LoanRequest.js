import React, { useState, useEffect, useContext } from "react";
import { View, Animated } from "react-native";
import { Text, Avatar, Overlay } from "react-native-elements";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { FontAwesome } from "@expo/vector-icons";
import UserContext from "./context/userContext";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  updateDoc,
  onSnapshot,
  collection,
  addDoc,
  deleteDoc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqmWfVvcJykYnjsBdfKzmfquz3C_OffXY",
  authDomain: "lend-buddy.firebaseapp.com",
  databaseURL: "https://lend-buddy.firebaseio.com",
  projectId: "lend-buddy",
  storageBucket: "lend-buddy.appspot.com",
  messagingSenderId: "986357455581",
  appId: "1:986357455581:web:aa2198f5634b08a6731934",
  measurementId: "G-H054QF3GX3",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

function LoanRequest({
  firstName,
  lastName,
  category,
  city,
  requestAmount,
  state,
  id,
  borrowerID,
  navigation,
}) {
  const [visible, setVisible] = useState(true);
  const [user, setUser] = useState(null);
  const value = useContext(UserContext);

  useEffect(() => {
    const userDocRef = doc(firestore, "users", value.userData.id);
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      setUser(snapshot.data());
    });
    return () => unsubscribe();
  }, [value.userData.id]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const nextweek = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  };

  const approveRequest = async () => {
    try {
      if (!user) {
        throw new Error("User data is not loaded yet.");
      }

      const lenderDocRef = doc(firestore, "users", value.userData.id);
      const lenderDebtCollectionRef = collection(lenderDocRef, "debtors");
      const borrowerDocRef = doc(firestore, "users", borrowerID);
      const borrowerDebtCollectionRef = collection(borrowerDocRef, "debts");
      const lenderActivityCollectionRef = collection(
        lenderDocRef,
        "lenderActivities"
      );

      const newDebtDocRef = await addDoc(lenderDebtCollectionRef, {
        borrowerID: borrowerID,
        lenderID: value.userData.id,
        firstName: firstName,
        lastName: lastName,
        category: category,
        city: city,
        state: state,
        loanAmount: requestAmount,
        balance: requestAmount + requestAmount * 0.12,
        amountOwed: (
          parseInt(requestAmount / 2) +
          parseFloat(parseInt(requestAmount / 2) * 0.12) +
          parseFloat(parseInt(requestAmount / 2) * 0.035)
        ).toFixed(2),
        principal: parseInt(requestAmount / 2),
        interest: parseFloat(parseInt(requestAmount / 2) * 0.12).toFixed(2),
        lbRevenue: parseFloat(parseInt(requestAmount / 2) * 0.035).toFixed(2),
        originDate: serverTimestamp(),
        nextPaymentDue: nextweek(),
        timeStamp: serverTimestamp(),
        status: "good",
      });

      await setDoc(doc(borrowerDebtCollectionRef, newDebtDocRef.id), {
        id: newDebtDocRef.id,
        lenderFirstName: value.userData.firstName,
        lenderLastName: value.userData.lastName,
        lenderID: value.userData.id,
        borrowerID: borrowerID,
        firstName: firstName,
        lastName: lastName,
        category: category,
        city: city,
        state: state,
        loanAmount: requestAmount,
        balance: requestAmount + requestAmount * 0.12,
        amountOwed: (
          parseInt(requestAmount / 2) +
          parseFloat(parseInt(requestAmount / 2) * 0.12) +
          parseFloat(parseInt(requestAmount / 2) * 0.035)
        ).toFixed(2),
        principal: parseInt(requestAmount / 2),
        interest: parseFloat(parseInt(requestAmount / 2) * 0.12).toFixed(2),
        lbRevenue: parseFloat(parseInt(requestAmount / 2) * 0.035).toFixed(2),
        originDate: serverTimestamp(),
        nextPaymentDue: nextweek(),
        timeStamp: serverTimestamp(),
        status: "good",
      });

      await updateDoc(lenderDocRef, {
        totalLent: user.totalLent + requestAmount,
      });

      await addDoc(lenderActivityCollectionRef, {
        borrowerFirstName: firstName,
        borrowerLastName: lastName,
        type: "spot",
        desc: `You lent $${requestAmount} to ${firstName} on ${new Date().toLocaleDateString()}`,
      });

      const resultDocRef = doc(firestore, "users", borrowerID, "results", id);
      const resultDocSnap = await getDoc(resultDocRef);

      if (resultDocSnap.exists()) {
        await updateDoc(resultDocRef, {
          decision: "approved",
        });

        await addDoc(collection(borrowerDocRef, "borrowActivities"), {
          lenderFirstName: value.userData.firstName,
          lenderLastName: value.userData.lastName,
          type: "loan",
          desc: `${
            value.userData.firstName
          } spotted you $${requestAmount} on ${new Date().toLocaleDateString()}`,
        });

        await deleteDoc(doc(lenderDocRef, "requests", id));
      } else {
        console.log("No such document!");
      }

      toggleOverlay();
    } catch (error) {
      console.error(error.message);
    }
  };

  const denyRequest = async () => {
    try {
      const resultDocRef = doc(firestore, "users", borrowerID, "results", id);
      const resultDocSnap = await getDoc(resultDocRef);

      if (resultDocSnap.exists()) {
        await updateDoc(resultDocRef, {
          decision: "denied",
        });

        await deleteDoc(
          doc(firestore, "users", value.userData.id, "requests", id)
        );
      } else {
        console.log("No such document!");
      }

      toggleOverlay();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View>
      <Overlay
        style={{ backgroundColor: "#fff", flex: 0.5 }}
        isVisible={visible}
        fullScreen
        children
      >
        <View
          style={{
            flex: 0.9,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Avatar
            source={{
              uri: "https://i.pinimg.com/originals/77/a7/a1/77a7a150b7752ae3bf8a73c58d490881.png",
            }}
            size={100}
            rounded
            title={`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`}
          />
          <Text style={{ fontSize: 30, marginBottom: 50, marginTop: 20 }}>
            {firstName} is asking for a{" "}
            <Text style={{ fontWeight: "bold" }}>${requestAmount}</Text> spot
            for {category} do you{" "}
            <Text style={{ color: "#28a745" }}>approve?</Text>
          </Text>
          <Text style={{ fontWeight: "normal", fontStyle: "italic" }}>
            {city}, {state}
          </Text>
          <Text style={{ fontWeight: "bold" }}>97% On Time Repayment Rate</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <FontAwesome
              name="check"
              size={100}
              color="#28a745"
              style={{ marginRight: 90 }}
              onPress={approveRequest}
            />
            <FontAwesome
              name="remove"
              size={100}
              color="#ff4d4d"
              onPress={denyRequest}
            />
          </View>
          <CountdownCircleTimer
            isPlaying
            size={90}
            duration={30}
            colors={[
              ["#004777", 0.4],
              ["#F7B801", 0.4],
              ["#A30000", 0.2],
            ]}
            onComplete={() => {
              denyRequest();
              return [true, 1000]; // repeat animation in 1.5 seconds
            }}
          >
            {({ remainingTime, animatedColor }) => (
              <Animated.Text style={{ color: animatedColor }}>
                {/* {remainingTime} */}
              </Animated.Text>
            )}
          </CountdownCircleTimer>
        </View>
      </Overlay>
    </View>
  );
}

export default LoanRequest;
