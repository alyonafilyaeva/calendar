import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React from "react";
import { styles } from "../styles/StylesSheet";
import { family, addresses, categories } from "../constants/constants";

export default function Categories() {
  const list = () => {
    return categories.map((item) => {
      return (
        <View style={styles.category} key={item.id}>
          <Text style={{ fontSize: styles.fontSizeText }}>{item.title}</Text>
        </View>
      );
    });
  };
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <TouchableOpacity style={styles.categoriesItems}>{list()}</TouchableOpacity>
    </View>
  );
}
