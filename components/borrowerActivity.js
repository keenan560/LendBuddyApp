import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { SearchBar } from "react-native-elements";
import Activity from "./Activity.js";
import * as firebase from "firebase";
import UserContext from "./context/userContext";

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

function borrowerActivity({ navigation }) {
  const value = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [id, setId] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(`${value.userData.id}`)
      .collection("borrowActivities")
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
        {activities.length ? (
          activities.map(({ id, data }) => (
            <Activity
              key={id}
              id={data.id}
              desc={data.desc}
              type={data.type}
              lender={data.lenderFirstName}
            />
          ))
        ) : (
          <Text>No activities</Text>
        )}
      </ScrollView>
    </View>
  );
}
export default borrowerActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
