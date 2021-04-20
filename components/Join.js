import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
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

function Join({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");

  const signUp = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          email: authUser.user.email,
          firstName: firstName,
          lastName: lastName,
          dob: dob,
          mobile: mobile,
        });

        firebase
          .firestore()
          .collection("users")
          .doc(`${authUser.user.uid}`)
          .set({
            id: authUser.user.uid,
            email: authUser.user.email,
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            mobile: mobile,
            totalDebt: 0,
            totalLent: 0,
            activeLender: false,
          })
          .catch((error) => alert(error.message));
        alert("Please Login" + authUser.user.firstName);
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setDob("");
    setMobile("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        lend<Text style={styles.lendColor}>$$</Text>Buddy
      </Text>
      <Text style={styles.slogan}>Spot a Friend</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        textContentType="name"
        clearTextOnFocus
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        textContentType="name"
        clearTextOnFocus
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="DOB mmddyyyy"
        textContentType="none"
        clearTextOnFocus
        value={dob}
        onChangeText={(text) => setDob(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        textContentType="emailAddress"
        keyboardType="email-address"
        clearTextOnFocus
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        textContentType="password"
        clearTextOnFocus
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        textContentType="telephoneNumber"
        clearTextOnFocus
        value={mobile}
        onChangeText={(text) => setMobile(text)}
      />
      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>Join</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "700",
    marginBottom: 15,
    bottom: 55,
  },

  lendColor: {
    color: "#28a745",
  },

  slogan: {
    color: "#28a745",
    bottom: 53,
    fontSize: 16,
    fontWeight: "normal",
  },

  input: {
    width: 375,
    fontSize: 20,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    height: 50,
    borderWidth: 0.5,
    borderTopColor: "gray",
    borderBottomColor: "gray",
    borderRightColor: "gray",
    borderLeftColor: "gray",
    borderRadius: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28a745",
    padding: 10,
    width: 375,
    height: 50,
    marginBottom: 5,
    borderRadius: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  left: {
    marginLeft: 0,
    marginRight: 150,
    color: "gray",
  },

  right: {
    marginRight: 0,
    color: "gray",
  },
});

export default Join;
