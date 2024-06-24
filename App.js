import React, { useContext, useState, useReducer } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/Home";
import Login from "./components/Login";
import Join from "./components/Join";
import Dashboard from "./components/Dashboard";
import SpotRequest from "./components/SpotRequest";
import BorrowMap from "./components/BorrowMap";
import PayDebt from "./components/PayDebt";
import Debtors from "./components/Debtors";
import Profile from "./components/Profile";
import Block from "./components/Block";
import Docs from "./components/Docs";
import Camera from "./components/Camera";
import Messages from "./components/Messages";
import Chat from "./components/Chat";
import borrowerActivity from "./components/borrowerActivity";
import BorrowerCardInfo from "./components/BorrowerCardInfo";
import LenderActivity from "./components/LenderActivity";
import Earnings from "./components/Earnings";
import Discounts from "./components/Discounts";
import SearchLenders from "./components/SearchLenders";
import UserContext from "./components/context/userContext";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

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

const Stack = createStackNavigator();

export const SpotRequestContext = React.createContext();

const initialRequest = { amount: 0, category: "none" };
const requestReducer = (state, action) => {
  switch (action.type) {
    case "request":
      return action.payload;
    default:
      return initialRequest;
  }
};

export default function App() {
  const [user, setUser] = useState(null);
  const value = useContext(UserContext);
  const [userData, setUserData] = useState("");

  const [request, requestDispatch] = useReducer(requestReducer, initialRequest);

  const login = (appUser) => {
    if (appUser) {
      setUser(appUser);
    }
  };

  const logout = () => {
    console.log("logout");
    setUser(null);
  };

  const getUserData = async (appUser) => {
    if (appUser) {
      const userDoc = await getDoc(doc(firestore, "users", appUser));
      if (userDoc.exists()) {
        console.log("Document data:", userDoc.data());
        setUserData(userDoc.data());
      } else {
        console.log("No such document!");
      }
    }
  };

  return (
    <SpotRequestContext.Provider
      value={{ requestState: request, requestDispatch: requestDispatch }}
    >
      <NavigationContainer>
        <UserContext.Provider
          value={{
            user: user,
            login: login,
            logout: logout,
            getUserData: getUserData,
            id: null,
            userData: userData,
          }}
        >
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: "Welcome" }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "Login" }}
            />
            <Stack.Screen
              name="Join"
              component={Join}
              options={{ title: "Register" }}
            />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{ title: "Dashboard" }}
            />
            <Stack.Screen
              name="Spot Request"
              component={SpotRequest}
              options={{ title: "Spot Request Details" }}
            />
            <Stack.Screen
              name="Finding Buddy"
              component={BorrowMap}
              options={{ title: "Finding Buddy" }}
            />
            <Stack.Screen
              name="Pay Debt"
              component={PayDebt}
              options={{ title: "Debt" }}
            />
            <Stack.Screen
              name="Debtors"
              component={Debtors}
              options={{ title: "Debtors" }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ title: "Profile" }}
            />
            <Stack.Screen
              name="Block"
              component={Block}
              options={{ title: "Block Users" }}
            />
            <Stack.Screen
              name="Docs"
              component={Docs}
              options={{ title: "Documents" }}
            />
            <Stack.Screen
              name="Camera"
              component={Camera}
              options={{ title: "Take Photo" }}
            />
            <Stack.Screen
              name="Messages"
              component={Messages}
              options={{ title: "Messages" }}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{ title: "Chat" }}
            />
            <Stack.Screen
              name="Borrower Activity"
              component={borrowerActivity}
              options={{ title: "Activity" }}
            />
            <Stack.Screen
              name="Borrower Card Info"
              component={BorrowerCardInfo}
              options={{ title: "Card Details" }}
            />
            <Stack.Screen
              name="Lender Activity"
              component={LenderActivity}
              options={{ title: "Activity" }}
            />
            <Stack.Screen
              name="Earnings"
              component={Earnings}
              options={{ title: "Earnings" }}
            />
            <Stack.Screen
              name="Discounts"
              component={Discounts}
              options={{ title: "Discounts" }}
            />
            <Stack.Screen
              name="Search"
              component={SearchLenders}
              options={{ title: "Search" }}
            />
          </Stack.Navigator>
        </UserContext.Provider>
      </NavigationContainer>
    </SpotRequestContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
