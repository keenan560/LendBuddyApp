import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { SearchBar } from "react-native-elements";
import Activity from "./Activity.js";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, onSnapshot } from "firebase/firestore";
import UserContext from "./context/userContext";

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

function borrowerActivity({ navigation }) {
  const value = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const borrowActivitiesCollectionRef = collection(
      doc(firestore, "users", value.userData.id),
      "borrowActivities"
    );
    const unsubscribe = onSnapshot(borrowActivitiesCollectionRef, (snapshot) =>
      setActivities(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => unsubscribe();
  }, [value.userData.id]);

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
