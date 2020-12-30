import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Card, ListItem, Button, Avatar } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/FontAwesome";
// Name
// Photo (optional)
// Address
// State
// Zip
// Phone
// Bank Name
// Bank Account Number
// Bank Routing Number
// File picker for upload
const details = {
  firstName: "John",
  lastName: "Smith",
  photoUrl: "",
  address: "123 Main Street",
  address2: "23",
  state: "NY",
  zip: 10001,
  mobile: "555-555-5555",
  email: "johnsmith123@yahoo.com",
  bankName: "JPMorgan Chase Bank N.A.",
  bankRoutingNumber: "021000021",
  bankAccountNumber: "123456789",
};

function Profile({ navigation }) {
  const chooseFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);
  };
  return (
    <View>
      <ScrollView>
        <Card>
          <Card.Title>Profile Details</Card.Title>
          <Button
            icon={<Icon name="arrow-right" size={15} color="white" />}
            title=" Upload Photo"
            onPress={chooseFile}
          />
          <Card.Divider />
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>First Name:</ListItem.Title>
              <ListItem.Subtitle>{details.firstName}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Last Name:</ListItem.Title>
              <ListItem.Subtitle>{details.lastName}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>

          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Address:</ListItem.Title>
              <ListItem.Subtitle>{details.address}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Apartment(optional)</ListItem.Title>
              <ListItem.Subtitle>{details.address2}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>State:</ListItem.Title>
              <ListItem.Subtitle>{details.state}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Zip:</ListItem.Title>
              <ListItem.Subtitle>{details.zip}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Mobile:</ListItem.Title>
              <ListItem.Subtitle>{details.mobile}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Email:</ListItem.Title>
              <ListItem.Subtitle>{details.email}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Bank Account Name:</ListItem.Title>
              <ListItem.Subtitle>{details.bankName}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Bank Account Number:</ListItem.Title>
              <ListItem.Subtitle>{details.bankAccountNumber}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Bank Account Routing Number:</ListItem.Title>
              <ListItem.Subtitle>{details.bankRoutingNumber}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </Card>
      </ScrollView>
    </View>
  );
}

export default Profile;
