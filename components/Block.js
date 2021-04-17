import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SearchBar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Avatar, Button } from "react-native-elements";
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

function Block({ navigation }) {
  const [search, setSearch] = useState("");
  const value = useContext(UserContext);
  const [list, setList] = useState([]);
  const [uid, setUid] = useState([]);

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
          setUid(doc.id);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    firebase
      .firestore()
      .collection("users")
      .doc(`${uid}`)
      .collection("blockList")
      .orderBy("name", "asc")
      .onSnapshot((snapshot) =>
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  };

  useEffect(() => {
    getDocId();
  }, [uid]);

  // Unblock someone
  //   const unblock = (event) => {
  //     event.preventDefault();
  // if () {

  //     firebase
  //       .firestore()
  //       .collection("users")
  //       .doc(`${uid}`)
  //       .collection("blocklist")
  //       .doc(`${key}`)
  //       .delete()
  //       .then((message) => console.log("user unblocked"))
  //       .catch(function (error) {
  //         console.log("Error getting documents: ", error);
  //       });
  // }

  //   };

  
  return (
    <View style={styles.container}>
      <ScrollView>
        <SearchBar
          lightTheme
          placeholder="Search for user"
          round
          onChangeText={(text) => setSearch(text.trim())}
          value={search}
          inputStyle={{ backgroundColor: "#fff" }}
          inputContainerStyle={{ backgroundColor: "#fff" }}
          containerStyle={{ backgroundColor: "#fff" }}
        />
        {list.map(({ id, data }) => (
          <ListItem bottomDivider key={id}>
            <Avatar
              source={{ uri: data.avatar_url }}
              title={data.name[0]}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title style={{ fontWeight: "bold", fontSize: 20 }}>
                {data.name}
              </ListItem.Title>
              <ListItem.Subtitle>{data.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <Button
              title="Unblock"
              onPress={() => alert("user is unblocked")}
              type="solid"
              titleStyle={{ fontWeight: "bold" }}
            />
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
}

export default Block;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
