import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-elements";
import { Rating, AirbnbRating } from "react-native-elements";
import Activity from "./Activity";

const payments = [
  {
    id: 0,
    amount: 123.61,
    borrower: "Sean",
    desc: "Received $123.61 from Sean",
  },
  {
    id: 1,
    amount: 65.42,
    borrower: "Tamika",
    desc: "Received $65.42 from Tamika",
  },
  {
    id: 2,
    amount: 97.03,
    borrower: "David",
    desc: "Received $97.03 from David",
  },
  {
    id: 3,
    amount: 24.76,
    borrower: "Leona",
    desc: "Received $24.76 from Leona",
  },
  {
    id: 4,
    amount: 73.04,
    borrower: "Emily",
    desc: "Received $73.04 from Emily",
  },
  {
    id: 5,
    amount: 82.60,
    borrower: "Jackie",
    desc: "Received $82.60 from Jackie",
  },

];
function currencyFormat(num) {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const total = () => {
  let sum = 0;
  payments.map((payment) => (sum += payment.amount));
  return currencyFormat(sum);
};
function Earnings({ navigation }) {
  return (
    <View style={styles.container}>
      <Text h4 style={{ marginTop: 10 }}>
        Dec 28 - Jan 3
      </Text>
      <Text style={{ fontWeight: "bold", fontSize: 50 }}>{total()}</Text>

      <Text> {payments.length} payment(s) received this week</Text>
      <AirbnbRating
        count={5}
        reviews={["Terrible", "Bad", "Average", "Good", "Excellent"]}
        defaultRating={4}
        isDisabled
        size={20}
      />
      <ScrollView style={{ flex: 1, width: "100%" }}>
        {payments.map((payment, index) => (
          <Activity key={index} type="revenue" desc={payment.desc} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Earnings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
