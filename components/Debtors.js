import React from "react";
import {
  Image,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-elements";
import Debtor from "./Debtor";

function Debtors({ navigation }) {
  const debts = [
    {
      id: 0,
      borrower: "Gabriel",
      amountBorrowed: 500,
      amountOwed: 114.71,
      originDate: "11/3/2020",
      nextPaymentDue: "12/3/2020",
      status: "Good",
    },
    {
      id: 0,
      borrower: "Aston",
      amountBorrowed: 1000,
      amountOwed: 890.44,
      originDate: "10/4/2020",
      nextPaymentDue: "11/4/2020",
      status: "Default",
    },
    {
      id: 0,
      borrower: "Lucy",
      amountBorrowed: 50,
      amountOwed: 29.88,
      originDate: "11/3/2020",
      nextPaymentDue: "12/3/2020",
      status: "Extension",
    },
  ];
  let debtTotal = 0;
  const total = debts.map((debt) => (debtTotal += debt.amountOwed));

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text h4>Total Spotted: ${debtTotal.toFixed(2)}</Text>
        <Text>Buddies: {debts.length}</Text>
        {debts.map((debt, index) => (
          <Debtor
            key={index}
            borrower={debt.borrower}
            amountBorrowed={debt.amountBorrowed}
            amountOwed={debt.amountOwed}
            originDate={debt.originDate}
            nextPaymentDate={debt.nextPaymentDue}
            status={debt.status}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Debtors;
