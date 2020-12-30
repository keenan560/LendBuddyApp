import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Avatar, Button, Input } from "react-native-elements";
import MessageButton from "./MessageButton";

function Chat({ navigation, name }) {
  const [message, setMessage] = useState("");
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
          timeStamp: "10:31am",
        },
        {
          message: "Hey Stacy how are you?",
          from: "receiver",
          timeStamp: "10:33am",
        },
        {
          message: "I'm good glad to be using this app!",
          from: "sender",
          timeStamp: "10:35am",
        },
        {
          message:
            "Me too! The rates are good. How is your experiencing so far using the app?",
          from: "receiver",
          timeStamp: "10:33am",
        },
        {
          message: "I'm good glad to be using this app!",
          from: "sender",
          timeStamp: "10:35am",
        },
        {
          message:
            "Me too! The rates are good. How is your experiencing so far using the app?",
          from: "receiver",
          timeStamp: "10:33am",
        },
        {
          message: "I'm good glad to be using this app!",
          from: "sender",
          timeStamp: "10:35am",
        },
        {
          message:
            "Me too! The rates are good. How is your experiencing so far using the app?",
          from: "receiver",
          timeStamp: "10:33am",
        },
        {
          message: "I'm good glad to be using this app!",
          from: "sender",
          timeStamp: "10:35am",
        },
        {
          message:
            "Me too! The rates are good. How is your experiencing so far using the app?",
          from: "receiver",
          timeStamp: "10:33am",
        },
        {
          message: "I'm good glad to be using this app!",
          from: "sender",
          timeStamp: "10:35am",
        },
        {
          message:
            "Me too! The rates are good. How is your experiencing so far using the app?",
          from: "receiver",
          timeStamp: "10:33am",
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
        {chats[0].messages.map((message, index) => (
          <View
            key={index}
            style={message.from === "sender" ? styles.sender : styles.receiver}
          >
            {message.from === "sender" && (
              <Avatar
                rounded
                size={38}
                source={{ uri: chats[0].name[0] }}
                title="SD"
                containerStyle={{ marginRight: 2 }}
              />
            )}

            <View
              style={
                message.from === "sender"
                  ? styles.senderBackground
                  : styles.receiverBackground
              }
            >
              <Text
                style={
                  message.from === "sender"
                    ? styles.senderText
                    : styles.receiverText
                }
              >
                {message.message}
              </Text>
            </View>
            <Text style={{ fontSize: 10, margin: 2, color: "gray" }}>
              {message.timeStamp}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          overflow: "hidden",
          backgroundColor: "#fff",
          padding: 8,
          marginRight: 5,
          marginLeft: 5,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Enter message"
          placeholderTextColor="gray"
          onChangeText={(text) => setMessage(text)}
          value={message}
        />
        <Text>
          <MessageButton />
        </Text>
      </View>
    </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  sender: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginRight: "auto",
    marginTop: 10,
    marginLeft: 5,
    marginBottom: 20,
  },
  receiver: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginRight: 5,
    marginTop: 10,
    marginLeft: "auto",
    marginBottom: 40,
    direction: "rtl",
  },
  senderText: {
    padding: 10,
    color: "#fff",
    fontWeight: "bold",
  },

  receiverText: {
    padding: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  senderBackground: {
    borderRadius: 20,
    backgroundColor: "#3D5F9C",
    maxWidth: "50%",
  },
  receiverBackground: {
    borderRadius: 20,
    backgroundColor: "gray",
    maxWidth: "50%",
  },
  button: {
    backgroundColor: "green",
  },
  input: {
    flex: 0.9,
    fontSize: 13,
    padding: 5,
    marginLeft: 10,
    marginRight: 15,
    marginBottom: 15,
    marginTop: 15,
    height: 50,
    borderWidth: 1,
    borderTopColor: "gray",
    borderBottomColor: "gray",
    borderRightColor: "gray",
    borderLeftColor: "gray",
    borderRadius: 20,
    backgroundColor: "#fff",
  },
});
