import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  StatusBar,
  FlatList,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Divider, Actionsheet, useDisclose } from "native-base";
import HomeHeader from "./HomeHeader";
import {
  MaterialIcons,
  Fontisto,
  Feather,
  AntDesign,
  EvilIcons,
} from "@expo/vector-icons";
import HomeFooter from "./HomeFooter";
import { IconButton, Button } from "native-base";
import HomeSkeleton from "./HomeSkeleton";
import { getDetails, getSubDetails } from "../../Utils/ApiServices";
import moment from "moment";
import { keyGenerator } from "../../Utils/AppUtils";

function Home(props) {
  //prettier-ignore
  const [episodes, setEpisodes] = useState([]);
  const [info, setInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [loadedCharacters, setLoadedCharacters] = useState([]);
  const [loadedCharactersIndexes, setLoadedCharactersIndexes] = useState([]);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(-1);
  const [key, setKey] = useState(keyGenerator());

  //load episodes from given url
  const load = async (url) => {
    try {
      const response = await getDetails(url);
      setInfo(response.info);
      setEpisodes(response.results);
      setKey(keyGenerator());
    } catch (error) {
      console.error(error);
    }
  };

  // change between screens
  const handleChangeScreen = (action, option) => {
    switch (action) {
      case "NEXT":
        setIsLoading(true);
        load(info.next);
        break;
      case "PREV":
        setIsLoading(true);
        load(info.prev);
        break;
      case "EPISODE":
        props.navigation.push("Episode", { url: episodes[option].url });
        isOpen ? onClose() : null;
        break;
      case "CHAR":
        props.navigation.push("Character", { url: option });
        onClose();
        break;
      default:
        break;
    }
  };

  //Show screen after load (hiding loading component and showing results)
  useEffect(() => {
    let isMounted = true;
    if (isMounted) setIsLoading(false);
    return () => {
      isMounted = false;
    };
  }, [episodes]);

  //Load first screen at first render
  useEffect(() => {
    load("https://rickandmortyapi.com/api/episode");
  }, []);

  //show or hide episode numbers button container at top while scrolling
  const episodeScrollY = new Animated.Value(0);
  const episodeDiffClamp = Animated.diffClamp(episodeScrollY, 0, 50);

  const episodeTranslateY = episodeDiffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
  });

  const flterTransformY = {
    transform: [{ translateY: episodeTranslateY }],
  };
  //show or hide previous and next action buttons container at bottom while scrolling
  const nextPrevScrollY = new Animated.Value(0);
  const nextPrevDiffClamp = Animated.diffClamp(nextPrevScrollY, 0, 50);

  const nextPrevTranslateY = nextPrevDiffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 50],
  });

  const nextPrevTransformY = {
    transform: [{ translateY: nextPrevTranslateY }],
  };

  const openActionSheet = async (index, characters) => {
    onOpen();
    setSelectedEpisodeIndex(index);
    setKey(keyGenerator());

    getSubDetails(characters)
      .then((res) => {
        setLoadedCharacters([...loadedCharacters, res]);
        setLoadedCharactersIndexes([...loadedCharactersIndexes, index]);
      })
      .catch((error) => console.error(error));
  };

  //episodes flatlist callbacks
  const keyExtractor = useCallback((item) => item.id.toString());
  const renderItem = useCallback(({ item, index }) => (
    <View style={style.episodeCard}>
      <TouchableWithoutFeedback
        onPress={handleChangeScreen.bind(this, "EPISODE", index)}
      >
        <View>
          <Text style={style.episodeName}>{item.name}</Text>
          <View style={style.itemDetails}>
            <MaterialIcons
              style={{ marginLeft: "auto" }}
              name="local-movies"
              size={16}
              color="black"
            />
            <Text style={{ marginRight: "auto" }}> {item.episode}</Text>
          </View>
          <View style={style.itemDetails}>
            <MaterialIcons name="live-tv" size={16} color="black" />
            <Text> {item.air_date}</Text>
          </View>
          <View style={style.itemDetails}>
            <Fontisto name="date" size={16} color="black" />
            <Text style={style.detailText} numberOfLines={2}>
              {" "}
              {moment(item.created).format("MMMM DD, YYYY hh:mm a")}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={style.actionContainer}>
        <Feather
          name="more-vertical"
          onPress={openActionSheet.bind(this, index, item.characters)}
          size={16}
          color="black"
        />
      </View>
    </View>
  ));
  const itemSeparator = useCallback(() => <Divider />);
  const onScroll = useCallback((e) => {
    if (
      e.nativeEvent.contentOffset.y - episodeScrollY.__getValue() > 100 ||
      e.nativeEvent.contentOffset.y - episodeScrollY.__getValue() < -100
    ) {
      episodeScrollY.setValue(e.nativeEvent.contentOffset.y + 100);
      nextPrevScrollY.setValue(e.nativeEvent.contentOffset.y - 100);
    }
  });
  const getItemLayout = useCallback((data, index) => {
    return {
      index,
      length: 150,
      offset: index * 150 + 4,
    };
  });

  //characters flatlist callbacks
  const charKeyExtractror = useCallback((item) => item.id.toString());
  const charRenderItem = useCallback(({ item }) => (
    <View style={{ width: 150 }}>
      <TouchableWithoutFeedback
        onPress={handleChangeScreen.bind(this, "CHAR", item.url)}
      >
        <Image source={{ uri: item.image }} style={style.image} />
      </TouchableWithoutFeedback>
    </View>
  ));
  const charGetItemLayout = useCallback((data, index) => {
    return {
      index,
      length: 150,
      offset: index * 150 + 10,
    };
  });
  const charItemSeparator = useCallback(() => (
    <View style={style.horizontalSeparator} />
  ));

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor="#000"
        barStyle="dark-content"
        hidden={false}
      />
      {isLoading ? (
        <HomeSkeleton />
      ) : (
        <View style={style.container}>
          <Animated.View style={[style.episodeContainer, flterTransformY]}>
            <View style={style.episodeItemDetails}>
              <MaterialIcons name="local-movies" size={16} color="black" />
              <Text>Episodes: {info.count}</Text>
            </View>
          </Animated.View>
          <View>
            <FlatList
              style={{
                alignSelf: "center",
                width: "98%",
              }}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              maxToRenderPerBatch={5}
              ListHeaderComponent={
                <HomeHeader
                  episode={
                    selectedEpisodeIndex === -1
                      ? episodes[0]
                      : episodes[selectedEpisodeIndex]
                  }
                  key={key}
                />
              }
              windowSize={5}
              numColumns={2}
              data={episodes}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              onScroll={onScroll}
              ItemSeparatorComponent={itemSeparator}
              ListFooterComponent={HomeFooter}
              getItemLayout={getItemLayout}
            />
          </View>
          <Animated.View
            style={[style.screenActionContainer, nextPrevTransformY]}
          >
            <Text style={{ marginBottom: 10 }}>Pages: {info.pages}</Text>
            <Button.Group
              style={{ marginBottom: 10 }}
              variant="solid"
              isAttached
            >
              <IconButton
                mr={2}
                style={{ backgroundColor: "transparent" }}
                variant="solid"
                icon={<EvilIcons name="arrow-left" size={40} color="red" />}
                onPress={handleChangeScreen.bind(this, "PREV")}
                disabled={info.prev === null ? true : false}
              />
              <IconButton
                style={{ backgroundColor: "transparent" }}
                variant="solid"
                icon={<EvilIcons name="arrow-right" size={40} color="green" />}
                onPress={handleChangeScreen.bind(this, "NEXT")}
                disabled={info.next === null ? true : false}
              />
            </Button.Group>
          </Animated.View>

          {/* Show more action sheet start*/}
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              {selectedEpisodeIndex !== -1 ? (
                <FlatList
                  horizontal
                  maxToRenderPerBatch={5}
                  windowSize={5}
                  showsHorizontalScrollIndicator={false}
                  data={
                    loadedCharacters[
                      loadedCharactersIndexes.indexOf(selectedEpisodeIndex)
                    ]
                  }
                  keyExtractor={charKeyExtractror}
                  renderItem={charRenderItem}
                  getItemLayout={charGetItemLayout}
                  ItemSeparatorComponent={charItemSeparator}
                />
              ) : null}
              <Actionsheet.Item
                onPress={handleChangeScreen.bind(
                  this,
                  "EPISODE",
                  selectedEpisodeIndex
                )}
              >
                Open This Episode
              </Actionsheet.Item>
              <Actionsheet.Item onPress={onClose}>Close</Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
          {/* Show more action sheet end*/}
        </View>
      )}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#e7e7e7",
    minHeight: "100%",
    position: "relative",
  },
  episodeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(255,255,255, 0.7)",
    justifyContent: "space-evenly",
    position: "absolute",
    top: 0,
    width: "100%",
    height: 40,
    zIndex: 1,
  },
  episodeCard: {
    backgroundColor: "white",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    flex: 0.5,
    height: 150,
    margin: 2,
    position: "relative",
  },
  itemDetails: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  episodeName: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 16,
    height: 32,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  actionContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    right: 5,
    top: 0,
  },
  screenActionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    padding: 5,
    backgroundColor: "rgba(255,255,255, 0.7)",
    width: "100%",
  },
  episodeItemDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 15,
    lineHeight: 15,
    height: 30,
  },
  horizontalSeparator: {
    width: 10,
    height: "100%",
  },
});

export default Home;
