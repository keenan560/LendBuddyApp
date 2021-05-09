import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

function Activity({ navigation, id, desc, type, lender }) {
  const typeColor = (type) => {
    if (type === "loan" || type === "spot" || type === "revenue") {
      return "#16AA65";
    }

    if (type === "payment" || type === "income") {
      return "#FCBD00";
    }

    if (type === "filed claim") {
      return "#FF6666";
    }
  };

  return (
    <View style={styles.container}>
      <ListItem bottomDivider>
        <Text>
          {(type === "payment" && (
            <MaterialIcons name="payment" size={24} color={typeColor(type)} />
          )) ||
            (type === "loan" && (
              <MaterialIcons
                name="card-giftcard"
                size={24}
                color={typeColor(type)}
              />
            )) ||
            (type === "income" && (
              <FontAwesome5 name="coins" size={24} color={typeColor(type)} />
            )) ||
            (type === "revenue" && (
              <FontAwesome5
                name="money-bill-wave"
                size={24}
                color={typeColor(type)}
              />
            )) ||
            (type === "filed claim" && (
              <FontAwesome name="legal" size={24} color={typeColor(type)} />
            )) ||
            (type === "spot" && (
              <FontAwesome5 name="seedling" size={24} color={typeColor(type)} />
            ))}
        </Text>
        <ListItem.Content>
          <ListItem.Title
            style={{
              fontWeight: "bold",
              fontSize: 16,
              textTransform: "capitalize",
            }}
          >
            {type}
          </ListItem.Title>
          <ListItem.Subtitle>{desc}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );
}

export default Activity;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  capitalize: {},
});
