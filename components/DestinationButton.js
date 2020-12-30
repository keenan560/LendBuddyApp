import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;

function DestinationButton({}) {
  return (
    <TouchableOpacity onPress={() => {}} style={styles.container}>
      <View style={styles.leftCol}>
        <Text style={{ fontSize: 8 }}>{`\u25A0`}</Text>
      </View>
      <View style={styles.centerCol}>
        <Text
          style={{
            fontFamily: "sans-serif-thin",
            fontSize: 21,
            color: "#545454",
          }}
        >
          Where to?
        </Text>
      </View>
      <View style={styles.rightCol}>
        <Ionicons
          name="car"
          size={25}
          color="#000000"
          style={{ alignItems: "center" }}
        />
      </View>
    </TouchableOpacity>
  );
}

export default DestinationButton;

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: "absolute",
    flexDirection: "row",
    width: WIDTH - 40,
    height: 60,
    top: 110,
    left: 20,
    borderRadius: 2,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  leftCol: {
    flex: 1,
    alignItems: "center",
  },
  centerCol: {
    flex: 4,
  },
  rightCol: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: "#ededed",
  },
});
