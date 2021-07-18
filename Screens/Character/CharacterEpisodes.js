import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CharacterHeader from "./CharacterHeader";
import { keyGenerator } from "../../Utils/AppUtils";

function CharacterEpisodes(props) {
  //prettier-ignore
  const [character, ] = useState(props.character);

  const listHeaderComponent = useCallback(() => (
    <CharacterHeader character={character} key={keyGenerator()} />
  ));

  return (
    <View key={props.key}>
      <FlatList
        ListHeaderComponent={listHeaderComponent}
        contentContainerStyle={style.flatlist}
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
