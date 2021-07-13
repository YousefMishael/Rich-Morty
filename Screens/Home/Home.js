import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Platform,
  Animated,
} from "react-native";
import { getEpisodes } from "../../Utils/ApiServices";
import { Button } from "native-base";
import HomeSkeleton from "./HomeSkeleton";
import EpisodeCard from "../../Components/EpisodeCard";

function Home() {
  const [state, setState] = useState({
    episodes: "",
    isLoading: true,
  });
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 50);

  const translateY = diffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 50],
  });

  const transformY = {
    transform: [{ translateY: translateY }],
  };

  const loadEpisodes = async () => {
    try {
      const response = await getEpisodes();
      setState({
        episodes: response,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadEpisodes();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor="#000"
        barStyle="dark-content"
        hidden={false}
      />

      {state.isLoading ? (
        <HomeSkeleton />
      ) : (
        <View style={style.homeContainer}>
          {/* Episodes flatlist */}
          <FlatList
            data={state.episodes.results}
            horizontal={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <EpisodeCard episode={item} />}
            onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)}
          />

          {/* Bottom prev next total episods view start */}
          <Animated.View style={[style.infoContainer, transformY]}>
            <Text>
              Total Episodes:{" "}
              <Text style={style.episodesNumber}>
                {state.episodes.info.count}
              </Text>
            </Text>
            <Button.Group variant="solid" isAttached>
              <Button
                isDisabled={state.episodes.info.prev === null ? true : false}
                colorScheme="danger"
                _text={{
                  color: "white",
                }}
                mr={2}
              >
                Prev
              </Button>
              <Button
                colorScheme="teal"
                isDisabled={state.episodes.info.next === null ? true : false}
              >
                Next
              </Button>
            </Button.Group>
          </Animated.View>
          {/* Bottom prev next total episods view end */}
        </View>
      )}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  homeContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    //starts top under the status bar for android devices
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    padding: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#EDEDED",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  episodesNumber: {
    fontWeight: "bold",
  },
});

export default Home;
