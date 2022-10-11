/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ActivityIndicator, ColorSchemeName, Pressable } from "react-native";

import Colors from "../../constants/Colors";
import useColorScheme from "../useColorScheme";
import ModalScreen from "../../screens/ModalScreen";
import NotFoundScreen from "../../screens/NotFoundScreen";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../../types";
import LinkingConfiguration from "./LinkingConfiguration";
import HomeScrren from "../../screens/HomeScreen";
import ProfileScrren from "../../screens/ProfileScreen";
import UploadPin from "../../screens/UploadPin";
import PinScreen from "../../screens/PinScreen";
import AuthStackNavigator from "./AuthStackNavigator";
import { useAuthenticationStatus } from "@nhost/react";
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
     /*  linking={LinkingConfiguration}
      theme={colorScheme === "light" ? DarkTheme : DefaultTheme} */
    >
     <RootNavigator />
   
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {


const {isAuthenticated,isLoading} = useAuthenticationStatus()

/* if(isLoading){
 return <ActivityIndicator />
} */



  return (
    <Stack.Navigator>
      {!isAuthenticated?( <Stack.Screen
        name="auth"
        component={AuthStackNavigator}
        options={{ headerShown: false }}
      />) :(
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

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
        </>
      )
      }
      
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel:false
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScrren}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={"gray"} />,
  /*  headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                // color={Colors[colorScheme].text} 
                color={"black"}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ), */
        }}
      />
      <BottomTab.Screen
        name="UploadPin"
        component={UploadPin}
        options={{
          title: "Upload a pin",
          tabBarLabel :"", 
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={"gray"} />,
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileScrren}
        options={{
          tabBarLabel:"",
          title :"Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={"gray"} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
