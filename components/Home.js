import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import deal from "../assets/deal.png";

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        lend<Text style={styles.lendColor}>$$</Text>Buddy
      </Text>
      <Text style={styles.slogan}>Spot a Friend</Text>
      <Image style={styles.banner} source={deal} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Join", { name: "Join" })}
      >
        <Text style={styles.buttonText}>Join</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login", { name: "Login" })}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign In</Text>
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
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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

  banner: {
    width: 375,
    height: 400,
    borderTopRightRadius: 90,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 200,
    marginBottom: 15,
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

export default Home;
