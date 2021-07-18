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
  const [key, setKey] = useState("sadasdasdasdasdas");

  useEffect(() => {
    getDetails(characterUrl)
      .then((res) => setCharacter(res))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(false);
    if (typeof character.episode !== "undefined") {
      getSubDetails(character.episode).then((res) => {
        if (isMounted) setEpisodes(res);
      });
      if (isMounted) setKey(keyGenerator());
    }
    return () => {
      isMounted = false;
    };
  }, [character]);

  useEffect(() => {
    if (typeof character.episode !== "undefined") setKey(keyGenerator());
  }, [episodes]);

  return (
    <View>
      {isLoading ? (
        <CharacterSkeleton />
      ) : (
        <View style={style.container}>
          <CharacterEpisodes
            character={character}
            key={key}
            episodes={episodes}
          />
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {},
});
export default Character;
