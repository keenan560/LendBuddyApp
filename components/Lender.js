import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { AirbnbRating, Avatar, ListItem, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
function Lender({ name, rating, city, online }) {
  return (
    <View style={styles.container}>
      <ListItem bottomDivider>
        <Avatar source={{ uri: name[0] }} title={name[0]} rounded size={50} />

        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold" }}>{name}</ListItem.Title>
          <ListItem.Subtitle style={{ color: "gray", fontStyle: "italic" }}>
            {city}
          </ListItem.Subtitle>
        </ListItem.Content>
        {/* <AirbnbRating
          count={5}
          defaultRating={rating}
          size={10}
          showRating={false}
        /> */}
        {online ? (
          <MaterialIcons name="online-prediction" size={24} color="green" />
        ) : (
          <Text>Offline</Text>
        )}
        {online ? (
          <Button buttonStyle={{ borderRadius: 10 }} title="Request" />
        ) : (
          <Button buttonStyle={{ borderRadius: 10 }} title="Connect" />
        )}
      </ListItem>
    </View>
  );
}

export default Lender;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
