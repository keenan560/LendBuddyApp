import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

function LenderDash({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.iconSpace}>
            <MaterialIcons
              name="chat-bubble-outline"
              size={60}
              color="#3D5F9C"
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
              name="groups"
              size={60}
              color="#3D5F9C"
              onPress={() =>
                navigation.navigate("Debtors", { name: "Debtors" })
              }
            />
            <Text style={styles.iconText}>Debtors</Text>
          </View>
          <View style={styles.iconSpace}>
            <FontAwesome name="handshake-o" size={60} color="#3D5F9C" />
            <Text style={styles.iconText}>Lend</Text>
          </View>
          <View style={styles.iconSpace}>
            <MaterialIcons name="history" size={60} color="#3D5F9C" />
            <Text style={styles.iconText}>Activity</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.iconSpace}>
            <MaterialIcons
              name="person"
              size={60}
              color="#3D5F9C"
              onPress={() =>
                navigation.navigate("Profile", { name: "Profile" })
              }
            />
            <Text style={styles.iconText}>Profile</Text>
          </View>
          <View style={styles.iconSpace}>
            <MaterialIcons name="payment" size={60} color="#3D5F9C" />
            <Text style={styles.iconText}>Card Info</Text>
          </View>
          <View style={styles.iconSpace}>
            <FontAwesome
              name="file-text-o"
              size={60}
              color="#3D5F9C"
              onPress={() => navigation.navigate("Docs", { name: "Docs" })}
            />
            <Text style={styles.iconText}>Docs</Text>
          </View>
          <View style={styles.iconSpace}>
            <MaterialIcons
              name="block"
              size={60}
              color="#3D5F9C"
              onPress={() => navigation.navigate("Block", { name: "Block" })}
            />
            <Text style={styles.iconText}>Block</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.iconSpace}>
            <FontAwesome name="gavel" size={60} color="#3D5F9C" />
            <Text style={styles.iconText}>File a Claim</Text>
          </View>
          <View style={styles.iconSpace}>
            <MaterialIcons name="report" size={60} color="#3D5F9C" />
            <Text style={styles.iconText}>Report</Text>
          </View>
          <View style={styles.iconSpace}>
            <FontAwesome name="search" size={60} color="#3D5F9C" />
            <Text style={styles.iconText}>Search</Text>
          </View>
        </View>
        <View style={styles.row}></View>
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
    color: "#3D5F9C",
    borderRightColor: "gray",
    borderRightWidth: 10,
  },

  oweColor: {
    color: "crimson",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3D5F9C",
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

export default LenderDash;
