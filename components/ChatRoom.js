import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Avatar, ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

function ChatRoom({ navigation, name, lastMessage, lastMessageTime, data }) {
  return (
    <View style={styles.container}>
      <ListItem
        bottomDivider
        onPress={() => navigation.navigate("Chat", { name: "Chat" })}
      >
        <Avatar
          source={{
            uri: `${name}`,
          }}
          title={name[0]}
          size={60}
          rounded
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold", fontSize: 16 }}>
            {name}
          </ListItem.Title>
          <ListItem.Subtitle>{lastMessage}</ListItem.Subtitle>
        </ListItem.Content>
        <Text style={{ fontSize: 12, color: "gray" }}>{lastMessageTime}</Text>
      </ListItem>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
   
  },
  lastMessage: {
    textAlign: "right",
  },
});

export default ChatRoom;
