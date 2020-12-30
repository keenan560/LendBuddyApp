import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

function BorrowerDash({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.iconSpace}>
            {/* <MaterialIcons name="message" size={60} color="#28a745" /> */}
            <MaterialIcons
              name="chat-bubble-outline"
              size={60}
              color="#28a745"
              onPress={() =>
                navigation.navigate("Messages", {
                  name: "Messages",
                })
              }
            />
            <Text style={styles.iconText}>Messages</Text>
          </View>
          <View style={styles.iconSpace}>
            <MaterialIcons
              name="card-giftcard"
              size={60}
              color="#28a745"
              onPress={() =>
                navigation.navigate("Spot Request", {
                  name: "Spot Request Details",
                })
              }
            />
            <Text style={styles.iconText}>Borrow</Text>
          </View>
          <View style={styles.iconSpace}>
            <MaterialIcons name="history" size={60} color="#28a745" />
            <Text style={styles.iconText}>Activity</Text>
          </View>
          <View style={styles.iconSpace}>
            <MaterialIcons
              name="monetization-on"
              size={60}
              color="#28a745"
              onPress={() =>
                navigation.navigate("Pay Debt", { name: "Pay Debt" })
              }
            />
            <Text style={styles.iconText}>Pay Debt</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.iconSpace}>
            <MaterialIcons
              name="person"
              size={60}
              color="#28a745"
              onPress={() =>
                navigation.navigate("Profile", { name: "Profile" })
              }
            />
            <Text style={styles.iconText}>Profile</Text>
          </View>
          <View style={styles.iconSpace}>
            <MaterialIcons name="payment" size={60} color="#28a745" />
            <Text style={styles.iconText}>Card Info</Text>
          </View>
          <View style={styles.iconSpace}>
            <FontAwesome
              name="file-text-o"
              size={60}
              color="#28a745"
              onPress={() => navigation.navigate("Docs", { name: "Docs" })}
            />
            <Text style={styles.iconText}>Docs</Text>
          </View>
          <View style={styles.iconSpace}>
            <MaterialIcons
              name="block"
              size={60}
              color="#28a745"
              onPress={() => navigation.navigate("Block", { name: "Block" })}
            />
            <Text style={styles.iconText}>Block</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.iconSpace}>
            <FontAwesome name="search" size={60} color="#28a745" />
            <Text style={styles.iconText}>Search</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  header: {
    height: "20px !important",
  },

  welcome: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 1,
    marginTop: 5,
    marginLeft: 0,
  },
  dashTitle: {
    fontSize: 20,
    color: "gray",
    fontWeight: "bold",
    marginBottom: 1,
    marginTop: 2,
    padding: 10,
  },

  lendColor: {
    color: "#28a745",
    borderRightColor: "gray",
    borderRightWidth: 10,
  },

  oweColor: {
    color: "crimson",
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
    justifyContent: "space-between",
    marginBottom: 50,
  },
  iconText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "gray",
  },
  iconSpace: {
    marginLeft: 10,
    marginRight: 10,

    padding: 5,
  },

  iconAlert: {},
});

export default BorrowerDash;
