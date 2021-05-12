import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Debt from "./Debt";
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

function PayDebt({ navigation }) {
  const value = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(`${value.userData.id}`)
      .collection("debts")
      .onSnapshot((snapshot) =>
        setDebts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const totalDebt = (debts) => {
    let total = 0;
    for (let i = 0; i < debts.length; i++) {
      total += parseFloat(debts[i].data.amountOwed);
    }

    return total;
  };
  console.log(debts);
  return (
    <View style={styles.container}>
      <Text h4>
        Total Due: ${debts.length > 0 ? `${totalDebt(debts).toFixed(2)}` : 0}
      </Text>
      <Text>Buddies:{debts ? debts.length : 0}</Text>
      <ScrollView>
        {debts.length ? (
          debts.map(({ id, data }) => (
            <View>
              <Debt
                key={id}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 375,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default PayDebt;
