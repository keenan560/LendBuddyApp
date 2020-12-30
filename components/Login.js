import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { auth } from "../firebase";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = (event) => {
    event.preventDefault();
    // setLoading(true);
    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then((authUser) => {
    //     navigation.navigate("Dashboard", { name: "Dashboard" });
    //   })

    //   .catch((error) => {
    //     alert(error.message);
    //     setLoading(false);
    //   });
       navigation.navigate("Dashboard", { name: "Dashboard" });
  };
  console.log([email, password]);
  return (
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
        title="Sign In"
        type="solid"
        onPress={signIn}
        loading={loading}
      />
      <View style={styles.row}>
        <Text style={styles.left}>Forgot Username</Text>
        <Text style={styles.right}>Forgot Password</Text>
      </View>
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

export default Login;
