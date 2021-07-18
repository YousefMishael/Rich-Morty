import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Divider } from "native-base";
import moment from "moment";
import { getSubDetails } from "../Utils/ApiServices";
import { win, ratio } from "../Utils/AppUtils";
import { useNavigation } from "@react-navigation/native";
import {
  MaterialIcons,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

function EpisodeCard(props) {
  //prettier-ignore
  const [episode, ] = useState(props.episode);
  const [images, setImages] = useState([]);
  const [activeOpacity, setActiveOpacity] = useState(2);
  const navigation = useNavigation();

  const handleSwithPage = (action, url) => {
    if (action === "EPISODE") navigation.push("Episode", { url: episode.url });
    else navigation.push("Character", { url: url });
  };

  useEffect(() => {
    let isMounted = true;

    getSubDetails(episode.characters)
      .then((res) => {
        if (isMounted) setImages(res);
      })
      .catch((error) => console.error(error));

    return () => {
      isMounted = false;
    };
  }, [props.episode]);

  //prevent the hifhlight effect when scrolling for characters
  const handleChangeOpacity = (type) => {
    if (type === "SCROLLING") setActiveOpacity(1);
    else setActiveOpacity(2);
  };

  const keyExtractor = useCallback((item) => item.id.toString());
  const renderItem = useCallback(({ item }) => (
    <View style={style.imageContainer} onStartShouldSetResponder={() => true}>
      <TouchableWithoutFeedback
        onPress={handleSwithPage.bind(this, "CHARACTER", item.url)}
      >
        <Image style={style.characterImage} source={{ uri: item.image }} />
      </TouchableWithoutFeedback>
    </View>
  ));

  return (
    <View style={style.episodeCard}>
      <TouchableWithoutFeedback
        onPress={handleSwithPage.bind(this, "EPISODE")}
        //delayPressIn={50}
        activeOpacity={activeOpacity}
        style={style.container}
      >
        <View style={style.episodeCardTitle}>
          <View style={style.episodeNameCon}>
            <MaterialIcons name="movie" size={24} color="black" />
            <Text style={style.episodeName} numberOfLines={2}>
              {episode.name}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Divider my={2} />
      <FlatList
        data={images}
        horizontal
        key={"#"}
        maxToRenderPerBatch={5}
        windowSize={4}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onScrollBeginDrag={handleChangeOpacity.bind(this, "SCROLLING")}
        onScrollEndDrag={handleChangeOpacity.bind(this, "END")}
        showsHorizontalScrollIndicator={false}
      />
      <Divider my={2} />
      <TouchableWithoutFeedback
        onPress={handleSwithPage.bind(this, "EPISODE")}
        //delayPressIn={50}
        activeOpacity={activeOpacity}
        style={style.container}
      >
        <View style={style.episodeCardDetails}>
          <View style={style.detailsItem}>
            <MaterialIcons name="local-movies" size={24} color="black" />
            <Text> {episode.episode}</Text>
          </View>
          <View style={style.detailsItem}>
            <MaterialIcons name="live-tv" size={24} color="black" />
            <Text> {episode.air_date}</Text>
          </View>
          <View style={style.detailsItem}>
            <Fontisto name="date" size={24} color="black" />
            <Text>
              {" "}
              {moment(episode.created).format("MMMM DD, YYYY hh:mm a")}
            </Text>
          </View>
          <View style={style.detailsItem}>
            <Fontisto name="persons" size={24} color="black" />
            <Text>
              {" "}
              Characters:{" "}
              <Text style={style.charactersLengthText}>
                {episode.characters.length}
              </Text>
            </Text>
          </View>
          <View style={style.detailsItem}>
            <MaterialCommunityIcons name="identifier" size={24} color="black" />
            <Text> {episode.id}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 0.5,
  },
  episodeCard: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "column",
    flex: 0.5,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    padding: 10,
  },
  episodeCardTitle: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
  episodeNameCon: {
    marginLeft: "auto",
    marginRight: "auto",
    height: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  episodeName: {
    fontWeight: "bold",
    lineHeight: 16,
  },
  episodeCardDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  imageContainer: {
    width: win.width / 2.5,
    //prettier-ignore
    height: (300 * ratio)/2.5,
    marginHorizontal: 5,
  },
  characterImage: {
    width: "100%",
    height: "100%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
  charactersLengthText: {
    fontWeight: "bold",
  },
  detailsItem: {
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default React.memo(EpisodeCard);
