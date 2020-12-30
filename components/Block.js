import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollVi } from "react-native";
import { SearchBar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Avatar, Button } from "react-native-elements";

// List of people that you block
// Search bar to find and block

const list = [
  {
    name: "Shady Michaels",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Lender",
  },
  {
    name: "Lisa Furtick",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Lender",
  },
  {
    name: "Martha Lowry",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Lender",
  },
  {
    name: "Joseph Wagner",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Lender",
  },
];
function Block({ navigation }) {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView>
        <SearchBar
          lightTheme
          placeholder="Search for user"
          round
          onChangeText={(text) => setSearch(text.trim())}
          value={search}
          inputStyle={{ backgroundColor: "#fff" }}
          inputContainerStyle={{ backgroundColor: "#fff" }}
          containerStyle={{ backgroundColor: "#fff" }}
        />
        {list.map((item, index) => (
          <ListItem bottomDivider key={index}>
            <Avatar
              source={{ uri: item.avatar_url }}
              title={item.name[0]}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title style={{ fontWeight: "bold", fontSize: 20 }}>
                {item.name}
              </ListItem.Title>
              <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <Button
              title="Unblock"
              type="solid"
              titleStyle={{ fontWeight: "bold" }}
            />
            {/* <ListItem.Chevron /> */}
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
}

export default Block;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
