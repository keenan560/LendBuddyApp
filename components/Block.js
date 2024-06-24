import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SearchBar, Overlay } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Avatar, Button } from "react-native-elements";
import UserContext from "./context/userContext";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

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

function Block({ navigation }) {
  const [search, setSearch] = useState("");
  const value = useContext(UserContext);
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    // on loading pull all blocked users
    const blockListCollectionRef = collection(
      doc(firestore, "users", value.userData.id),
      "blockList"
    );
    const unsubscribe = onSnapshot(blockListCollectionRef, (snapshot) =>
      setList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => unsubscribe();
  }, [value.userData.id]);

  useEffect(() => {
    // on loading pull all users
    const usersCollectionRef = collection(firestore, "users");
    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) =>
      setFilter(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => unsubscribe();
  }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const findUsers = async () => {
    const usersQuery = query(
      collection(firestore, "users"),
      where("firstName", "array-contains", search)
    );
    const unsubscribe = onSnapshot(usersQuery, (snapshot) =>
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
    const blockListDocRef = doc(
      collection(doc(firestore, "users", value.userData.id), "blockList"),
      id
    );
    await setDoc(blockListDocRef, {
      id: id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      city: data.city,
      state: data.state,
    });
    setFilter(filter.filter((user) => user.id !== id));
  };

  const unBlockUser = (id, data) => {
    const blockListDocRef = doc(
      collection(doc(firestore, "users", value.userData.id), "blockList"),
      id
    );
    deleteDoc(blockListDocRef)
      .then(() => alert(data.firstName + " is unblocked."))
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <ScrollView
          style={{ maxHeight: 325 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ width: 325 }}>
            {filter.length > 0 ? (
              filter
                .filter((user) => {
                  if (search === "") {
                    return user;
                  }

                  if (
                    user.data.firstName
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return user;
                  }
                  if (
                    user.data.lastName
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return user;
                  }
                  return null;
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
              onPress={(event) => unBlockUser(id, data)}
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
