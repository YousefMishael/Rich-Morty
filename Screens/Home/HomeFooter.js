import React from "react";
import { View, StyleSheet, Text } from "react-native";

function HomeFooter() {
  return (
    <View style={style.footerContainer}>
      <Text style={style.footerText}>Rick {"&"} Morty © 2021</Text>
    </View>
  );
}

const style = StyleSheet.create({
  footerContainer: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  footerText: {
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});

export default HomeFooter;
