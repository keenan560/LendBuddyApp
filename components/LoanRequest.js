import React, { useState, useEffect, useContext } from "react";
import { View, Animated } from "react-native";
import { Text, Button, Overlay, ListItem, Avatar } from "react-native-elements";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { FontAwesome } from "@expo/vector-icons";
import UserContext from "./context/userContext";
import * as firebase from "firebase";

//Optionally import the services that you want to use
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

function LoanRequest({
  firstName,
  lastName,
  category,
  city,
  requestAmount,
  state,
  id,
  cb,
}) {
  const [visible, setVisible] = useState(true);
  const value = useContext(UserContext);
  console.log(value.userData.id);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const denyRequest = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(`${value.userData.id}`)
      .collection("requests")
      .doc(`${id}`)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });

    toggleOverlay();
  };

  return (
    <View>
      <Overlay
        style={{ backgroundColor: "#fff", flex: 0.5 }}
        isVisible={visible}
        fullScreen
        children
      >
        <View
          style={{
            flex: 0.9,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Avatar
            // source={{
            //   uri:
            //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnbyQ9BrRqMbn7NeiM0yRfqAEteiruMHVKXA&usqp=CAU",
            // }}
            size={100}
            rounded
            title={`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`}
          />
          <Text style={{ fontSize: 30, marginBottom: 50, marginTop: 20 }}>
            {firstName} is asking for a{" "}
            <Text style={{ fontWeight: "bold" }}>${requestAmount}</Text> spot
            for {category} do you{" "}
            <Text style={{ color: "#28a745" }}>approve?</Text>
          </Text>
          <Text style={{ fontWeight: "normal", fontStyle: "italic" }}>
            {city}, {state}
          </Text>
          <Text style={{ fontWeight: "bold" }}>97% On Time Repayment Rate</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <FontAwesome
              name="check"
              size={100}
              color="#28a745"
              style={{ marginRight: 90 }}
              onPress={toggleOverlay}
            />
            <FontAwesome
              name="remove"
              size={100}
              color="#ff4d4d"
              onPress={denyRequest}
            />
          </View>
          {/* Timer */}
          <CountdownCircleTimer
            isPlaying
            size={90}
            duration={30}
            colors={[
              ["#004777", 0.4],
              ["#F7B801", 0.4],
              ["#A30000", 0.2],
            ]}
            onComplete={toggleOverlay}
          >
            {({ remainingTime, animatedColor }) => (
              <Animated.Text style={{ color: animatedColor }}>
                {/* {remainingTime} */}
              </Animated.Text>
            )}
          </CountdownCircleTimer>
        </View>
      </Overlay>
    </View>
  );
}

export default LoanRequest;
