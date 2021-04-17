import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { SearchBar } from "react-native-elements";
import Activity from "./Activity.js";
const activities = [
  {
    id: 0,
    desc: "You lent $50.00 to Carl on 12/18/20",
    type: "Spot",
    borrower: "Carl",
  },
  {
    id: 1,
    desc: "You lent $100.00 to Michelle on 12/20/20",
    type: "Spot",
    borrower: "Michelle",
  },
  {
    id: 2,
    desc: "You received a payment of $37.91 from Lance on 12/22/20",
    type: "Income",
    borrower: "Lisa",
  },
  {
    id: 3,
    desc: "You received a payment of $100.34 from Xavier on 12/29/20",
    type: "Income",
    borrower: "Xavier",
  },
  {
    id: 4,
    desc: "You received a payment of $20.45 from Will on 12/30/20",
    type: "Income",
    borrower: "Will",
  },
  {
    id: 5,
    desc: "You filed a claim on Harry for $64.87 on 12/30/20",
    type: "Filed Claim",
    borrower: "Harry",
  },
];

function LendActivity({ navigation, id, desc, type, borrower }) {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <SearchBar
        lightTheme
        placeholder="Search history"
        round
        onChangeText={(text) => setSearch(text.trim())}
        value={search}
        inputStyle={{ backgroundColor: "#fff" }}
        inputContainerStyle={{ backgroundColor: "#fff" }}
        containerStyle={{ backgroundColor: "#fff" }}
      />
      <ScrollView>
        {activities.map((activity, index) => (
          <Activity
            key={index}
            id={activity.id}
            desc={activity.desc}
            type={activity.type}
            lender={activity.borrower}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default LendActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
