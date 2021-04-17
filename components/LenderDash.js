import React, { useState, useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Text, Button, Overlay, ListItem, Avatar } from "react-native-elements";
import * as Svg from "react-native-svg";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

function LenderDash({ navigation }) {
  const [active, setActive] = useState(false);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        toggleOverlay();
      }, 5000);
    }
  }, [active]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const toggleActive = () => {
    setActive(!active);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Overlay
          style={{ backgroundColor: "#fff", flex: 0.5 }}
          isVisible={visible}
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
              Vicky is asking for a{" "}
              <Text style={{ fontWeight: "bold" }}>$75</Text> spot do you{" "}
              <Text style={{ color: "#28a745" }}>approve?</Text>
            </Text>
            <Text style={{ fontWeight: "normal", fontStyle: "italic" }}>
              Franklin, TN
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              97% On Time Repayment Rate
            </Text>
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
      <View style={styles.container}>
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
                onPress={() => setActive(true)}
              />
            ) : (
              <FontAwesome
                name="handshake-o"
                size={60}
                color="#3D5F9C"
                onPress={() => {
                  setActive(false);
                }}
              />
            )}
            {active == false ? (
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
