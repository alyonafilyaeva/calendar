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
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { members, colors, baseUrl, token } from "../../constants/constants";
import { styles } from "../../styles/StylesSheet";
import Categories from "../categories";
import axios from "axios";

export default function AddFamilyModal({ addFamilyModal, setAddFamilyModal }) {
  const [name, setName] = useState();
  const addChild = () => {
    axios.post(
      `${baseUrl}/users/children/`,
      {
        name,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setAddFamilyModal(false)
    setName('')
    document.location.reload()
  };

  return (
    <View>
      <Modal
        visible={addFamilyModal}
        animationType="slide"
        transparent={true}
        style={{ zIndex: 10 }}
      >
        <View
          style={{
            top: "40%",
            /* height: "40%", */
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
            <Text style={{ fontSize: 22, fontWeight: 700 }}>
              Добавить члена семьи
            </Text>

            <TouchableOpacity onPress={() => addChild()}>
              <Image source={require("../../assets/images/done.png")} />
            </TouchableOpacity>
            
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </View>
          <View>
            <Text style={{ fontSize: styles.fontSizeText, fontWeight: 700 }}>
              Аватар
            </Text>
          </View>
          <FlatList
            style={styles.familyItems}
            /* horizontal={true} */
            numColumns={Math.ceil(colors.length / 2)}
            data={colors}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <View
                  style={{
                    borderTopLeftRadius: 100,
                    borderTopRightRadius: 100,
                    borderBottomLeftRadius: 100,
                    borderBottomRightRadius: 100,
                    backgroundColor: item.color,
                    height: 56,
                    width: 56,
                    marginTop: 8,
                    marginRight: 8,
                  }}
                ></View>
              </TouchableOpacity>
            )}
          />
          <View>
            <Text style={{ fontSize: styles.fontSizeText, fontWeight: 700 }}>
              Цвет
            </Text>
          </View>
          <FlatList
            style={styles.familyItems}
            /* horizontal={true} */
            numColumns={Math.ceil(colors.length / 2)}
            data={colors}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <View
                  style={{
                    borderTopLeftRadius: 100,
                    borderTopRightRadius: 100,
                    borderBottomLeftRadius: 100,
                    borderBottomRightRadius: 100,
                    backgroundColor: item.color,
                    height: 56,
                    width: 56,
                    marginTop: 8,
                    marginRight: 8,
                  }}
                ></View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}
