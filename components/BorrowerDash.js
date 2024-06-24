import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import UserContext from "./context/userContext";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc, onSnapshot } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqmWfVvcJykYnjsBdfKzmfquz3C_OffXY",
  authDomain: "lend-buddy.firebaseapp.com",
  databaseURL: "https://lend-buddy.firebaseio.com",
  projectId: "lend-buddy",
  storageBucket: "lend-buddy.appspot.com",
  messagingSenderId: "986357455581",
  appId: "1:986357455581:web:aa2198f5634b08a6731934",
  measurementId: "G-H054QF3GX3",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

function BorrowerDash({ navigation }) {
  const value = useContext(UserContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    const updateUser = async () => {
      const userDocRef = doc(firestore, "users", value.userData.id);
      await updateDoc(userDocRef, {
        activeLender: false,
      });
    };

    updateUser();
  }, [value.userData.id]);

  useEffect(() => {
    const userDocRef = doc(firestore, "users", value.userData.id);
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      setUser(snapshot.data());
    });
    return () => unsubscribe();
  }, [value.userData.id]);

  console.log('', user )

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.iconSpace}>
            <MaterialIcons
              name="shopping-bag"
              size={60}
              color="#28a745"
              onPress={() =>
                navigation.navigate("Discounts", {
                  name: "Discounts",
                })
              }
            />
            <Text style={styles.iconText}>Discounts</Text>
          </View>
          {user && user.totalDebt < 250 ? (
            <View style={styles.iconSpace}>
              <MaterialIcons
                name="card-giftcard"
                size={60}
                color="#28a745"
                onPress={() =>
                  navigation.navigate("Spot Request", {
                    name: "Spot Request Details",
                  })
                }
              />
              <Text style={styles.iconText}>Borrow</Text>
            </View>
          ) : (
            <View>
              <MaterialIcons
                name="warning"
                size={65}
                color="lightgray"
                onPress={() =>
                  alert(
                    "You have reached your limit of $250. Please pay down your balance to borrow again."
                  )
                }
              />
              <Text style={styles.iconText}>Borrow</Text>
            </View>
          )}

          <View style={styles.iconSpace}>
            <MaterialIcons
              name="history"
              size={60}
              color="#28a745"
              onPress={() =>
                navigation.navigate("Borrower Activity", {
                  name: "Borrower Activity",
                })
              }
            />
            <Text style={styles.iconText}>Activity</Text>
          </View>
          <View style={styles.iconSpace}>
            <MaterialIcons
              name="monetization-on"
              size={60}
              color="#28a745"
              onPress={() =>
                navigation.navigate("Pay Debt", { name: "Pay Debt" })
              }
            />
            <Text style={styles.iconText}>Pay Debt</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.iconSpace}>
            <MaterialIcons
              name="person"
              size={60}
              color="#28a745"
              onPress={() =>
                navigation.navigate("Profile", { name: "Profile" })
              }
            />
            <Text style={styles.iconText}>Profile</Text>
          </View>
          <View style={styles.iconSpace}>
            <MaterialCommunityIcons
              name="bank"
              size={60}
              color="#28a745"
              onPress={() =>
                navigation.navigate("Borrower Card Info", {
                  name: "Borrower Card Info",
                })
              }
            />
            <Text style={styles.iconText}>Bank Info</Text>
          </View>
          <View style={styles.iconSpace}>
            <FontAwesome
              name="file-text-o"
              size={60}
              color="#28a745"
              onPress={() => navigation.navigate("Docs", { name: "Docs" })}
            />
            <Text style={styles.iconText}>Docs</Text>
          </View>
          <View style={styles.iconSpace}>
            <MaterialIcons
              name="block"
              size={60}
              color="#28a745"
              onPress={() => navigation.navigate("Block", { name: "Block" })}
            />
            <Text style={styles.iconText}>Block</Text>
          </View>
        </View>
        <View style={styles.row}>
          {user && user.totalDebt < 250 ? (
            <View style={styles.iconSpace}>
              <FontAwesome
                name="search"
                size={60}
                color="#28a745"
                onPress={() =>
                  navigation.navigate("Search", { name: "Search" })
                }
              />
              <Text style={styles.iconText}>Search</Text>
            </View>
          ) : (
            <View>
              <MaterialIcons
                name="warning"
                size={65}
                color="lightgray"
                onPress={() =>
                  alert(
                    "Either you have reached your limit of $250 or you need to ensure your pay stub(s) are up to date."
                  )
                }
              />
              <Text style={styles.iconText}>Search</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  header: {
    height: "20px !important",
  },

  welcome: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 1,
    marginTop: 5,
    marginLeft: 0,
  },
  dashTitle: {
    fontSize: 20,
    color: "gray",
    fontWeight: "bold",
    marginBottom: 1,
    marginTop: 2,
    padding: 10,
  },

  lendColor: {
    color: "#28a745",
    borderRightColor: "gray",
    borderRightWidth: 10,
  },

  oweColor: {
    color: "crimson",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28a745",
    padding: 10,
    width: 375,
    height: 50,
    marginBottom: 5,
    borderRadius: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  iconText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "gray",
  },
  iconSpace: {
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
  },

  iconAlert: {},
});

export default BorrowerDash;
