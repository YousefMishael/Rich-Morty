import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { win } from "../../Utils/AppUtils";
import moment from "moment";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Ionicons,
  Fontisto,
} from "@expo/vector-icons";

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
    <View>
      <View style={style.imageContainer}>
        <Image style={style.characterImage} source={{ uri: character.image }} />
      </View>

      <View style={style.detailsContainer}>
        <View style={style.nameContainer}>
          <MaterialIcons name="perm-identity" size={24} color="black" />
          <Text style={style.episodeName}> {character.name}</Text>
          <View style={style.statusContainer}>
            <View style={[style.status, getStatus()]} />
            <Text>{character.status}</Text>
          </View>
        </View>

        <View style={style.detailsItem}>
          <MaterialCommunityIcons name="human" size={24} color="black" />
          <Text>{character.species}</Text>
        </View>
        <Text style={style.detailsItem}>{character.type}</Text>
        <View style={style.detailsItem}>
          <FontAwesome name="transgender" size={24} color="black" />
          <Text> {character.gender}</Text>
        </View>
        <View style={style.detailsItem}>
          <MaterialIcons name="trip-origin" size={24} color="black" />
          <Text> {character.origin.name}</Text>
        </View>

        <View style={style.detailsItem}>
          <Ionicons name="planet" size={24} color="black" />
          <Text> {character.location.name}</Text>
        </View>
        <View style={style.detailsItem}>
          <Fontisto name="date" size={24} color="black" />
          <Text>
            {" "}
            {moment(character.created).format("MMMM DD, YYYY hh:mm a")}
          </Text>
        </View>
        <View style={style.detailsItemId}>
          <MaterialCommunityIcons name="identifier" size={24} color="black" />
          <Text> {character.id}</Text>
        </View>
        <View style={style.detailsItem}>
          <MaterialIcons name="movie" size={24} color="black" />
          <Text> Episodes:</Text>
        </View>
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  detailsItemId: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
