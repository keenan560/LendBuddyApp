import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SearchBar, Text } from "react-native-elements";
import Lender from "./Lender";
import * as firebase from "firebase";

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/firestore";

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
function SearchLenders({ navigation }) {
  const [search, setSearch] = useState("");
  const [loading, SetLoading] = useState(false);
  const [lenders, setLenders] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        setLenders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        round
        lightTheme
        placeholder="Enter State i.e. TN"
        onChangeText={(text) => {
          setSearch(text), setLenders(searchLenders);
        }}
        value={search}
        containerStyle={{ backgroundColor: "#fff" }}
        inputContainerStyle={{ backgroundColor: "#fff" }}
      />

      <ScrollView>
        {lenders ? (
          lenders.map(({ id, data }) => (
            <Lender
              key={id}
              name={data.firstName}
              // rating={data.rating}
              city={data.city}
              online={data.activeLender}
            />
          ))
        ) : (
          <Text h4 style={{ textAlign: "center", color: "gray" }}>
            No results..
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

export default SearchLenders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
