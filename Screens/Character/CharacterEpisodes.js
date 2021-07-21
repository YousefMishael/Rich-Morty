import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CharacterHeader from "./CharacterHeader";
import { keyGenerator } from "../../Utils/AppUtils";
import EpisodeCard from "../../Components/EpisodeCard";

function CharacterEpisodes(props) {
  //prettier-ignore
  const [character, ] = useState(props.character);
  //prettier-ignore
  const [episodes, ] = useState(props.episodes);

  const keyExtractor = useCallback((item) => item.id.toString());
  const renderItem = useCallback(({ item }) => <EpisodeCard episode={item} />);

  return (
    <View>
      <FlatList
        ListHeaderComponent={<CharacterHeader character={character} />}
        contentContainerStyle={style.flatlist}
        data={episodes}
        extraData={episodes}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        maxToRenderPerBatch={5}
        windowSize={5}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const style = StyleSheet.create({
  flatlist: {
    minHeight: "100%",
  },
});

export default CharacterEpisodes;
