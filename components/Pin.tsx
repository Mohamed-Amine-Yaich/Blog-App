import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useNhostClient } from "@nhost/react";
import RemoteImg from "./RemoteImg";

export default function Pin(props) {
  const { uri, title, id } = props.pin;
  console.log(props);
  const [imgUri, setImgUri] = useState<String>("");
  const navigation = useNavigation();
  const route = useRoute();

  const nhost = useNhostClient();

  const gotToPinScreen = () => {
    navigation.navigate("PinScreen", { id });
  };

  return (
    <Pressable onPress={gotToPinScreen} style={styles.pinContainer}>
      <View>
        <RemoteImg pinImg={uri } radius={25} />
        <Pressable style={styles.heart}>
          <AntDesign name="hearto" size={25} color="black" />
        </Pressable>
      </View>

      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pinContainer: {
    margin: 5,
  },
  title: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "bold",
    margin: 10,
  },

  img: {
    width: "100%",
    borderRadius: 25,
  },
  heart: {
    backgroundColor: "#D3CFD4",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
