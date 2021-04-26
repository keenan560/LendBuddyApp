import React, { useState, useEffect } from "react";
import { View, Animated } from "react-native";
import { Text, Button, Overlay, ListItem, Avatar } from "react-native-elements";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { FontAwesome } from "@expo/vector-icons";

function LoanRequest({
  firstName,
  category,
  city,
  requestAmount,
  state,
  id,
  cb,
}) {
  const [visible, setVisible] = useState(true);

  const toggleOverlay = () => {
    setVisible(!visible);
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
            source={{
              uri:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnbyQ9BrRqMbn7NeiM0yRfqAEteiruMHVKXA&usqp=CAU",
            }}
            size={100}
            rounded
            title="VS"
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
              onPress={toggleOverlay}
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
