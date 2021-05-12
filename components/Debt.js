import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Avatar, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { PricingCard } from "react-native-elements";
import UserContext from "./context/userContext";
import firebase from "firebase";

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
    firebase
      .firestore()
      .collection("users")
      .doc(`${value.userData.id}`)
      .collection("debts")
      .doc(`${id}`)
      .onSnapshot((snapshot) => {
        setCurrentBal(snapshot.data());
      });
  }, []);

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
          onPress: () => {
            // apply payment to debt in lender's collection
            firebase
              .firestore()
              .collection("users")
              .doc(`${lenderID}`)
              .collection("debtors")
              .doc(`${id}`)
              .update({
                balance: currentBal.balance - amountOwed,
                amountOwed: amountOwed,
              })
              .then(() => {
                // apply payment to borrower's balance.
                firebase
                  .firestore()
                  .collection("users")
                  .doc(`${value.userData.id}`)
                  .collection("debts")
                  .doc(`${id}`)
                  .update({
                    balance: currentBal.balance - amountOwed,
                    amountOwed: amountOwed,
                  });
              })
              .catch((error) => alert(error.message));
          },
        },
      ],
      { cancelable: false }
    );
    console.log(currentBal.balance);
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
