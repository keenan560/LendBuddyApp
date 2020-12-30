import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { PricingCard } from "react-native-elements";

function Debtor({
  borrower,
  amountBorrowed,
  amountOwed,
  originDate,
  nextPaymentDate,
  status,
}) {
  const statusColor = (status) => {
    if (status === "Good") {
      return "#28a745";
    }

    if (status === "Default") {
      return "#ff6666";
    }

    if (status === "Extension") {
      return "#ff8c1a";
    }
  };
  return (
    <View style={styles.container}>
      <Text>
        <PricingCard
          color={statusColor(status)}
          title={borrower}
          price={`$${amountOwed}`}
          info={[
            "Due: " + nextPaymentDate,
            "Loan Amount: $" + amountBorrowed,
            "Percent Paid:" +
              Math.ceil(amountBorrowed - amountOwed) / amountBorrowed,
          ]}
          button={{ title: status, icon: "attach-money" }}
          containerStyle={{ width: 375 }}
        />
      </Text>
    </View>
  );
}

export default Debtor;

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
