import React from "react";
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

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>  
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
