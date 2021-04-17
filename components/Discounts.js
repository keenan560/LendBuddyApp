import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-elements";
import { Rating, AirbnbRating } from "react-native-elements";
import Merchant from "./Merchant";

const payments = [
  {
    lender: "John",
    amount: 45.94,
    type: "buddyPayment",
    desc: "You paid John $45.94",
  },
  {
    lender: "Calvin",
    amount: 75.12,
    type: "buddyPayment",
    desc: "You paid Calvin $75.12",
  },
  {
    lender: "Brittany",
    amount: 50.87,
    type: "buddyPayment",
    desc: "You paid Brittany $50.87",
  },
  {
    lender: "Martha",
    amount: 125.69,
    type: "buddyPayment",
    desc: "You paid Martha $125.69",
  },
  {
    lender: "Jospeh",
    amount: 100.77,
    type: "buddyPayment",
    desc: "You paid Joseph $100.77",
  },
  {
    lender: "Gregory",
    amount: 150.01,
    type: "buddyPayment",
    desc: "You paid Gregory $150.01",
  },
];

const merchants = [
  {
    merchant: "Amazon",
    imageUrl: require("../assets/amazon.jpg"),
    value: 20,
  },
  {
    merchant: "Macy's",
    imageUrl: require("../assets/macys.jpeg"),
    value: "50% off",
  },
  {
    merchant: "H&M",
    imageUrl: require("../assets/hm.jpg"),
    value: 10,
  },
  {
    merchant: "Starbucks",
    imageUrl: require("../assets/starbucks.png"),
    value: 10,
  },
  {
    merchant: "Barnes & Nobles",
    imageUrl: require("../assets/barnes.png"),
    value: 20,
  },
  {
    merchant: "AMC",
    imageUrl: require("../assets/amc.jpg"),
    value: 20,
  },
  {
    merchant: "Exxon Mobile",
    imageUrl: require("../assets/exxon.png"),
    value: 30,
  },
  {
    merchant: "McDonald's",
    imageUrl: require("../assets/mcdonalds.png"),
    value: 15,
  },
  {
    merchant: "Game Stop",
    imageUrl: require("../assets/gamestop.jpg"),
    value: 50,
  },
  {
    merchant: "Netflix",
    imageUrl: require("../assets/netflix.jpg"),
    value: 15,
  },
  {
    merchant: "Victoria's Secret",
    imageUrl: require("../assets/victoria.png"),
    value: 20,
  },
  {
    merchant: "Chopt",
    imageUrl: require("../assets/chopt.jpg"),
    value: 20,
  },
  {
    merchant: "Forever 21",
    imageUrl: require("../assets/forever21.png"),
    value: 10,
  },
  {
    merchant: "Chipotle",
    imageUrl: require("../assets/chipotle.png"),
    value: 10,
  },
];

function Discounts() {  
  function numFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const buddyPoints = () => {
    let points = 0;
    payments.map((payment) => (points += payment.amount));
    return numFormat(points);
  };

  return (
    <View style={styles.container}>
      <Text h4 style={{ marginTop: 10 }}>
        Buddy Points
      </Text> 
      <Text style={{ fontWeight: "bold", fontSize: 50 }}>{buddyPoints()}</Text>
      <Text style={{color: "green"}}> Earned {payments.length} points this week.</Text>
      <AirbnbRating
        count={5}
        reviews={["Terrible", "Bad", "Average", "Good", "Excellent"]}
        defaultRating={3}
        isDisabled
        size={20}
      />
      <ScrollView>
        {merchants.map((merchant, index) => (
          <Merchant
            key={index}
            merchant={merchant.merchant}
            imageUrl={merchant.imageUrl}
            value={merchant.value}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default Discounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
