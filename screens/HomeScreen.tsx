import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Pin from "../components/Pin";

import Masonry from "react-native-masonry-layout";

//import EditScreenInfo from '../components/EditScreenInfo';
//import { Text} from '../components/Themed';
import { RootTabScreenProps } from "../types";
//import pins from "../assets/pins";
import { Title } from "react-native-paper";

import { useNhostClient } from "@nhost/react";

export default function HomeScrren() {
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

  //use the useNHostClient Hook to get the client that we set up in App.tsx we get it with the provider(nhostprovider)
  const nhost = useNhostClient();

  const fetchPins = async () => {
    //
    setLoading(true);

    //this do not response with data only if we set permissions
    //you neet to define roles and permissons for those roles
    //hasura support role-based access controle
    //you can specify for each role the type of operation that he can do for each table
    //the client that we have we did not specify his role cause his not authanticated so we can use a public role for making the request
    const { data, error } = await nhost.graphql.request(`
query{
  pins {
    title
    id
    user_id
    image
  }
}
`);

    if (data) {
      setPins(data.pins);
    } else {
      Alert.alert("error fetching pins");
    }

    setLoading(false);
  };

  const windowWidth = Math.ceil(Dimensions.get("window").width / 350);
  console.log(windowWidth);

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
          pin={{ uri: item.image, title: item.title, id: item.id }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    /*paddingTop: Constants.statusBarHeight */
    backgroundColor: "#ecf0f1",
    padding: 5,
  },
});
