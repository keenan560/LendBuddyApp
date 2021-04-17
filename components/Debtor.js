import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { PricingCard } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

function Debtor({
  navigation,
  borrower,
  amountBorrowed,
  amountOwed, 
  originDate,
  nextPaymentDate,
  status,
}) {
  const [claim, setClaim] = useState(false);
  const [claimStatus, setClaimStatus] = useState(false);
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
      <PricingCard
        color={(claimStatus && "gray") || statusColor(status)}
        title={borrower}
        price={`$${amountOwed}`}
        info={[
          "Due: " + nextPaymentDate,
          "Loan Amount: $" + amountBorrowed,
          "Percent Paid:" +
            parseFloat(
              ((amountBorrowed - amountOwed) / amountBorrowed) * 100
            ).toFixed(0) +
            "%",
        ]}
        button={{
          title:
            (claimStatus === true && "Claim Filed") ||
            (status === "Good" && "Good") ||
            (status === "Extension" && "Extentsion") ||
            (status === "Default" && "File a Claim "),

          icon:
            (claimStatus && "check-circle") ||
            (status === "Good" && "attach-money") ||
            (status === "Extension" && "access-time") ||
            (status === "Default" && "gavel"),
          disabled: claimStatus ? true : false,

          onPress: () => {
            if (status === "Default") {
              setClaim(true);
              setTimeout(() => {
                setClaim(false), setClaimStatus(true);
              }, 2000);
            }
          },

          loading: claim ? true : false,
        }}
        containerStyle={{ width: 375 }}
      />
    </View>
  );
}

export default Debtor;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    marginTop: 5,
    flex: 1,
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
