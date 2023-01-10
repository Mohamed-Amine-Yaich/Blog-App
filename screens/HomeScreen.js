import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Dimensions, Alert, ActivityIndicator } from "react-native";
import Pin from "../components/Pin";

import Masonry from "react-native-masonry-layout";

export default function HomeScrren(props) {
  const [pins, setPins] = useState([]);
  const [Loading, setLoading] = useState(false);

  const refs = React.useRef();

  const load = () => {
    refs.current.addItems(pins);
  };

  React.useEffect(() => {
    if (refs?.current) {
      if (pins) {
        load();
      }
    }
  }, [pins]);

  React.useEffect(() => {
    fetchPins();
  }, []);

  const fetchPins = async () => {
    setLoading(true);

    if (props.data.length >= 1) {
      setPins(props.data);
      setLoading(false);
    }
    setLoading(false);
  };

  const windowWidth = Math.ceil(Dimensions.get("window").width / 350);
  console.log(props.data[0]);
  if (props.data.length < 1) {
    return <ActivityIndicator size={30} />;
  }

  return (
    <Masonry
      refreshing={Loading}
      onRefresh={fetchPins}
      ref={refs}
      /*  style={{ flex: 1, borderWidth: 1, borderColor: 'red' }} */
      columns={windowWidth} // optional - Default: 2
      renderItem={(item, index) => (
        <Pin
          key={index}
          pin={{ uri: item.image, title: item.title, id: index }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 5,
  },
});
