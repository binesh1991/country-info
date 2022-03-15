import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Country from "../model/Country";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    flexDirection: "row",
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

function ListComponent(props: {
  countryData: readonly any[] | null | undefined;
}) {
  return (
    <View style={styles.container}>
      <FlatList
        data={props.countryData}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.subregion}</Text>
        )}
      />
    </View>
  );
}

export default ListComponent;
