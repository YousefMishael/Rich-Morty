import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getSubDetails } from "../../Utils/ApiServices";
import { useNavigation } from "@react-navigation/native";

function HomeHeader(props) {
  //prettier-ignore
  const [episode, ] = useState(props.episode);
  const [image, setImage] = useState([]);
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = window.setInterval(
      () => setIndex((prevIndex) => prevIndex + 1),
      5000
    );

    return () => {
      clearInterval(interval);
    };
  }, [image]);

  useEffect(() => {
    let isMounted = true;

    if (typeof episode !== "undefined")
      getSubDetails(episode.characters).then((res) => {
        if (isMounted) {
          setImage(res);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChangeScreen = () => {
    navigation.navigate("Episode", { url: episode.url });
  };

  return typeof episode !== "undefined" ? (
    <View style={style.firstItemCard}>
      <Image
        style={style.image}
        resizeMode="contain"
        key={index.toString()}
        source={{
          uri: image.length > 0 ? image[index].image : null,
        }}
      />
      <View style={style.firstItemDetails}>
        <Text style={style.episodeName} numberOfLines={2}>
          {episode.name}
        </Text>
        <View style={style.firstItemActions}>
          <TouchableWithoutFeedback onPress={handleChangeScreen}>
            <View style={style.actionitem}>
              <Text>Show </Text>
              <AntDesign name="arrowright" size={16} color="black" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  ) : null;
}

const style = StyleSheet.create({
  firstItemCard: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    width: "98%",
    alignSelf: "center",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 10,
  },
  firstItemActions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 10,
  },
  firstItemDetails: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingVertical: 10,
  },
  itemDetails: {
    marginTop: 10,
  },
  episodeName: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  actionitem: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default HomeHeader;
