import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

function Join({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const signUp = async (event) => {
    event.preventDefault();
    try {
      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(authUser.user, {
        displayName: `${firstName} ${lastName}`,
      });
      await setDoc(doc(firestore, "users", authUser.user.uid), {
        id: authUser.user.uid,
        email: authUser.user.email,
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        mobile: mobile,
        totalDebt: 0,
        totalLent: 0,
        paystub1: false,
        paystub2: false,
        activeLender: false,
        street1: street1,
        street2: street2,
        city: city,
        state: state,
        zipCode: zip,
      });
      alert("Please Login, " + firstName);
      navigation.navigate("Login");
    } catch (error) {
      alert(error.message);
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setDob("");
    setMobile("");
    setStreet1("");
    setStreet2("");
    setCity("");
    setState("");
    setZip("");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          lend<Text style={styles.lendColor}>$$</Text>Buddy
        </Text>
        <Text style={styles.slogan}>Registration Form </Text>
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
        <TextInput
          style={styles.input}
          placeholder="Street Address"
          textContentType="fullStreetAddress"
          clearTextOnFocus
          value={street1}
          onChangeText={(text) => setStreet1(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Unit (optional)"
          textContentType="fullStreetAddress"
          clearTextOnFocus
          value={street2}
          onChangeText={(text) => setStreet2(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          textContentType="addressCity"
          clearTextOnFocus
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="State (NY)"
          textContentType="addressState"
          clearTextOnFocus
          value={state}
          onChangeText={(text) => setState(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Zip"
          textContentType="postalCode"
          clearTextOnFocus
          value={zip}
          onChangeText={(text) => setZip(text)}
        />
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 48,
    fontWeight: "700",
    marginBottom: 15,
    bottom: 55,
    marginTop: 120,
    textAlign: "center",
  },
  lendColor: {
    color: "#28a745",
  },
  slogan: {
    color: "#28a745",
    bottom: 53,
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "center",
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
    borderColor: "gray",
    borderRadius: 5,
    color: "#000",
  },
  button: {
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#28a745",
    padding: 10,
    width: 375,
    height: 50,
    marginBottom: 5,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
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
