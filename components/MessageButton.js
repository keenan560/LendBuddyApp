import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function MessageButton() {
  return (
    <View
      style={{
        flex: 0.2,
        borderRadius: 50,
        backgroundColor: "gray",
        padding: 12,
      }}
    >
      <Text>
        <FontAwesome name="send" size={24} color="#fff" />
      </Text>
    </View>
  );
}

export default MessageButton;
