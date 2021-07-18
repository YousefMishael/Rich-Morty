import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { win } from "../../Utils/AppUtils";
import moment from "moment";

function CharacterHeader(props) {
  //prettier-ignore
  const [character, ] = useState(props.character);

  //Alive, unknown, Dead
  const getStatus = () => {
    switch (character.status) {
      case "Alive":
        return { backgroundColor: "green" };
      case "Dead":
        return { backgroundColor: "red" };
      default:
        return { backgroundColor: "#330099" };
    }
  };

  return typeof character.origin === "undefined" ? null : (
    <View key={props.key}>
      <View style={style.imageContainer}>
        <Image style={style.characterImage} source={{ uri: character.image }} />
      </View>

      <View style={style.detailsContainer}>
        <View style={style.nameContainer}>
          <Text style={style.episodeName}>{character.name}</Text>
          <View style={style.statusContainer}>
            <View style={[style.status, getStatus()]} />
            <Text>{character.status}</Text>
          </View>
        </View>
        <Text>{character.species}</Text>
        <Text>{character.type}</Text>
        <Text>{character.gender}</Text>
        <Text>{character.origin.name}</Text>
        <Text>{character.location.name}</Text>
        <Text>{moment(character.created).format("MMMM DD, YYYY hh:mm a")}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  imageContainer: {
    width: win.width - 10,
    marginHorizontal: 5,
  },
  characterImage: {
    width: "100%",
    aspectRatio: 1,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
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
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  statusContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 5,
  },
});

export default React.memo(CharacterHeader);
