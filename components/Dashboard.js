import React from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Accessory, Header, Divider } from "react-native-elements";
import { useState } from "react";
import BorrowerDash from "./BorrowerDash";
import LenderDash from "./LenderDash";
import { AntDesign } from "@expo/vector-icons";

function Dashboard({ navigation }) {
  const [switchValue, setSwitchValue] = useState(false);
  const toggleSwitch = (value) => {
    setSwitchValue(value);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.avatar}>
            <Avatar
              size={35}
              rounded
              title="KM"
              source={{
                uri: "KM",
              }}
            ></Avatar>
          </View>

          <Switch
            style={styles.switch}
            onValueChange={toggleSwitch}
            value={switchValue}
          />
          <View>
            {switchValue ? (
              <Text style={styles.portalSwitch}>Lender</Text>
            ) : (
              <Text style={styles.portalSwitch}>Borrower</Text>
            )}
            <View style={styles.ratingRow}>
              <View style={styles.ratingSpace}>
                <AntDesign name="star" size={10} color="gold" />
              </View>
              <View style={styles.ratingSpace}>
                <AntDesign name="star" size={10} color="gold" />
              </View>
              <View style={styles.ratingSpace}>
                <AntDesign name="star" size={10} color="gold" />
              </View>
              <View style={styles.ratingSpace}>
                <AntDesign name="star" size={10}  color="gold" />
              </View>
            </View>
          </View>
        </View>

        {switchValue ? (
          <Text style={styles.iconText}>Spot</Text>
        ) : (
          <Text style={styles.iconText}>Owe</Text>
        )}
        <View style={styles.row}>
          {switchValue ? (
            <Text style={styles.dashTitle}>
              <Text style={styles.spotColor}>$1,053.03</Text>
            </Text>
          ) : (
            <Text style={styles.dashTitle}>
              <Text style={styles.oweColor}>$247.80</Text>
            </Text>
          )}
        </View>
        {!switchValue ? (
          <BorrowerDash navigation={navigation} />
        ) : (
          <LenderDash navigation={navigation} />
        )}
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

  avatar: {
    marginRight: 0,
    marginTop: 5,
    marginLeft: 10,
  },

  switch: {
    marginTop: 5,
    marginLeft: 130,
    marginRight: 80,
  },

  switchText: {
    marginBottom: 30,
  },

  portalSwitch: {
    marginRight: 20,
    padding: 10,
    color: "black",
    fontWeight: "bold",
  },

  welcome: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 1,
    marginTop: 5,
    marginLeft: 0,
  },
  dashTitle: {
    fontSize: 70,
    color: "black",
    fontWeight: "normal",
    marginBottom: 1,
    marginTop: 2,
    padding: 15,
  },
  
  lendColor: {
    color: "#28a745",
    borderRightColor: "gray",
    borderRightWidth: 10,
  },

  oweColor: {
    color: "#343d47",
  },

  spotColor: {
    color: "#343d47",
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
    marginBottom: 30,
  },

  ratingRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 1,
  },
  iconText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "gray",
  },
  iconRatingText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "gray",
    marginBottom: 20,
  },
  iconSpace: {
    marginLeft: 5,
    marginRight: 5,
    padding: 2,
  },

  ratingSpace: {
    marginLeft: 0,
    marginRight: 3,
  },

  iconAlert: {},
});

export default Dashboard;
