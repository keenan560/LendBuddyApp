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
      amountBorrowed: 150,
      amountOwed: 86.63,
      originDate: "11/3/2020",
      nextPaymentDue: "12/3/2020",
      status: "Good",
    },
    {
      id: 1,
      borrower: "Aston",
      amountBorrowed: 250,
      amountOwed: 144.38,
      originDate: "10/4/2020",
      nextPaymentDue: "11/4/2020",
      status: "Default",
    },
    {
      id: 2,
      borrower: "Lucy",
      amountBorrowed: 50,
      amountOwed: 28.88,
      originDate: "11/3/2020",
      nextPaymentDue: "12/3/2020",
      status: "Extension",
    },
    // {
    //   id: 2,
    //   borrower: "Maggie",
    //   amountBorrowed: 125,
    //   amountOwed: 86,
    //   originDate: "11/3/2020",
    //   nextPaymentDue: "Yesterday",
    //   status: "Late",
    // },
  ];
  let debtTotal = 0;
  const total = debts.map((debt) => (debtTotal += debt.amountOwed));

  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text h4>Total Spotted: {currencyFormat(debtTotal)}</Text>
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
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Debtors;
