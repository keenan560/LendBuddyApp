import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { PricingCard } from "react-native-elements";

function Debt({
  id,
  status,
  lender,
  category,
  balance,
  loanAmount,
  amountOwed,
  nextPaymentDate,
  cb,
}) {
  // const statusColor = status => {
  //   if (status !== "Late")  {
  //     return "red"
  //   }
  // }

  const requestExt = () => {};

  return (
    <View style={styles.container}>
      <View>
        <PricingCard
          color={status !== "late" ? "#3D5F9C" : "red"}
          cb={cb}
          title={lender}
          price={`$${amountOwed}`}
          info={[
            "Due: " + new Date(nextPaymentDate?.toDate()).toLocaleString(),
            "Loan Amount: $" + loanAmount,
            "Balance: $" + balance,
            // "Percent Paid:" + Math.ceil(loanAmount - amountOwed) / loanAmount,
          ]}
          button={{
            title: status !== "late" ? "Make Payment" : " Request Extension",
            icon: status !== "late" ? "payment" : "access-time",
          }}
          containerStyle={{ width: 375 }}
          onButtonPress={status === "late" && requestExt}
        />
      </View>
    </View>
  );
}

export default Debt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
