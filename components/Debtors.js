import React, { useEffect, useState, useContext } from "react";
import {
  Image,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-elements";
import Debtor from "./Debtor";
import UserContext from "./context/userContext";
import * as firebase from "firebase";

// Optionally import the services that you want to use
import "firebase/auth";
// import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Debtors({ navigation }) {
  const [debtors, setDebtors] = useState([]);
  const value = useContext(UserContext);
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(`${value.userData.id}`)
      .collection("debtors")
      .onSnapshot((snapshot) => {
        setDebtors(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  const totalDebt = (debtors) => {
    let total = 0;
    for (let i = 0; i < debtors.length; i++) {
      total += parseFloat(debtors[i].data.amountOwed);
    }

    return total;
  };

  // function currencyFormat(num) {
  //   return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  // }

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
