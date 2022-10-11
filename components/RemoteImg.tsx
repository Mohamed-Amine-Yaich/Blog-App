import { useNhostClient } from "@nhost/react";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Image, StyleSheet } from "react-native";

const RemoteImg = ({ pinImg, radius }) => {
  const [ratio, setRatio] = useState(1);
  const [imgUri, setImgUri] = useState("");

  console.log(pinImg);
console.log(radius)
  const nhost = useNhostClient();

  const fetchImg = async () => {
    const { presignedUrl, error } = await nhost.storage.getPresignedUrl({
      fileId: pinImg,
    });
    if (presignedUrl) {
      setImgUri(presignedUrl.url);
    }
  };

  useEffect(() => {
    fetchImg();
    Image.getSize(imgUri, (width, height) => setRatio(width / height));
  }, [pinImg]);

  return (
    <Image
      source={{
        uri: imgUri,
      }}
      style={[
        styles.img,
        { aspectRatio: ratio, borderRadius: radius ? radius : 0 },
      ]}
    />
  );
};

export default RemoteImg;

const styles = StyleSheet.create({
  img: {
    width: "100%",
     borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
 }, 
});
