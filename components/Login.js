// @refresh state
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-elements";
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

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const value = useContext(UserContext);

  const signIn = (event) => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // Signed in
        // ...
        value.login(user);
        // alert("Welcome " + user.user.email);
        setTimeout(() => {
          setLoading(false);
          navigation.navigate("Dashboard", { name: "Dashboard" });
        }, 1000);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        setLoading(false);
      });
  };

  return (
    <UserContext.Consumer>
      {(context) => (
        <View style={styles.container}>
          <Text style={styles.title}>
            lend<Text style={styles.lendColor}>$$</Text>Buddy
          </Text>
          <Text style={styles.slogan}>Spot a Friend</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            textContentType="emailAddress"
            keyboardType="email-address"
            clearTextOnFocus
            onChangeText={(text) => setEmail(text.trim())}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            textContentType="password"
            secureTextEntry
            clearTextOnFocus
            onChangeText={(text) => setPassword(text.trim())}
          />
          <Button
            buttonStyle={styles.button}
            title="Login"
            type="solid"
            onPress={signIn}
            loading={loading}
          />
          <View style={styles.row}>
            <Text style={styles.left}>Forgot Username</Text>
            <Text style={styles.right}>Forgot Password</Text>
          </View>
        </View>
      )}
    </UserContext.Consumer>
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

export default Login;
