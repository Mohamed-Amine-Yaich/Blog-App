import React, { useState } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function UploadPin(props) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");

  const navigation = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onSubmit = async () => {
    if (title != "" && image != "") {
      const uri = Platform.OS === "ios" ? image.replace("file://", "") : image;

      const pin = {
        title,
        image: uri,
      };
      props.setData(prev => [/* ...prev, */ pin]);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Button title="upload your pin" onPress={pickImage} />
      {image !== "" && (
        <>
          <Image source={{ uri: image }} style={styles.img} />
          <TextInput
            placeholder="title ..."
            value={title}
            onChangeText={val => setTitle(val)}
            style={styles.input}
          />
          <Button title="submit" onPress={onSubmit} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  img: {
    width: "100%",
    aspectRatio: 1,
    marginVertical: 10,
  },
  input: {
    padding: 10,
    marginVertical: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "gainsboto",
    borderRadius: 5,
  },
});
