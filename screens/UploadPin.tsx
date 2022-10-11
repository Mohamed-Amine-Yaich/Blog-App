import { RootTabScreenProps } from "../types";

import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNhostClient, useUserDisplayName, useUserId } from "@nhost/react";
import { useNavigation } from "@react-navigation/native";

export default function UploadPin(/* {
  navigation,
}: RootTabScreenProps<"UploadPin"> */) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [uploadedFileId, setUplodedFildId] = useState<any>(null);

  const navigation = useNavigation();

  const nhost = useNhostClient();

  const SET_PIN_MUTATION = `mutation MyMutation ($image :String! , $title :String){
  insert_pins(objects: {image: $image , title : $title}) {
    returning {
      title
      image
      id
      created_at
    }
  }
 
}
`;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      /*  console.log("result.uri", result.uri); */
    }
  };

  const uri = Platform.OS === "ios" ? image.replace("file://", "") : image;

  const uriparts = uri.split("/");
  const name = uriparts[uriparts.length - 1];
  const nameAndExtention = name.split(".");
  const extention = nameAndExtention[nameAndExtention.length - 1];

  const uploadImg = async () => {
    const uploadResponse = await nhost.storage.upload({
      file: {
        name,
        type: `image/${extention}`,
        uri: uri,
      },
    });
    console.log(uploadResponse.fileMetadata);
    if (uploadResponse) {
      setUplodedFildId(uploadResponse?.fileMetadata.id);
      console.log(uploadResponse?.fileMetadata.id);
    }
  };

  const onSubmit = async () => {
    uploadImg();
    /*  console.log(uploadedFileId);

    const { presignedUrl, error } = await nhost.storage.getPresignedUrl({
      fileId: uploadedFileId,
    });

    console.log(presignedUrl, error); */

    const response = await nhost.graphql.request(SET_PIN_MUTATION, {
      title,
      image: /* presignedUrl?.url */ uploadedFileId,
    });
    console.log(response);
    if (response.error) {
      Alert.alert("error uploading", response.error[0].message);
    } else {
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
