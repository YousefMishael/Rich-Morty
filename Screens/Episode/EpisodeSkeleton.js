import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "native-base";

function EpisodeSkeleton() {
  return (
    <View style={style.container}>
      <Skeleton height={"70%"} />
      <Skeleton height={16} variant="text" />
      <Skeleton height={16} variant="text" />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
});

export default EpisodeSkeleton;
