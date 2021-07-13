import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Divider } from "native-base";

function EpisodeCard(props) {
  const [episode] = useState(props.episode);

  return (
    <View style={style.episodeCard}>
      <View style={style.episodeCardTitle}>
        <Text>{episode.id}</Text>
        <Text style={style.episodeName}>{episode.name}</Text>
      </View>
      <Divider my={2} />
      <View style={style.episodeCardDetails}>
        <Text>{episode.episode}</Text>
        <Text>{episode.air_date}</Text>
        <Text>{episode.created}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  episodeCard: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    backgroundColor: "#eee",
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
  episodeName: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  episodeCardDetails: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});

export default EpisodeCard;
