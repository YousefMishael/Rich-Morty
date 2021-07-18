import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { getDetails } from "../../Utils/ApiServices";
import EpisodeSkeleton from "./EpisodeSkeleton";
import moment from "moment";

function Episode(props) {
  //prettier-ignore
  const [episodeUrl, ] = useState(props.route.params.url);
  const [episode, setEpisode] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    try {
      async function getEpisode() {
        const result = await getDetails(episodeUrl);
        setEpisode(result);
      }
      getEpisode();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (firstRender) setFirstRender(false);
    else setIsLoading(false);
  }, [episode]);

  return (
    <View style={style.container}>
      {isLoading ? (
        <EpisodeSkeleton />
      ) : (
        <View>
          <View style={style.charactersContainer}></View>
          <View style={style.detailsContainer}>
            <Text style={style.episodeName}>{episode.name}</Text>
            <Text>{episode.episode}</Text>
            <Text style={style.detailsItem}>Air date: {episode.air_date}</Text>
            <Text style={style.detailsItem}>
              Created date:{" "}
              {moment(episode.created).format("MMMM DD, YYYY hh:mm a")}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
  },
  charactersContainer: {
    height: "70%",
    borderWidth: 1,
    borderColor: "black",
  },
  detailsContainer: {
    marginTop: 10,
    padding: 10,
  },
  episodeName: {
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  detailsItem: {
    marginTop: 10,
  },
});

export default React.memo(Episode);
