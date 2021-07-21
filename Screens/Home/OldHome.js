// ******************* OLD DESIGN *********************

// import React, { useEffect, useState, useCallback } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   StatusBar,
//   FlatList,
//   Animated,
// } from "react-native";
// import { getDetails } from "../../Utils/ApiServices";
// import { Button } from "native-base";
// import HomeSkeleton from "./HomeSkeleton";
// import EpisodeCard from "../../Components/EpisodeCard";
// import { IconButton } from "native-base";
// import { EvilIcons, MaterialIcons } from "@expo/vector-icons";

// function Home() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [info, setInfo] = useState({});
//   const [results, setResults] = useState([]);

//   //show or hide previous and next action buttons container at bottom while scrolling
//   const scrollY = new Animated.Value(0);
//   const diffClamp = Animated.diffClamp(scrollY, 0, 50);

//   const translateY = diffClamp.interpolate({
//     inputRange: [0, 50],
//     outputRange: [0, 50],
//   });

//   const transformY = {
//     transform: [{ translateY: translateY }],
//   };

//   //load episodes from given url
//   const load = async (url) => {
//     try {
//       const response = await getDetails(url);
//       setInfo(response.info);
//       setResults(response.results);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // change between pages
//   const handleChangePage = (action) => {
//     setIsLoading(true);
//     if (action === "NEXT") {
//       load(info.next);
//     } else {
//       load(info.prev);
//     }
//   };

//   //Load first page at first render
//   useEffect(() => {
//     load("https://rickandmortyapi.com/api/episode");
//   }, []);

//   //Show page after load (hiding loading component and showing results)
//   useEffect(() => {
//     setIsLoading(false);
//   }, [results]);

//   const keyExtractor = useCallback((item) => "_" + item.id.toString());
//   const renderItem = useCallback(({ item }) => <EpisodeCard episode={item} />);
//   const onScroll = useCallback((e) =>
//     scrollY.setValue(e.nativeEvent.contentOffset.y)
//   );

//   return (
//     <SafeAreaView style={style.safeAreaView}>
//       <StatusBar
//         backgroundColor="#000"
//         barStyle="dark-content"
//         hidden={false}
//       />

//       {isLoading ? (
//         <HomeSkeleton />
//       ) : (
//         <View style={style.homeContainer}>
//           {/* Episodes flatlist */}
//           <FlatList
//             data={results}
//             contentContainerStyle={style.flatlistContentContainer}
//             numColumns={2}
//             key={"_"}
//             keyExtractor={keyExtractor}
//             renderItem={renderItem}
//             onScroll={onScroll}
//             maxToRenderPerBatch={8}
//             windowSize={5}
//           />

//           {/* Bottom prev next total episods view start */}
//           <Animated.View style={[style.infoContainer, transformY]}>
//             <MaterialIcons
//               style={{ marginLeft: 10 }}
//               name="local-movies"
//               size={24}
//               color="black"
//             />
//             <Text>
//               Total Episodes:{" "}
//               <Text style={style.episodesNumber}>{info.count}</Text>
//             </Text>
//             <Button.Group ml={"auto"} mr={5} variant="solid" isAttached>
//               <IconButton
//                 mr={2}
//                 style={{ backgroundColor: "white" }}
//                 variant="solid"
//                 isDisabled={info.prev === null ? true : false}
//                 onPress={handleChangePage.bind(this, "PREV")}
//                 icon={<EvilIcons name="arrow-left" size={24} color="red" />}
//               />
//               <IconButton
//                 style={{ backgroundColor: "white" }}
//                 variant="solid"
//                 isDisabled={info.next === null ? true : false}
//                 onPress={handleChangePage.bind(this, "NEXT")}
//                 icon={<EvilIcons name="arrow-right" size={24} color="black" />}
//               />
//             </Button.Group>
//           </Animated.View>
//           {/* Bottom prev next total episods view end */}
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

// const style = StyleSheet.create({
//   safeAreaView: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   homeContainer: {
//     display: "flex",
//     flexDirection: "column",
//     position: "relative",
//     //starts top under the status bar for android devices
//     width: "100%",
//     minHeight: "97%",
//   },
//   infoContainer: {
//     padding: 5,
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#EDEDED",
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     height: 50,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,

//     elevation: 3,
//   },
//   episodesNumber: {
//     fontWeight: "bold",
//   },
//   flatlistContentContainer: {
//     justifyContent: "space-evenly",
//   },
// });

// export default Home;
