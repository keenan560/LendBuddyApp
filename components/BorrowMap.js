import React, { useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import CurrentLocationButton from "./CurrentLocationButton";
import { Rating, Button, Overlay } from "react-native-elements";
import MakeItRain from "react-native-make-it-rain";
import UserContext from "./context/userContext";
import { SpotRequestContext } from "../App";
import * as firebase from "firebase";

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

export default function BorrowMap({ navigation }) {
  const value = useContext(UserContext);
  const requestContext = useContext(SpotRequestContext);
  const [lenders, setLenders] = useState([]);
  const [requestResults, setRequestResults] = useState([]);
  const [location, setLocation] = useState({
    coords: {
      latitude: 36.15596,
      longitude: -86.781663,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [docId, setDocId] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      getLenders();
    })();
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(`${value.userData.id}`)
      .collection("results")
      .onSnapshot((snapshot) => {
        setRequestResults(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log(lenders);
  console.log(requestContext.requestState);
  const centerMap = () => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = location;
    mapView.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    });
  };

  const mapView = React.createRef();

  const demoRequest = (id) => {
    // event.preventDefault();

    Alert.alert(
      "Request",
      "Ask this lender to spot you?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            toggleOverlay();
            // Send to lender
            await firebase
              .firestore()
              .collection("users")
              .doc(`${id}`)
              .collection("requests")
              .add({
                firstName: value.userData.firstName,
                lastName: value.userData.lastName,
                borrowerID: value.userData.id,
                city: value.userData.city,
                state: value.userData.state,
                requestAmount: requestContext.requestState.amount,
                category: requestContext.requestState.category,
                decision: "pending",
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then((docRef) => {
                addToResults(docRef.id);
              })
              .catch((error) => alert(error.message));

            setTimeout(
              () => {
                setVisible(false), toggleOverlay();
              },

              3000
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [approved, setApproved] = useState(false);
  const toggleApproved = () => {
    setApproved(!approved);
  };

  const [denied, setDenied] = useState(false);
  const toggleDenied = () => {
    if (visible) {
      toggleOverlay();
    }
    setDenied(!denied);
  };

  const finished = () => {
    toggleApproved();
    navigation.navigate("Dashboard");
  };

  const getLenders = () => {
    firebase
      .firestore()
      .collection("users")
      .where("activeLender", "==", true)
      .onSnapshot((snapshot) => {
        setLenders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  };

  const addToResults = (id) => {
    firebase
      .firestore()
      .collection("users")
      .doc(`${value.userData.id}`)
      .collection("results")
      .doc(`${id}`)
      .set({
        firstName: value.userData.firstName,
        lastName: value.userData.lastName,
        borrowerID: value.userData.id,
        city: value.userData.city,
        state: value.userData.state,
        requestAmount: requestContext.requestState.amount,
        category: requestContext.requestState.category,
        decision: "pending",
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Overlay
        style={{ height: "auto", width: "100%", flex: 1 }}
        isVisible={visible}
      >
        <Text style={{ width: "100%" }}>Lender is making a decision...</Text>
        <Button loading type="clear" />
      </Overlay>
      <Overlay
        style={{ height: "auto", width: "100%", flex: 1 }}
        isVisible={denied}
      >
        <Text style={{ width: "100%" }}>Lender cannot spot you</Text>
        <Button loading type="clear" />
      </Overlay>
      <Overlay
        style={{ backgroundColor: "#fff", flex: 0.8 }}
        isVisible={approved}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <MakeItRain
            numItems={80}
            itemDimensions={{ width: 40, height: 20 }}
            itemComponent={<Text>🤍</Text>}
            itemTintStrength={0.8}
            continuous={false}
          />
          <Text style={{ fontSize: 30, marginBottom: 20 }}>
            Congratulations! You have been{" "}
            <Text style={{ color: "#28a745" }}>approved</Text> by the lender!
          </Text>

          <Button
            title="Dashboard"
            containerStyle={{ marginBottom: 20 }}
            buttonStyle={{ borderRadius: 5 }}
            onPress={finished}
          />
          <Text>Funds will be deposited in 1-2 business days.</Text>

          {/* <ConfettiCannon
            fadeOut
            autoStart
            count={200}
            origin={{ x: -10, y: 0 }}
          /> */}
        </View>
      </Overlay>
      <View style={{ backgroundColor: "#ffff", padding: 10 }}>
        <Text style={{ fontSize: 14, color: "gray", fontWeight: "bold" }}>
          We are looking for lenders to spot you $
          {requestContext.requestState.amount} for{" "}
          {requestContext.requestState.category}...
        </Text>
      </View>
      <CurrentLocationButton cb={centerMap} />
      {location ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsCompass
          showsUserLocation={true}
          rotateEnabled={false}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref={mapView}
        >
          {lenders.map(({ id, data }) => (
            <View key={id} style={{ alignItems: "center" }}>
              <Marker
                coordinate={data.coordinates}
                title={data.firstName}
                style={{ alignItems: "center" }}
                onPress={(e) => demoRequest(id)}
              >
                <Image
                  source={require("../assets/moneybag.jpg")}
                  style={{ width: 50, height: 45, borderRadius: 20 }}
                />
              </Marker>
            </View>
          ))}
        </MapView>
      ) : (
        <Text style={{ flex: 1, fontSize: 24 }}>Loading..</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  map: {
    flex: 1,
    height: "100%",
  },
});
