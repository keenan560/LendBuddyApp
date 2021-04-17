import React from "react";
import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";
import { Button, Input, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";

const cardDetails = {
  cardNumber: "5555-5555-5555-5555",
  expDate: "01/22",
  cvc: "678",
};

function BorrowerCardInfo({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Card Number</ListItem.Title>
            <ListItem.Subtitle>{cardDetails.cardNumber}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Exp Date</ListItem.Title>
            <ListItem.Subtitle>{cardDetails.expDate}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider style={{ marginBottom: 50 }}>
          <ListItem.Content>
            <ListItem.Title>Security Code</ListItem.Title>
            <ListItem.Subtitle>{cardDetails.cvc}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <Input
          placeholder="Enter card number"
          textContentType="creditCardNumber"
          leftIcon={<Icon name="credit-card" size={24} color="black" />}
        />
        <Input
          clearButtonMode
          placeholder="Exp Date"
          passwordRules
          leftIcon={<MaterialIcons name="date-range" size={24} color="black" />}
        />
        <Input
          clearButtonMode
          placeholder="CVC"
          passwordRules
          leftIcon={<MaterialIcons name="lock" size={24} color="black" />}
        />

        <Button
          title="Update Card Details"
          containerStyle={{ alignItems: "center" }}
          buttonStyle={{ borderRadius: 10, padding: 15 }}
        />
      </ScrollView>
    </View>
  );
}

export default BorrowerCardInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
