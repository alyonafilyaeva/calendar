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
import { router, useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { members, colors, baseUrl, token } from "../../constants/constants";
import { styles } from "../../styles/StylesSheet";
import Categories from "../categories";
import axios from "axios";

export default function EditFamilyModal({ editFamilyModal, setEditFamilyModal, child, token }) {
  const router = useRouter();
  const deleteChild = () => {
    axios.delete(`${baseUrl}/users/children/${child.id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setEditFamilyModal(false)
    router.push('/profile')
  };
  return (
    <View>
      <Modal
        visible={editFamilyModal}
        animationType="slide"
        transparent={true}
        style={{ zIndex: 10 }}
      >
        <View
          style={{
            top: "75%",
            /* height: "40%", */
            display: "flex",
            backgroundColor: "#FFF",
            padding: 16,
            shadowColor: "#000",
            shadowRadius: 4,
            shadowOffset: { width: -6, height: -4 },
            shadowOpacity: 0.2,
            borderTopColor: "#EFEAEA",
            borderTopWidth: 1,
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
            <Text style={{ fontSize: 22, fontWeight: 700 }}>{child.name}</Text>

            <View style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
              <TouchableOpacity onPress={() => deleteChild()}>
                <Image source={require("../../assets/images/delete.png")} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditFamilyModal(false)}>
                <Image source={require("../../assets/images/done.png")} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <FlatList
              style={styles.categoriesItems}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={members}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View style={styles.category}>
                    <Text style={{ fontSize: 14 }}>{item.member}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <View>
            <Text style={{ fontSize: styles.fontSizeText, fontWeight: 700 }}>
              Имя
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
