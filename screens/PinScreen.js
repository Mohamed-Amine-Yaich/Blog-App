import React, { useState, useEffect } from "react";

import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { useRoute, useNavigation } from "@react-navigation/native";

import pins from "../assets/pins";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { useNhostClient } from "@nhost/react";
import RemoteImg from "../components/RemoteImg";

export default function PinScreen() {
  const [ratio, setRatio] = useState(1);
  const [pin, setPin] = useState(null);
  const [imgUri, setImgUri] = useState("");

  const route = useRoute();
  const navigation = useNavigation();

  //for the size of the notch ( from r-n-safe-area-context)
  const insets = useSafeAreaInsets();

  const pinId = route.params?.id;

  //separate the logic of the query from the query itself
  const GET_PIN_BY_ID = `query MyQuery($id:uuid!) {
  pins_by_pk(id:$id ) {
    id
    image
    title
    created_at
    user {
      id
   
      avatarUrl
      displayName
    }
  }
}`;

  // const pin = pins.find(p => p.id === pinId);
  //query for pins from api
  const nhost = useNhostClient();
  const fetchPinById = async () => {
    const { data, error } = await nhost.graphql.request(GET_PIN_BY_ID, {
      id: pinId,
    });
    if (data) {
      setPin(data.pins_by_pk);
      console.log("56")
      console.log(data);
    }
  };
  console.log("hel" + pin);

  console.log(pin);

  //when component mount
  useEffect(() => {
    fetchPinById();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <StatusBar style="light" />
      <View style={styles.container}>
        {pin ? <RemoteImg pinImg={pin.image} /> : null}
        <Text style={styles.title}>{pin?.title}</Text>
        <Pressable
          onPress={goBack}
          style={[styles.goBackBtn, { top: insets.top }]}
        >
          <Ionicons name="chevron-back" size={35} color={"white"} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: 100,
  },
  img: {
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 35,
    margin: 10,
  },
  goBackBtn: {
    position: "absolute",
    left: 10,
  },
});
