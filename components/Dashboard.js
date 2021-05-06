import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, Switch, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements";
import { useState } from "react";
import BorrowerDash from "./BorrowerDash";
import LenderDash from "./LenderDash";
import { AntDesign } from "@expo/vector-icons";
import UserContext from "./context/userContext";

import * as firebase from "firebase";

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/firestore";

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

function Dashboard({ navigation }) {
  const value = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [switchValue, setSwitchValue] = useState(false);
  const toggleSwitch = (value) => {
    setSwitchValue(value);
  };
  console.log(value.userData.totalDebt);

  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(`${value.userData.id}`)
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         console.log("Document data:", doc.data());
  //         setUser(doc.data());
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error getting document:", error);
  //     });
  // }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(`${value.userData.id}`)
      .onSnapshot((snapshot) => {
        setUser(snapshot.data());
      });
  }, []);

  const logOut = () =>
    Alert.alert(
      "Logout",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            firebase.auth().signOut();
            navigation.navigate("Login", { name: "Login" });
          },
        },
      ],
      { cancelable: false }
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.avatar}>
            <Avatar
              size={35}
              rounded
              title={user ? `${user.firstName[0] + user.lastName[0]}` : ".."}
              source={{
                uri: user ? `${user.firstName[0] + user.lastName[0]}` : "..",
              }}
              onPress={logOut}
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
                <AntDesign name="star" size={10} color="gold" />
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
              <Text style={styles.spotColor}>
                ${user ? user.totalLent : value.userData.totalLent}
              </Text>
            </Text>
          ) : (
            <Text style={styles.dashTitle}>
              <Text style={styles.oweColor}>
                ${user ? user.totalDebt : value.userData.totalDebt}
              </Text>
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
