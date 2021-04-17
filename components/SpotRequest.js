import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Slider } from "react-native-elements";
import { SpotRequestContext } from "../App";

function SpotRequest({ navigation }) {
  const [moneyInput, setMoneyInput] = useState(10);
  const [categoryInput, setCategoryInput] = useState("");
  const requestContext = useContext(SpotRequestContext);

  const findBuddy = () => {
    requestContext.requestDispatch({
      type: "request",
      payload: { amount: moneyInput, category: categoryInput },
    });
    navigation.navigate("Finding Buddy", {
      name: "Finding Buddy",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Spot<Text style={styles.lendColor}>$$</Text>Request
      </Text>
      <Text style={styles.slogan}>Please select the details below</Text>

      <Input
        style={styles.input}
        placeholder="Amount i.e. 50"
        value={parseInt(moneyInput)}
        onChangeText={(text) => setMoneyInput(parseInt(text))}
        clearTextOnFocus
        maxLength={3}
        keyboardType="numbers-and-punctuation"
        returnKeyType="default"
        errorMessage="Enter whole numbers from 10 to 250"
        errorStyle={{ textAlign: "center" }}
      />

      {/* <Picker
        selectedValue={moneyInput}
        style={{
          height: 45,
          width: 350,
          marginBottom: 140,
          backgroundColor: "white",
          fontWeight: "bold",
        }}
        mode={"dropdown"}
        itemStyle={styles.item}
        onValueChange={(itemValue, itemIndex) => setMoneyInput(itemValue)}
      >
        <Picker.Item label="Select amount" value={null} />
        <Picker.Item label="$10.00" value={10} />
        <Picker.Item label="$20.00" value={20} />
        <Picker.Item label="$50.00" value={50} />
        <Picker.Item label="$75.00" value={75} />
        <Picker.Item label="$100.00" value={100} />
        <Picker.Item label="$150.00" value={150} />
        <Picker.Item label="$200.00" value={200} />
        <Picker.Item label="$225.00" value={225} />
        <Picker.Item label="$250.00" value={250} />
      </Picker> */}
      <Picker
        selectedValue={categoryInput}
        style={{ height: 50, width: 350 }}
        enabled
        itemStyle={styles.itemText}
        onValueChange={(itemValue, itemIndex) => setCategoryInput(itemValue)}
      >
        <Picker.Item label="Please select the reason" value={null} />
        <Picker.Item label="Food & Dining" value="Food & Dining" />
        <Picker.Item label="Movies" value="Movies" />
        <Picker.Item label="Pay Bills" value="Bill Payment" />
        <Picker.Item label="Clothes" value="Clothes" />
        <Picker.Item label="Education" value="Education" />
        <Picker.Item label="Personal Care" value="Personal Care" />
        <Picker.Item label="Auto & Transport" value="Auto Transport" />
        <Picker.Item label="Fees" value="Fees" />
        <Picker.Item label="Taxes" value="Taxes" />
      </Picker>
      {moneyInput > 9 &&
      moneyInput <= 250 &&
      typeof moneyInput === "number" &&
      moneyInput.toString().indexOf(".") < 0 &&
      categoryInput ? (
        <TouchableOpacity style={styles.button} onPress={findBuddy}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity disabled style={styles.disabled}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "700",
    marginBottom: 15,
    bottom: 60,
  },

  lendColor: {
    color: "#28a745",
  },

  slogan: {
    color: "#28a745",
    bottom: 57,
    fontSize: 16,
    fontWeight: "normal",
  },

  input: {
    width: 375,
    fontSize: 20,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    height: 50,
    borderWidth: 0.5,
    borderTopColor: "gray",
    borderBottomColor: "gray",
    borderRightColor: "gray",
    borderLeftColor: "gray",
    borderRadius: 5,
    textAlign: "center",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28a745",
    padding: 10,
    width: 375,
    height: 50,
    marginTop: 200,
    bottom: 0,
    borderRadius: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  disabled: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
    padding: 10,
    width: 375,
    height: 50,
    marginTop: 200,
    bottom: 0,
    borderRadius: 5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  left: {
    marginLeft: 0,
    marginRight: 150,
    color: "gray",
  },

  right: {
    marginRight: 0,
    color: "gray",
  },

  item: {
    color: "#28a745",
    fontWeight: "bold",
    fontSize: 50,
    padding: 5,
    backgroundColor: "transparent",
    borderRadius: 50,
  },

  itemText: {
    fontWeight: "bold",
    color: "black",
    backgroundColor: "transparent",
  },
});

export default SpotRequest;
