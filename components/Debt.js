import React, { useState, useEffect, useContext } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { PricingCard } from "react-native-elements";
import UserContext from "./context/userContext";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";

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
const firestore = getFirestore(app);

function Debt({
  id,
  status,
  lender,
  category,
  lenderID,
  originDate,
  balance,
  loanAmount,
  amountOwed,
  nextPaymentDate,
  cb,
}) {
  const value = useContext(UserContext);
  const [currentBal, setCurrentBal] = useState([]);

  useEffect(() => {
    // get current balance of debt
    const debtDocRef = doc(firestore, "users", value.userData.id, "debts", id);
    const unsubscribe = onSnapshot(debtDocRef, (snapshot) => {
      setCurrentBal(snapshot.data());
    });
    return () => unsubscribe();
  }, [value.userData.id, id]);

  const requestExt = () => {};
  const makePayment = () => {
    Alert.alert(
      "Paying a Debt",
      `Are you sure you want to pay ${lender} $${amountOwed} on ${new Date().toLocaleDateString()}?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              // apply payment to debt in lender's collection
              const lenderDebtDocRef = doc(
                firestore,
                "users",
                lenderID,
                "debtors",
                id
              );
              await updateDoc(lenderDebtDocRef, {
                balance: currentBal.balance - amountOwed,
                amountOwed: amountOwed,
              });

              // apply payment to borrower's balance.
              const borrowerDebtDocRef = doc(
                firestore,
                "users",
                value.userData.id,
                "debts",
                id
              );
              await updateDoc(borrowerDebtDocRef, {
                balance: currentBal.balance - amountOwed,
                amountOwed: amountOwed,
              });
            } catch (error) {
              alert(error.message);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <PricingCard
          color={status !== "late" ? "#3D5F9C" : "red"}
          cb={cb}
          title={lender}
          price={`$${amountOwed}`}
          info={[
            "Due: " + new Date(nextPaymentDate?.toDate()).toLocaleDateString(),
            "Loan Amount: $" + loanAmount,
            "Balance: $" + balance,
            "Date of Origination: " +
              new Date(originDate?.toDate()).toLocaleDateString(),
          ]}
          button={{
            title: status !== "late" ? "Make Payment" : " Request Extension",
            icon: status !== "late" ? "payment" : "access-time",
          }}
          containerStyle={{ width: 375 }}
          onButtonPress={status === "late" ? requestExt : makePayment}
        />
      </View>
    </View>
  );
}

export default Debt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    marginTop: 5,
  },
  title: {
    color: "#28a745",
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  oweText: {
    marginLeft: 10,
  },
  owe: {
    fontSize: 25,
  },
});
