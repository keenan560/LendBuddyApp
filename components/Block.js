import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SearchBar, Overlay } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Avatar, Button } from "react-native-elements";
import UserContext from "./context/userContext";
import * as firebase from "firebase";

// Optionally import the services that you want to use
import "firebase/auth";
// import "firebase/database";
import "firebase/firestore";
import { event } from "react-native-reanimated";
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
  const [visible, setVisible] = useState(false);
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState([]);
  useEffect(() => {
    // on loading pull all blocked users
    firebase
      .firestore()
      .collection("users")
      .doc(`${value.userData.id}`)
      .collection("blockList")
      .onSnapshot((snapshot) =>
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) =>
        setFilter(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

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

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const findUsers = async () => {
    await firebase
      .firestore()
      .collection("users")
      .where("firstName", "array-contains", `${search}`)
      .onSnapshot((snapshot) =>
        setResults(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    toggleOverlay();
  };

  const blockUser = async (id, data) => {
    await firebase
      .firestore()
      .collection("users")
      .doc(`${value.userData.id}`)
      .collection("blockList")
      .doc(`${id}`)
      .set({
        id: id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        city: data.city,
        state: data.state,
      });
      
      
  };

  console.log(list);
  return (
    <View style={styles.container}>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <ScrollView style={{ maxHeight: 325 }}>
          <View style={{ width: 325 }}>
            {filter.length > 0 ? (
              filter
                .filter((user) => {
                  if (search == "") {
                    return user;
                  }

                  if (
                    user.data.firstName
                      .toLowerCase()
                      .includes(search.toLocaleLowerCase())
                  ) {
                    return user;
                  }
                  if (
                    user.data.lastName
                      .toLowerCase()
                      .includes(search.toLocaleLowerCase())
                  ) {
                    return user;
                  }
                })
                .map(({ id, data }) => (
                  <ListItem bottomDivider key={id}>
                    <Avatar
                      source={{
                        uri: `${data.firstName[0]}${data.lastName[0]}`,
                      }}
                      title={`${data.firstName[0]}${data.lastName[0]}`}
                      rounded
                      size="medium"
                    />
                    <ListItem.Content>
                      <ListItem.Title
                        style={{ fontWeight: "bold", fontSize: 20 }}
                      >
                        {`${data.firstName} ${data.lastName}`}
                      </ListItem.Title>
                      <ListItem.Subtitle>{`${data.city}, ${data.state}`}</ListItem.Subtitle>
                    </ListItem.Content>
                    <Button
                      title="Block"
                      onPress={() => blockUser(id, data)}
                      type="solid"
                      titleStyle={{ fontWeight: "bold" }}
                    />
                  </ListItem>
                ))
            ) : (
              <Text style={{ textAlign: "center" }}>No Users</Text>
            )}
          </View>
        </ScrollView>
        <Button
          title={"Close"}
          style={{ marginBottom: 0, marginTop: 30 }}
          onPress={toggleOverlay}
        />
      </Overlay>
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
          onSubmitEditing={findUsers}
        />

        {list.map(({ id, data }) => (
          <ListItem bottomDivider key={id}>
            <Avatar
              source={{
                uri: `${data.firstName[0]}${data.lastName[0]}`,
              }}
              title={`${data.firstName[0]}${data.lastName[0]}`}
              rounded
              size="medium"
            />
            <ListItem.Content>
              <ListItem.Title style={{ fontWeight: "bold", fontSize: 20 }}>
                {`${data.firstName} ${data.lastName}`}
              </ListItem.Title>
              <ListItem.Subtitle>{`${data.city}, ${data.state}`}</ListItem.Subtitle>
            </ListItem.Content>
            <Button
              title="Unblock"
              onPress={""}
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
