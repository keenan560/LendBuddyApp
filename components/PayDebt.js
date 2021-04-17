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
  const [id, setId] = useState([]);
  const [debts, setDebts] = useState([]);

  const getDocId = async () => {
    await firebase
      .firestore()
      .collection("users")
      .where("email", "==", `${value.user.user.email}`)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setId(doc.id);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    firebase
      .firestore()
      .collection("users")
      .doc(`${id}`)
      .collection("debts")
      .orderBy("lender", "asc")
      .onSnapshot((snapshot) =>
        setDebts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  };

  useEffect(() => {
    getDocId();
  }, [id]);

  const totalDebt = (debts) => {
    let total = 0;
    for (let i = 0; i < debts.length; i++) {
      total += parseInt(debts[i].data.amountOwed);
    }

    return total;
  };
  return (
    <View style={styles.container}>
      <Text h4>Total Debt: ${debts.length > 0 ? totalDebt(debts) : 0}</Text>
      <Text>Buddies:{debts ? debts.length : 0}</Text>
      <ScrollView>
        {debts.length ? (
          debts.map(({ id, data }) => (
            <View>
              <Debt
                key={id}
                lender={data.lender}
                amountBorrowed={data.amountBorrowed}
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
