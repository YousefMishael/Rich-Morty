import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Divider } from "native-base";
import moment from "moment";
import { keyGenerator } from "../Utils/AppUtils";
import { getDetails } from "../Utils/ApiServices";

const win = Dimensions.get("window");
//image ratio for different devices
const ratio = win.width / 300;

function EpisodeCard(props) {
  //prettier-ignore
  const [episode, ] = useState(props.episode);
  const [images, setImages] = useState([]);
  const handleChangePage = props.handleChangePage;

  //loading characters images from api
  const getImage = async (isMounted) => {
    try {
      const imgs = [];
      const promises = [];

      for (const character of episode.characters) {
        const result = await getDetails(character);
        imgs.push(result.image);
        promises.push(result);
      }
      Promise.all(promises)
        .then(() => {
          if (isMounted) setImages(imgs);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSwithPage = (action) => {
    if (action === "EPISODE") {
      handleChangePage("EPISODE", episode.url);
    }
  };

  useEffect(() => {
    let isMounted = true;
    getImage(isMounted);
    return () => {
      isMounted = false;
    };
  }, [props.episode]);

  return (
    <View style={style.episodeCard}>
      <TouchableOpacity onPress={handleSwithPage.bind(this, "EPISODE")}>
        <View style={style.episodeCardTitle}>
          <View style={style.episodeNameCon}>
            <Text style={style.episodeName} numberOfLines={2}>
              {episode.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Divider my={2} />
      <FlatList
        data={images}
        horizontal
        key={"#"}
        // extraData={images}
        keyExtractor={() => "#" + keyGenerator()}
        renderItem={({ item }) => (
          <View style={style.imageContainer}>
            <Image style={style.characterImage} source={{ uri: item }} />
          </View>
        )}
        // onScroll={() => }
        showsHorizontalScrollIndicator={false}
      />
      <Divider my={2} />
      <TouchableOpacity onPress={handleSwithPage.bind(this, "EPISODE")}>
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
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
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