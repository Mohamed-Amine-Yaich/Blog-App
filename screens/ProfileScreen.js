import React, { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

import Masonry from "react-native-masonry-layout";
import Pin from "../components/Pin";
import {
  
  useNhostClient,
  useSignOut,
  useUserDisplayName,
  useUserEmail,
  useUserId,
} from "@nhost/react";

export default function ProfileScrren() {
  const [userDisplayName, setUserdisplayName] = useState("");
  const name = useUserDisplayName();


  const GET_USER_PINS = `query MyQuery ($id: uuid ){
  pins(where: {user_id: {_eq:$id}}) {
    image
    id
    title
  }
}`;

  const refs = React.useRef();

  const nhost = useNhostClient();
  const currentUserId = useUserId();
  const load = async () => {
    //in this request i query from pins by userId or we need data about user also
    //so better query that I query from user by userId and get also pins of that user 
    const response = await nhost.graphql.request(GET_USER_PINS, {
      id: currentUserId,
    });

    console.log(response);
    if (response) {
      refs.current.addItems(response.data.pins);
    }
  };

  React.useEffect(() => {
    setUserdisplayName(name);

    if (refs?.current) {
      load();
    }
  }, []);

  const { signOut } = useSignOut();

  return (
    <ScrollView>
      <View style={styles.header}>
        <View style={styles.icons}>
          <Feather name={"share"} size={20} style={styles.icon} />
          <Entypo
            name={"dots-three-horizontal"}
            size={20}
            style={styles.icon}
            onPress={signOut}
          />
        </View>
        <Image
          source={{
            uri: "https://scontent.ftun10-1.fna.fbcdn.net/v/t39.30808-6/271248472_4638296892924409_4936450570907656593_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=r5yB7dCe8QMAX86w-xE&_nc_ht=scontent.ftun10-1.fna&oh=00_AT929TUksd_1RyxGugeWyxCueM4pW4qf4RJsoYZwhiAytg&oe=62ED393B",
          }}
          style={styles.profileImg}
        />
        <Text style={styles.title}>{userDisplayName}</Text>
        <Text style={styles.subTitle}>152 Following | 565 Followers </Text>
      </View>

      <Masonry
        ref={refs}
        /*  style={{ flex: 1, borderWidth: 1, borderColor: 'red' }} */
        columns={2} // optional - Default: 2
        renderItem={(item, index) => (
          <Pin
            key={index}
            pin={{ uri: item.image, title: item.title, id: item.id }}
          />
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    margin: 5,
  },
  icon: {
    padding: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "600",
    margin: 10,
  },
  profileImg: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 20,
  },
});
