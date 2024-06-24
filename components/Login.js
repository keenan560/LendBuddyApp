// @refresh state
import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import UserContext from "./context/userContext";

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

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const value = useContext(UserContext);

  const signIn = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        value.login(user);
        value.getUserData(user.uid);

        setTimeout(() => {
          setLoading(false);
          navigation.navigate("Dashboard", { name: "Dashboard" });
        }, 1000);
      })
      .catch((error) => {
        alert(error.message);
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
    borderColor: "gray",
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
