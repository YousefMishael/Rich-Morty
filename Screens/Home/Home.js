import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Animated,
} from "react-native";
import { getDetails } from "../../Utils/ApiServices";
import { Button } from "native-base";
import HomeSkeleton from "./HomeSkeleton";
import EpisodeCard from "../../Components/EpisodeCard";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [results, setResults] = useState([]);

  //show or hide previous and next action buttons container at bottom while scrolling
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 50);

  const translateY = diffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 50],
  });

  const transformY = {
    transform: [{ translateY: translateY }],
  };

  //load episodes from given url
  const load = async (url) => {
    try {
      const response = await getDetails(url);
      setInfo(response.info);
      setResults(response.results);
    } catch (error) {
      console.error(error);
    }
  };

  // change page by next and previous buttons
  const handleChangePage = async (action) => {
    setIsLoading(true);
    if (action === "NEXT") {
      load(info.next);
    } else {
      load(info.prev);
    }
  };

  //Load first page at first render
  useEffect(() => {
    load("https://rickandmortyapi.com/api/episode");
  }, []);

  //Show page after load (hiding loading component and showing results)
  useEffect(() => {
    setIsLoading(false);
  }, [results]);

  return (
    <SafeAreaView style={style.safeAreaView}>
      <StatusBar
        backgroundColor="#000"
        barStyle="dark-content"
        hidden={false}
      />

      {isLoading ? (
        <HomeSkeleton />
      ) : (
        <View style={style.homeContainer}>
          {/* Episodes flatlist */}
          <FlatList
            data={results}
            horizontal={false}
            contentContainerStyle={style.flatlistContentContainer}
            numColumns={2}
            key={"_"}
            keyExtractor={(item) => "_" + item.id.toString()}
            renderItem={({ item }) => <EpisodeCard episode={item} />}
            onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)}
          />

          {/* Bottom prev next total episods view start */}
          <Animated.View style={[style.infoContainer, transformY]}>
            <Text>
              Total Episodes:{" "}
              <Text style={style.episodesNumber}>{info.count}</Text>
            </Text>
            <Button.Group variant="solid" isAttached>
              <Button
                isDisabled={info.prev === null ? true : false}
                colorScheme="danger"
                _text={{
                  color: "white",
                }}
                mr={2}
                onPress={handleChangePage.bind(this, "PREV")}
              >
                Prev
              </Button>
              <Button
                colorScheme="teal"
                isDisabled={info.next === null ? true : false}
                onPress={handleChangePage.bind(this, "NEXT")}
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
  safeAreaView: {
    display: "flex",
    flexDirection: "column",
  },
  homeContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    //starts top under the status bar for android devices
    width: "100%",
    minHeight: "95%",
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
  flatlistContentContainer: {
    justifyContent: "space-evenly",
  },
});

export default Home;
