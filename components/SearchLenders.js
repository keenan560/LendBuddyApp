import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SearchBar, Text } from "react-native-elements";
import Lender from "./Lender";

const searchLenders = [
  {
    name: "Dylan",
    rating: 4,
    city: "San Francisco",
    online: true,
  },
  {
    name: "Hosea",
    rating: 3,
    city: "Los Angeles",
    online: true,
  },
  {
    name: "Zena",
    rating: 5,
    city: "San Diego",
    online: true,
  },
  {
    name: "Mark",
    rating: 2,
    city: "Sacremento",
    online: false,
  },
  {
    name: "Latoya",
    rating: 5,
    city: "San Jose",
    online: true,
  },
];
const userStateLenders = [
  {
    name: "Tim",
    rating: 4,
    city: "Nashville",
    online: false,
  },
  {
    name: "Josh",
    rating: 3,
    city: "Knoxville",
    online: false,
  },
  {
    name: "Shasha",
    rating: 5,
    city: "Chattanoga",
    online: true,
  },
  {
    name: "Greg",
    rating: 2,
    city: "Franklin",
    online: true,
  },
  {
    name: "Daryl",
    rating: 5,
    city: "Brentwood",
    online: false,
  },
];

function SearchLenders({ navigation }) {
  const [search, setSearch] = useState("");
  const [loading, SetLoading] = useState(false);
  const [lenders, setLenders] = useState([]);

  useEffect(() => {
    setLenders(userStateLenders);
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        round
        lightTheme
        placeholder="Enter State i.e. TN"
        onChangeText={(text) => {
          setSearch(text), setLenders(searchLenders);
        }}
        value={search}
        containerStyle={{ backgroundColor: "#fff" }}
        inputContainerStyle={{ backgroundColor: "#fff" }}
      />

      <ScrollView>
        {lenders ? (
          lenders.map((lender, index) => (
            <Lender
              key={index}
              name={lender.name}
              rating={lender.rating}
              city={lender.city}
              online={lender.online}
            />
          ))
        ) : (
          <Text h4 style={{ textAlign: "center", color: "gray" }}>
            No results..
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

export default SearchLenders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
