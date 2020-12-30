import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, ListItem, Button } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// Pay Stubs
// Claims that you filed

function Docs({ navigation }) {
  const [payStubStatus1, setPayStubStatus1] = useState(true);
  const [payStubStatus2, setPayStubStatus2] = useState(false);

  return (
    <View style={styles.container}>
      {/* <Card.Title>Pay Stubs</Card.Title> */}
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold", fontSize: 16 }}>
            Paystub 1
          </ListItem.Title>
          <ListItem.Subtitle>Completed</ListItem.Subtitle>
        </ListItem.Content>
        {payStubStatus1 ? (
          <FontAwesome5 name="check-circle" size={24} color="#28a745" />
        ) : (
          <Button
            title="Upload"
            type="solid"
            titleStyle={{ fontWeight: "bold" }}
          />
        )}
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold", fontSize: 16 }}>
            Paystub 2
          </ListItem.Title>
          <ListItem.Subtitle>Required</ListItem.Subtitle>
        </ListItem.Content>
        {payStubStatus2 ? (
          <FontAwesome5 name="check-circle" size={24} color="" />
        ) : (
          <Button
            title="Upload"
            type="solid"
            titleStyle={{ fontWeight: "bold" }}
            onPress={() => navigation.navigate("Camera", { name: "Camera" })}
          />
        )}
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold", fontSize: 16 }}>
            Claim YTZ-9087
          </ListItem.Title>
          <ListItem.Subtitle>Pending Review</ListItem.Subtitle>
        </ListItem.Content>
        <MaterialIcons name="pending" size={28} color="black        " />
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold", fontSize: 16 }}>
            Claim RDP-2011
          </ListItem.Title>
          <ListItem.Subtitle>Denied</ListItem.Subtitle>
        </ListItem.Content>
        <AntDesign name="minuscircle" size={24} color="red" />
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold", fontSize: 16 }}>
            Claim HKX-3782
          </ListItem.Title>
          <ListItem.Subtitle>Approved</ListItem.Subtitle>
        </ListItem.Content>
        <FontAwesome5 name="check-circle" size={24} color="#28a745" />
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold", fontSize: 16 }}>
            Claim GTJ-63417
          </ListItem.Title>
          <ListItem.Subtitle>Action Required</ListItem.Subtitle>
        </ListItem.Content>
        <MaterialIcons name="pending-actions" size={24} color="#ff8c1a" />
      </ListItem>
    </View>
  );
}

export default Docs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
});
