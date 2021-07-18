import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { getDetails, getSubDetails } from "../../Utils/ApiServices";
import CharacterSkeleton from "./CharacterSkeleton";
import CharacterEpisodes from "./CharacterEpisodes";
import { keyGenerator } from "../../Utils/AppUtils";

function Character(props) {
  //prettier-ignore
  const [characterUrl,] = useState(props.route.params.url);
  const [character, setCharacter] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(keyGenerator());

  useEffect(() => {
    getDetails(characterUrl)
      .then((res) => setCharacter(res))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setIsLoading(false);
    if (typeof character.episode !== "undefined") {
      getSubDetails(character.episode).then((res) => setEpisodes(res));
      setKey(keyGenerator());
    }
  }, [character]);

  return (
    <View>
      {isLoading ? (
        <CharacterSkeleton />
      ) : (
        <View style={style.container}>
          <CharacterEpisodes character={character} key={key} />
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {},
});
export default Character;
