import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

function ListComponent(props: {
  countryData: readonly any[] | null | undefined;
}) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    field: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5,
      paddingBottom: 5,
      fontSize: 18,
      height: 50,
    },
    header: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 22,
      fontWeight: "bold",
      height: 50,
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={props.countryData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row", backgroundColor: "#fff" }}>
                <Image
                  style={{ width: 60, height: 50 }}
                  source={{ uri: item.imageUri }}
                />
                <Text style={styles.header}>{item.name}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.field}>Capital: {item.capital}</Text>
                <Text style={styles.field}>Population: {item.population}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.field}>Currency: {item.currency}</Text>
                <Text style={styles.field}>Region: {item.region}</Text>
                <Text style={styles.field}>Subregion: {item.subregion}</Text>
              </View>
              {item.convertedAmount != undefined && (
                <Text style={styles.field}>
                  Converted amount: {item.convertedAmount ?? 0}
                </Text>
              )}
              <View style={{ backgroundColor: "#000", height: 0.5 }} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default ListComponent;
