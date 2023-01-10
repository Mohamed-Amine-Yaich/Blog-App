import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import HomeScrren from "../../screens/HomeScreen";
import ProfileScrren from "../../screens/ProfileScreen";
import UploadPin from "../../screens/UploadPin";
import PinScreen from "../../screens/PinScreen";
import AuthStackNavigator from "./AuthStackNavigator";
export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      {false ? (
        <Stack.Screen
          name="auth"
          component={AuthStackNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PinScreen"
            component={PinScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const [data, setData] = React.useState([]);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "yellow",
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        children={() => <HomeScrren data={data} />}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={"gray"} />,
        }}
      />
      <BottomTab.Screen
        name="UploadPin"
        children={() => <UploadPin setData={setData} />}
        options={{
          title: "Upload a pin",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={"gray"} />,
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileScrren}
        options={{
          tabBarLabel: "",
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={"gray"} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
