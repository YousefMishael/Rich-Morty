import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Divider } from "native-base";
import moment from "moment";
import { getSubDetails } from "../Utils/ApiServices";
import { win, ratio } from "../Utils/AppUtils";

function EpisodeCard(props) {
  //prettier-ignore
  const [episode, ] = useState(props.episode);
  const [images, setImages] = useState([]);
  const handleChangePage = props.handleChangePage;
  const [activeOpacity, setActiveOpacity] = useState(2);

  const handleSwithPage = (action) => {
    if (action === "EPISODE") {
      handleChangePage("EPISODE", episode.url);
    }
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
      <Image style={style.characterImage} source={{ uri: item.image }} />
    </View>
  ));

  return (
    <TouchableOpacity
      onPress={handleSwithPage.bind(this, "EPISODE")}
      //delayPressIn={50}
      activeOpacity={activeOpacity}
      style={style.container}
    >
      <View style={style.episodeCard}>
        <View style={style.episodeCardTitle}>
          <View style={style.episodeNameCon}>
            <Text style={style.episodeName} numberOfLines={2}>
              {episode.name}
            </Text>
          </View>
        </View>

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

        <View style={style.episodeCardDetails}>
          <Text style={style.detailsItem}>{episode.episode}</Text>
          <Text style={style.detailsItem}>{episode.air_date}</Text>
          <Text style={style.detailsItem}>
            {moment(episode.created).format("MMMM DD, YYYY hh:mm a")}
          </Text>
          <Text style={style.detailsItem}>
            Characters:{" "}
            <Text style={style.charactersLengthText}>
              {episode.characters.length}
            </Text>
          </Text>
          <Text style={style.detailsItem}>{episode.id}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
    flexDirection: "column",
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
  },
});

export default EpisodeCard;
