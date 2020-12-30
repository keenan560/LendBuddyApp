import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import ChatRoom from "./ChatRoom";

function Messages({ navigation }) {
  const chats = [
    {
      name: "Stacy",
      photoUrl: "",
      lastMessage: "Hey Stacy how are you?",
      lastMessageTime: "12/24/2020",
      messages: [
        {
          message: "Hi there!",
          from: "sender",
          timeStamp: "12/21/2020 10:31am",
        },
        {
          message: "Hey Stacy how are you?",
          from: "receiver",
          timeStamp: "12/21/2020 10:33am",
        },
      ],
    },
    {
      name: "Brendan",
      lastMessage: "It's cool I got you bro",
      lastMessageTime: "12/22/2020",
      messages: [
        {
          message: "Money is tight",
          from: "sender",
          timeStamp: "12/22/2020 01:11pm",
        },
        {
          message: "It's cool I got you bro",
          from: "receiver",
          timeStamp: "12/21/2020 01:52p,",
        },
      ],
    },
   
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {chats.map((chat, index) => (
          <ChatRoom
            key={index}
            name={chat.name}
            lastMessage={chat.lastMessage}
            lastMessageTime={chat.lastMessageTime}
            data={chat.messages}
            navigation={navigation}
         
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Messages;
