import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Debt from "./Debt";

function PayDebt({ navigation }) {
  const debts = [
    {
      id: 0,
      lender: "Peter",
      amountBorrowed: 50,
      amountOwed: 30.45,
      originDate: "11/3/2020",
      nextPaymentDue: "12/3/2020",
    },
    {
      id: 0,
      lender: "Michael",
      amountBorrowed: 100,
      amountOwed: 19.12,
      originDate: "10/4/2020",
      nextPaymentDue: "11/4/2020",
    },
    {
      id: 0,
      lender: "Amber",
      amountBorrowed: 250,
      amountOwed: 167.78,
      originDate: "11/3/2020",
      nextPaymentDue: "12/3/2020",
    },
    {
      id: 0,
      lender: "Colin",
      amountBorrowed: 75,
      amountOwed: 30.45,
      originDate: "11/3/2020",
      nextPaymentDue: "12/3/2020",
    },
  ];
  let debtTotal = 0;
  const total = debts.map((debt) => (debtTotal += debt.amountOwed));

  const [modalVisible, setModalVisible] = useState(false);

  console.log(modalVisible);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text h4>Total Debt: ${debtTotal.toFixed(2)}</Text>
        <Text>Buddies: {debts.length}</Text>
        {debts.map((debt, index) => (
          <View>
            <Debt
              key={index}
              lender={debt.lender}
              amountBorrowed={debt.amountBorrowed}
              amountOwed={debt.amountOwed}
              originDate={debt.originDate}
              nextPaymentDate={debt.nextPaymentDue}
            />
            {/* <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Text style={styles.textStyle}>Make Payment</Text>
            </TouchableHighlight>
            */}
          </View>
        ))}
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {/* <Text style={styles.modalText}>Hello World!</Text> */}
                <Input
                  placeholder="Enter Amount"
                  rightIcon={{ type: "font-awesome", name: "dollar" }}
                />

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Submit</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

          <TouchableHighlight
            style={styles.openButton}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.textStyle}>Show Modal</Text>
          </TouchableHighlight>
        </View>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 375
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default PayDebt;
