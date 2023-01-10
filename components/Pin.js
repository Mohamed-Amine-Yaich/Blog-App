import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RemoteImg from "./RemoteImg";

export default function Pin(props) {
  const { uri, title, id } = props.pin;
  const [ratio, setRatio] = React.useState(1);

  const navigation = useNavigation();

  const gotToPinScreen = () => {
    navigation.navigate("PinScreen", { id });
  };

  React.useEffect(() => {
    if (uri) {
      Image.getSize(uri, (width, height) => setRatio(width / height));
    }
  }, []);
  return (
    <Pressable onPress={gotToPinScreen} style={styles.pinContainer}>
      <View>
        <Image source={{ uri }} style={[styles.img, { aspectRatio: ratio }]} />
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
