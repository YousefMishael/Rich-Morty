import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import { Divider } from "native-base";
import moment from "moment";
import { keyGenerator } from "../Utils/AppUtils";
import { getDetails } from "../Utils/ApiServices";

function EpisodeCard(props) {
  //prettier-ignore
  const [episode, ] = useState(props.episode);
  const [images, setImages] = useState([]);

  const getImage = () => {
    try {
      const imgs = [];
      const promises = episode.characters.map(async (ch) => {
        const result = await getDetails(ch);
        imgs.push(result.image);
      });
      Promise.all(promises)
        .then(() => setImages(imgs))
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getImage();
  }, [props.episode]);

  return (
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
        contentContainerStyle={style.flatlist}
        data={images}
        horizontal={true}
        key={"#"}
        // extraData={images}
        keyExtractor={() => "#" + keyGenerator()}
        renderItem={({ item }) => (
          <Image style={style.characterImage} source={{ uri: item }} />
        )}
        // onScroll={() => }
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
  );
}

const style = StyleSheet.create({
  episodeCard: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "column",
    width: "48%",
    marginLeft: "auto",
    marginRight: "auto",
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
  characterImage: {
    width: "100%",
    aspectRatio: 1,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
  charactersLengthText: {
    fontWeight: "bold",
  },
  flatlist: {
    width: "100%",
  },
  detailsItem: {
    marginVertical: 5,
  },
});

export default EpisodeCard;
