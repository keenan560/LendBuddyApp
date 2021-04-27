import React, { useState, useEffect, useContext } from "react";
import { Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import UserContext from "./context/userContext";
import * as firebase from "firebase";
import LoanRequest from "./LoanRequest";

// Optionally import the services that you want to use
import "firebase/auth";
// import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";

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

function LenderDash({ navigation }) {
  const [active, setActive] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [visible, setVisible] = useState(false);
  const [requests, setRequests] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);

  const value = useContext(UserContext);

  // useEffect(() => {
  //   if (active) {
  //     setTimeout(() => {
  //       toggleOverlay();
  //     }, 5000);
  //   }
  // }, [active]);

  useEffect(() => {
    if (active) {
      firebase
        .firestore()
        .collection("users")
        .doc(`${value.user.user.uid}`)
        .collection("requests")
        .onSnapshot((snapshot) => {
          setRequests(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [active]);

  const toggleActive = () => {
    setActive(!active);
  };
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const getCoords = async () => {
    setActive(true);
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    firebase
      .firestore()
      .collection("users")
      .doc(`${value.userData.id}`)
      .update({
        activeLender: true,
        coordinates: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
  };

  const goOffline = () => {
    setActive(false);
    firebase
      .firestore()
      .collection("users")
      .doc(`${value.userData.id}`)
      .update({
        activeLender: false,
      });
  };

  console.log(requests.length);
  console.log(requests);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        {requests.length > 0 &&
          active &&
          requests.map(({ id, data }) => (
            <LoanRequest
              key={id}
              id={id}
              category={data.category}
              firstName={data.firstName}
              lastName={data.lastName}
              city={data.city}
              state={data.state}
              requestAmount={data.requestAmount}
            />
          ))}

        <View style={styles.row}>
          <View style={styles.iconSpace}>
            <MaterialIcons
              name="attach-money"
              size={60}
              color="#3D5F9C"
              onPress={() =>
                navigation.navigate("Earnings", {
                  name: "Earnings",
                })
              }
            />
            <Text style={styles.iconText}>Earnings</Text>
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
            {active === false ? (
              <MaterialIcons
                name="sync-disabled"
                size={60}
                color="#3D5F9C"
                onPress={getCoords}
              />
            ) : (
              <FontAwesome
                name="handshake-o"
                size={60}
                color="#3D5F9C"
                onPress={goOffline}
              />
            )}
            {active === false ? (
              <Text style={styles.iconText}>Go Online</Text>
            ) : (
              <Text style={styles.iconText}>Go Offline</Text>
            )}
          </View>
          <View style={styles.iconSpace}>
            <MaterialIcons
              name="history"
              size={60}
              color="#3D5F9C"
              onPress={() =>
                navigation.navigate("Lender Activity", {
                  name: "Lender Activity",
                })
              }
            />
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
          {/* <View style={styles.iconSpace}>
            <MaterialIcons name="report" size={60} color="#3D5F9C" />
            <Text style={styles.iconText}>Report</Text>
          </View> */}
        </View>
        <View style={styles.row}></View>
        {active && (
          <Text style={styles.onlineText}>You are available to lend</Text>
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

  onlineText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "green",
  },
});

export default LenderDash;
