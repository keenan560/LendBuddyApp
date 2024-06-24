import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import UserContext from "./context/userContext";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, collection, onSnapshot } from "firebase/firestore";
import Debt from "./Debt";

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

function PayDebt({ navigation }) {
  const value = useContext(UserContext);
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    const debtsCollectionRef = collection(
      doc(firestore, "users", value.userData.id),
      "debts"
    );
    const unsubscribe = onSnapshot(debtsCollectionRef, (snapshot) => {
      setDebts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => unsubscribe();
  }, [value.userData.id]);

  const totalDebt = (debts) => {
    let total = 0;
    for (let i = 0; i < debts.length; i++) {
      total += parseFloat(debts[i].data.amountOwed);
    }
    return total;
  };

  return (
    <View style={styles.container}>
      <Text h4>
        Total Due: ${debts.length > 0 ? `${totalDebt(debts).toFixed(2)}` : 0}
      </Text>
      <Text>Buddies:{debts ? debts.length : 0}</Text>
      <ScrollView>
        {debts.length ? (
          debts.map(({ id, data }) => (
            <View key={id}>
              <Debt
                id={id}
                lenderID={data.lenderID}
                lender={data.lenderFirstName}
                loanAmount={data.loanAmount}
                balance={data.balance}
                amountOwed={data.amountOwed}
                originDate={data.originDate}
                nextPaymentDate={data.nextPaymentDue}
                status={data.status}
              />
            </View>
          ))
        ) : (
          <Text>No debts</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default PayDebt;
