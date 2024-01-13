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
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { family, addresses, categories, colors, baseUrl, token, initialProfile} from "../constants/constants";
import { styles } from "../styles/StylesSheet";
import Categories from "../components/categories";
import AddCategoryModal from "../components/addModals/addCategoryModal";
import AddAddressModal from "../components/addModals/addAddressModal";
import AddFamilyModal from "../components/addModals/addFamilyModal";
import EditCategoryModal from "../components/editModals/editCategoryModal";
import EditAddressModal from "../components/editModals/editAddressModal";
import EditFamilyModal from "../components/editModals/editFamilyModal";
import axios from "axios";

export default function Profile() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  let [addCategoryModal, setAddCategoryModal] = useState(false);
  let [addAddressModal, setAddAddressModal] = useState(false);
  let [addFamilyModal, setAddFamilyModal] = useState(false);
  let [editCategoryModal, setEditCategoryModal] = useState(false);
  let [editAddressModal, setEditAddressModal] = useState(false);
  let [editFamilyModal, setEditFamilyModal] = useState(false);
  let [profile, setProfile] = useState(initialProfile);
  const fetchProfile = () => {
    axios
      .get(`${baseUrl}/users/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProfile(response.data);
        console.log(response.data)
      });
  };
  useEffect(fetchProfile, []);
  return (
    <View style={styles.container}>
      <View style={styles.topPanel}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Image
            /* style={{ height: 30, width: 30 }} */
            source={require("../assets/images/back.png")}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 700,
            justifyContent: "flex-start",
          }}
        >
          Профиль
        </Text>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Image
            /* style={{ height: 30, width: 30 }} */
            source={require("../assets/images/logout.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.about}>
        <Image
          style={{ height: 70, width: 70 }}
          source={require("../assets/images/avatar.png")}
        />
        <View>
          <Text
            style={{
              fontSize: styles.fontSizeText,
              fontWeight: 700,
            }}
          >
            {profile.username}
          </Text>
          <Text>{profile.email}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Image
            /* style={{ height: 30, width: 30 }} */
            source={require("../assets/images/edit.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.family}>
        <Text
          style={{
            fontSize: styles.fontSizeText,
            fontWeight: 700,
          }}
        >
          Члены семьи
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <FlatList
            style={styles.familyItems}
            horizontal={true}
            data={profile.children}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setEditFamilyModal(true)}>
                <View style={styles.familyItem}>
                  <Image source={require("../assets/images/avatar.png")} />
                  <Text style={{ fontSize: styles.fontSizeText }}>
                    {item.name}
                  </Text>
                </View>
                <EditFamilyModal
                  editFamilyModal={editFamilyModal}
                  setEditFamilyModal={setEditFamilyModal}
                  child={item}
                />
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={() => setAddFamilyModal(true)}>
            <View style={styles.familyItem}>
              <Image source={require("../assets/images/avatar.png")} />
              <Image
                style={{ position: "absolute", top: 15 }}
                source={require("../assets/images/plus.png")}
              />
              <Text style={{ fontSize: styles.fontSizeText }}>Добавить</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.addresses}>
        <Text
          style={{
            fontSize: styles.fontSizeText,
            fontWeight: 700,
          }}
        >
          Сохраненные адреса
        </Text>
        <FlatList
          style={styles.addressItems}
          data={profile.locations}
          renderItem={({ item }) => (
            <View>
              <View style={styles.addressItem}>
                <View>
                  {/* <Text
                    style={{ fontSize: styles.fontSizeText, fontWeight: 500 }}
                  >
                    Плавание
                  </Text> */}
                  <Text style={{ fontSize: styles.fontSizeText }}>
                    {item.address}
                  </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <TouchableOpacity>
                    <Image
                      style={{ marginRight: 10 }}
                      source={require("../assets/images/delete.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setEditAddressModal(true)}>
                    <Image
                      source={require("../assets/images/edit.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setAddAddressModal(true)}
        >
          <Image source={require("../assets/images/plus.png")} />
          <Text
            style={{
              fontSize: styles.fontSizeText,
            }}
          >
            Добавить
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categories}>
        <Text
          style={{
            fontSize: styles.fontSizeText,
            fontWeight: 700,
          }}
        >
          Категории
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Categories />
          <TouchableOpacity
            style={styles.plus}
            onPress={() => setAddCategoryModal(true)}
          >
            <Image source={require("../assets/images/plus.png")} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonWhite}>
          <Text style={{ fontWeight: 700 }}>Удалить аккаунт</Text>
        </TouchableOpacity>
      </View>

      <AddCategoryModal
        addCategoryModal={addCategoryModal}
        setAddCategoryModal={setAddCategoryModal}
      />
      <AddAddressModal
        addAddressModal={addAddressModal}
        setAddAddressModal={setAddAddressModal}
      />
      <AddFamilyModal
        addFamilyModal={addFamilyModal}
        setAddFamilyModal={setAddFamilyModal}
      />
      <EditCategoryModal
        editCategoryModal={editCategoryModal}
        setEditCategoryModal={setEditCategoryModal}
      />
      <EditAddressModal
        editAddressModal={editAddressModal}
        setEditAddressModal={setEditAddressModal}
      />
    </View>
  );
}
