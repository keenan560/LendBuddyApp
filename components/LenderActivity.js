import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { SearchBar } from "react-native-elements";
import Activity from "./Activity.js";
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
// const activities = [
//   {
//     id: 0,
//     desc: "You lent $50.00 to Carl on 12/18/20",
//     type: "Spot",
//     borrower: "Carl",
//   },
//   {
//     id: 1,
//     desc: "You lent $100.00 to Michelle on 12/20/20",
//     type: "Spot",
//     borrower: "Michelle",
//   },
//   {
//     id: 2,
//     desc: "You received a payment of $37.91 from Lance on 12/22/20",
//     type: "Income",
//     borrower: "Lisa",
//   },
//   {
//     id: 3,
//     desc: "You received a payment of $100.34 from Xavier on 12/29/20",
//     type: "Income",
//     borrower: "Xavier",
//   },
//   {
//     id: 4,
//     desc: "You received a payment of $20.45 from Will on 12/30/20",
//     type: "Income",
//     borrower: "Will",
//   },
//   {
//     id: 5,
//     desc: "You filed a claim on Harry for $64.87 on 12/30/20",
//     type: "Filed Claim",
//     borrower: "Harry",
//   },
// ];

function LendActivity({ navigation }) {
  const value = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(`${value.userData.id}`)
      .collection("lenderActivities")
      .onSnapshot((snapshot) =>
        setActivities(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        lightTheme
        placeholder="Search history"
        round
        onChangeText={(text) => setSearch(text.trim())}
        value={search}
        inputStyle={{ backgroundColor: "#fff" }}
        inputContainerStyle={{ backgroundColor: "#fff" }}
        containerStyle={{ backgroundColor: "#fff" }}
      />
      <ScrollView>
        {activities.map(({ id, data }) => (
          <Activity
            key={id}
            id={id}
            desc={data.desc}
            type={data.type}
            lender={data.borrower}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default LendActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
