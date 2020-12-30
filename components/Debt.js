import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { PricingCard } from "react-native-elements";

function Debt({
  id,
  lender,
  amountBorrowed,
  amountOwed,
  originDate,
  nextPaymentDate,
  cb,
}) {
  return (
    <View style={styles.container}>
      <Text>
        <PricingCard
          color={"#3D5F9C"}
          cb={cb}
          title={lender}
          price={`$${amountOwed}`}
          info={[
            "Due: " + nextPaymentDate,
            "Loan Amount: $" + amountBorrowed,
            "Percent Paid:" +
              Math.ceil(amountBorrowed - amountOwed) / amountBorrowed,
          ]}
          button={{ title: "Make Payment", icon: "payment" }}
          containerStyle={{ width: 375 }}
        />
      </Text>
    </View>
  );
}

export default Debt;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    marginTop: 5,
  },
  title: {
    color: "#28a745",
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 10,
    marginTop: 20,
  },
  oweText: {
    marginLeft: 10,
  },
  owe: {
    fontSize: 25,
  },
});
