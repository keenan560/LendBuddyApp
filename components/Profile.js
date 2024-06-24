import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Card, ListItem, Button, Avatar } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import UserContext from "./context/userContext";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

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
const storage = getStorage(app);

const details = {
  firstName: "John",
  lastName: "Smith",
  photoUrl: "",
  address: "123 Main Street",
  address2: "23",
  state: "NY",
  zip: 10001,
  mobile: "555-555-5555",
  email: "johnsmith123@yahoo.com",
  bankName: "JPMorgan Chase Bank N.A.",
  bankRoutingNumber: "021000021",
  bankAccountNumber: "123456789",
};

function Profile({ navigation }) {
  const value = useContext(UserContext);
  const [user, setUser] = useState({});
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    // Pull user's data on page load
    const userDocRef = doc(firestore, "users", value.userData.id);
    getDoc(userDocRef).then((doc) => setUser(doc.data()));
  }, [value.userData.id]);

  const chooseFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      const storageRef = ref(storage, `photos/${value.userData.id}`);
      const file = await fetch(result.uri);
      const blob = await file.blob();

      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
    }
  };

  return (
    <View>
      <ScrollView>
        <Card>
          <Card.Title>Profile Details</Card.Title>
          <View
            style={{
              flexDirection: "row",
              margin: 10,
              justifyContent: "center",
            }}
          >
            <Avatar
              size={"xlarge"}
              rounded
              source={{
                uri: "https://i.pinimg.com/originals/77/a7/a1/77a7a150b7752ae3bf8a73c58d490881.png",
              }}
              title={
                user.firstName === undefined
                  ? ".."
                  : `${user.firstName[0]}${user.lastName[0]}`
              }
            />
          </View>
          <Button
            icon={<Icon name="arrow-right" size={15} color="white" />}
            title=" Upload Photo"
            onPress={chooseFile}
          />
          <Card.Divider />
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.fieldHeader}>
                First Name:
              </ListItem.Title>
              <ListItem.Subtitle style={styles.fieldSubTitle}>
                {user.firstName}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.fieldHeader}>
                Last Name:
              </ListItem.Title>
              <ListItem.Subtitle style={styles.fieldSubTitle}>
                {user.lastName}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>

          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.fieldHeader}>
                Address:
              </ListItem.Title>
              <ListItem.Subtitle style={styles.fieldSubTitle}>
                {user.street1}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.fieldHeader}>
                Apartment(optional)
              </ListItem.Title>
              <ListItem.Subtitle style={styles.fieldSubTitle}>
                {user.street2}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.fieldHeader}>State:</ListItem.Title>
              <ListItem.Subtitle style={styles.fieldSubTitle}>
                {user.state}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.fieldHeader}>Zip:</ListItem.Title>
              <ListItem.Subtitle style={styles.fieldSubTitle}>
                {user.zipCode}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.fieldHeader}>
                Mobile:
              </ListItem.Title>
              <ListItem.Subtitle style={styles.fieldSubTitle}>
                {user.mobile}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.fieldHeader}>Email:</ListItem.Title>
              <ListItem.Subtitle style={styles.fieldSubTitle}>
                {user.email}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.fieldHeader}>
                Bank Account Name:
              </ListItem.Title>
              <ListItem.Subtitle style={styles.fieldSubTitle}>
                {user.bankName}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.fieldHeader}>
                Bank Account Number:
              </ListItem.Title>
              <ListItem.Subtitle style={styles.fieldSubTitle}>
                {user.bankAccountNumber}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.fieldHeader}>
                Bank Account Routing Number:
              </ListItem.Title>
              <ListItem.Subtitle style={styles.fieldSubTitle}>
                {user.bankRoutingNumber}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </Card>
      </ScrollView>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  fieldHeader: {
    fontWeight: "bold",
  },
  fieldSubTitle: {},
});
