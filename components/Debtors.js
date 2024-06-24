import React, { useEffect, useState, useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Debtor from "./Debtor";
import UserContext from "./context/userContext";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, onSnapshot } from "firebase/firestore";

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

function Debtors({ navigation }) {
  const [debtors, setDebtors] = useState([]);
  const value = useContext(UserContext);

  useEffect(() => {
    const debtorsCollectionRef = collection(
      doc(firestore, "users", value.userData.id),
      "debtors"
    );
    const unsubscribe = onSnapshot(debtorsCollectionRef, (snapshot) => {
      setDebtors(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => unsubscribe();
  }, [value.userData.id]);

  const totalDebt = (debtors) => {
    let total = 0;
    for (let i = 0; i < debtors.length; i++) {
      total += parseFloat(debtors[i].data.amountOwed);
    }
    return total;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text h4>
          Total Owed:{" "}
          {debtors.length > 0 ? `$${totalDebt(debtors).toFixed(2)}` : 0}
        </Text>
        <Text>Buddies: {debtors.length}</Text>
        {debtors.map(({ id, data }) => (
          <Debtor
            key={id}
            borrower={data.firstName}
            amountBorrowed={data.loanAmount}
            amountOwed={data.amountOwed}
            balance={data.balance}
            category={data.category}
            originDate={data.originDate}
            nextPaymentDate={data.nextPaymentDue}
            status={data.status}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Debtors;
