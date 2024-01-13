import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  family,
  addresses,
  categories,
  colors,
} from "../../constants/constants";
import { styles } from "../../styles/StylesSheet";
import Categories from "../categories";

export default function EditAddressModal({ editAddressModal, setEditAddressModal }) {
  return (
    <View>
      <Modal
        visible={editAddressModal}
        animationType="slide"
        transparent={true}
        style={{ zIndex: 10 }}
      >
        <View
          style={{
            top: "60%",
            height: "40%",
            display: "flex",
            backgroundColor: "#FFF",
            paddingLeft: 16,
            paddingRight: 16,
            shadowColor: "#000",
            shadowRadius: 4,
            shadowOffset: { width: -6, height: -4 },
            shadowOpacity: 0.2,
            borderTopColor: "#EFEAEA",
            borderTopWidth: 1,
            borderTopLeftRadius: 0,
            /* justifyContent: "flex-end", */
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: 700 }}>Адрес</Text>
            <View>
              {/* <TouchableOpacity onPress={() => setEditAddressModal(false)}>
                <Image source={require("../assets/images/delete.png")} />
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => setEditAddressModal(false)}>
                <Image source={require("../../assets/images/done.png")} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: styles.fontSizeText, fontWeight: 700 }}>
              Название места
            </Text>
            <TextInput
              style={styles.input}
              /* 
                onChangeText={props.handleChange("title")}
                onBlur={props.handleBlur("title")}
                value={props.values.title} */
            />
          </View>
          <View>
            <Text style={{ fontSize: styles.fontSizeText, fontWeight: 700 }}>
              Адрес
            </Text>
            <TextInput
              style={styles.input}
              /* 
                onChangeText={props.handleChange("title")}
                onBlur={props.handleBlur("title")}
                value={props.values.title} */
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
