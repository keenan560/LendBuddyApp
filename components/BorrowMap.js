import React, { useState, useEffect, useContext, useRef } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import CurrentLocationButton from "./CurrentLocationButton";
import { Button, Overlay } from "react-native-elements";
import UserContext from "./context/userContext";
import { SpotRequestContext } from "../App";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import ConfettiCannon from "react-native-confetti-cannon";

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

export default function BorrowMap({ navigation }) {
  const value = useContext(UserContext);
  const requestContext = useContext(SpotRequestContext);
  const [lenders, setLenders] = useState([]);
  const [location, setLocation] = useState({
    coords: {
      latitude: 36.15596,
      longitude: -86.781663,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(false);
  const [approved, setApproved] = useState(false);
  const [denied, setDenied] = useState(false);

  const mapView = useRef(null);

  useEffect(() => {
    const userDocRef = doc(firestore, "users", value.userData.id);
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      setUser(snapshot.data());
    });
    return () => unsubscribe();
  }, [value.userData.id]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        ...location.coords,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      getLenders();
    })();
  }, []);

  useEffect(() => {
    const resultsCollectionRef = collection(
      firestore,
      "users",
      value.userData.id,
      "results"
    );
    const unsubscribe = onSnapshot(resultsCollectionRef, (snapshot) => {
      const requestResults = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      requestResults.forEach(({ id, data }) => {
        decisionMaker(id, data);
      });
    });
    return () => unsubscribe();
  }, [value.userData.id]);

  const getLenders = () => {
    const usersCollectionRef = collection(firestore, "users");
    onSnapshot(usersCollectionRef, (snapshot) => {
      setLenders(
        snapshot.docs
          .map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
          .filter((lender) => lender.data.activeLender)
      );
    });
  };

  const demoRequest = (id) => {
    Alert.alert(
      "Request",
      "Ask this lender to spot you?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            toggleOverlay();
            await addDoc(collection(firestore, "users", id, "requests"), {
              firstName: value.userData.firstName,
              lastName: value.userData.lastName,
              borrowerID: value.userData.id,
              city: value.userData.city,
              state: value.userData.state,
              requestAmount: requestContext.requestState.amount,
              category: requestContext.requestState.category,
              decision: "pending",
              timeStamp: serverTimestamp(),
            })
              .then((docRef) => {
                addToResults(docRef.id);
              })
              .catch((error) => alert(error.message));
          },
        },
      ],
      { cancelable: false }
    );
  };

  const addToResults = (id) => {
    setDoc(doc(firestore, "users", value.userData.id, "results", id), {
      firstName: value.userData.firstName,
      lastName: value.userData.lastName,
      borrowerID: value.userData.id,
      city: value.userData.city,
      state: value.userData.state,
      requestAmount: requestContext.requestState.amount,
      category: requestContext.requestState.category,
      decision: "pending",
      timeStamp: serverTimestamp(),
    }).catch((error) => alert(error.message));
  };

  const decisionMaker = (id, data) => {
    switch (data.decision) {
      case "denied":
        deleteDoc(doc(firestore, "users", value.userData.id, "results", id))
          .then(() => console.log("Document successfully deleted!"))
          .catch((error) => console.error("Error removing document: ", error));
        setVisible(false);
        setDenied(true);
        setTimeout(() => setDenied(false), 3000);
        break;
      case "approved":
        setVisible(false);
        setApproved(true);
        updateDoc(doc(firestore, "users", value.userData.id), {
          totalDebt: user
            ? user.totalDebt + data.requestAmount
            : data.requestAmount,
        })
          .catch((errorMsg) => console.log(errorMsg.message))
          .then(() => {
            deleteDoc(
              doc(firestore, "users", value.userData.id, "results", id)
            );
          });
        break;
      default:
        break;
    }
  };

  const toggleOverlay = () => setVisible(!visible);
  const toggleApproved = () => setApproved(!approved);
  const toggleDenied = () => setDenied(!denied);
  const finished = () => {
    toggleApproved();
    navigation.navigate("Dashboard");
  };

  const centerMap = () => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = location;
    mapView.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    });
  };

  return (
    <View style={styles.container}>
      <Overlay
        style={{ height: "auto", width: "100%", flex: 1 }}
        isVisible={visible}
      >
        <Text style={{ width: "100%", fontSize: 18 }}>
          Lender is making a decision...
        </Text>
        <MaterialCommunityIcons
          style={{ textAlign: "center" }}
          name="timer-sand"
          size={24}
          color="black"
        />
      </Overlay>
      <Overlay
        style={{
          height: "auto",
          width: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        isVisible={denied}
      >
        <Text style={{ width: "100%", fontSize: 18 }}>
          Sorry, the lender cannot spot you.
        </Text>
        <FontAwesome
          style={{ textAlign: "center" }}
          name="thumbs-o-down"
          size={30}
          color="black"
        />
      </Overlay>
      <Overlay
        style={{ backgroundColor: "#fff", flex: 0.8 }}
        isVisible={approved}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ConfettiCannon
            count={200}
            origin={{ x: -10, y: 0 }}
            fadeOut
            fallSpeed={4000}
          />
          <Text style={{ fontSize: 30, marginBottom: 20 }}>
            Congratulations! You have been{" "}
            <Text style={{ color: "#28a745" }}>approved</Text> by the lender!
          </Text>

          <Button
            title="Dashboard"
            containerStyle={{ marginBottom: 20 }}
            buttonStyle={{ borderRadius: 5 }}
            onPress={finished}
          />
          <Text>Funds will be deposited shortly.</Text>
        </View>
      </Overlay>
      <View style={{ backgroundColor: "#ffff", padding: 10 }}>
        <Text style={{ fontSize: 14, color: "gray", fontWeight: "bold" }}>
          We are looking for lenders to spot you $
          {requestContext.requestState.amount} for{" "}
          {requestContext.requestState.category}...
        </Text>
      </View>
      <CurrentLocationButton cb={centerMap} />
      {location ? (
        <MapView
          // provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsCompass
          showsUserLocation={true}
          rotateEnabled={false}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref={mapView}
        >
          {lenders.map(({ id, data }) => (
            <View key={id} style={{ alignItems: "center" }}>
              <Marker
                coordinate={data.coordinates}
                title={data.firstName}
                style={{ alignItems: "center" }}
                onPress={() => demoRequest(id)}
              >
                <Image
                  source={require("../assets/moneybag.jpg")}
                  style={{ width: 50, height: 45, borderRadius: 20 }}
                />
              </Marker>
            </View>
          ))}
        </MapView>
      ) : (
        <Text style={{ flex: 1, fontSize: 24 }}>Loading..</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
    height: "100%",
  },
});
