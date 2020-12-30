import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

function SpotRequest({ navigation }) {
  const [moneyInput, setMoneyInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  console.log(moneyInput);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Spot<Text style={styles.lendColor}>$$</Text>Request
      </Text>
      <Text style={styles.slogan}>Please select the details below</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount (whole dollars only)"
        textContentType="creditCardNumber"
        value={parseInt(moneyInput)}
        onChangeText={(text) => setMoneyInput(parseInt(text))}
        clearTextOnFocus
        blurOnSubmit
        keyboardType="number-pad"
      />
      <Text>Range of $10 t0 $250</Text>
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
        <Picker.Item label="$30.00" value={30} />
        <Picker.Item label="$40.00" value={40} />

 
      </Picker> */}

      <Picker
        selectedValue={categoryInput}
        style={{ height: 50, width: 350 }}
        enabled
        itemStyle={styles.itemText}
        onValueChange={(itemValue, itemIndex) => setCategoryInput(itemValue)}
      >
        <Picker.Item label="Please select the reason" value={null} />
        <Picker.Item label="Food & Dining" value="food" />
        <Picker.Item label="Movies" value="movies" />
        <Picker.Item label="Clothes" value="clothes" />
        <Picker.Item label="Education" value="education" />
        <Picker.Item label="Personal Care" value="personal_care" />
        <Picker.Item label="Auto & Transport" value="auto_transport" />
        <Picker.Item label="Fees" value="fees" />
        <Picker.Item label="Taxes" value="taxes" />
      </Picker>
      {moneyInput > 9 &&
      moneyInput <= 250 &&
      typeof moneyInput === "number" &&
      categoryInput ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Finding Buddy", {
              name: "Finding Buddy",
            })
          }
        >
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
