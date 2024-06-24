import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SearchBar, Text } from "react-native-elements";
import Lender from "./Lender";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

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

function SearchLenders({ navigation }) {
  const [search, setSearch] = useState("");
  const [lenders, setLenders] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(firestore, "users");
    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      setLenders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  const filteredLenders = lenders.filter(({ data }) =>
    data.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBar
        round
        lightTheme
        placeholder="Enter State i.e. TN"
        onChangeText={(text) => setSearch(text)}
        value={search}
        containerStyle={{ backgroundColor: "#fff" }}
        inputContainerStyle={{ backgroundColor: "#fff" }}
      />

      <ScrollView>
        {filteredLenders.length > 0 ? (
          filteredLenders.map(({ id, data }) => (
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
