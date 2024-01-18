import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  family,
  addresses,
  categories,
  colors,
  baseUrl,
  token,
  initialProfile,
} from "../constants/constants";
import { styles } from "../styles/StylesSheet";
import Categories from "../components/categories";
import AddCategoryModal from "../components/addModals/addCategoryModal";
import AddAddressModal from "../components/addModals/addAddressModal";
import AddFamilyModal from "../components/addModals/addFamilyModal";
import EditCategoryModal from "../components/editModals/editCategoryModal";
import EditAddressModal from "../components/editModals/editAddressModal";
import EditFamilyModal from "../components/editModals/editFamilyModal";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function Profile() {
  const router = useRouter();

  let [addCategoryModal, setAddCategoryModal] = useState(false);
  let [addAddressModal, setAddAddressModal] = useState(false);
  let [addFamilyModal, setAddFamilyModal] = useState(false);
  let [editCategoryModal, setEditCategoryModal] = useState(false);
  let [editAddressModal, setEditAddressModal] = useState(false);
  let [editFamilyModal, setEditFamilyModal] = useState(false);
  let [profile, setProfile] = useState(initialProfile);
  let [token, setToken] = useState("");

  const getToken = async() => {
    let res = await SecureStore.getItemAsync("token");
    setToken(res);
  }
  const fetchData = async () => {
   await axios
      .get(`${baseUrl}/users/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProfile(response.data);
      });
      console.log('data')
  };
  useEffect(() => {
    console.log('token')
    getToken();
    fetchData()
  }, [token, profile]);

  /* useEffect(() => {
    console.log('profile')
    fetchData();
  }, [profile]); */

  let logoutUser = async () => {
    await SecureStore.setItemAsync("token", '');
    console.log("вышли");
    router.push("/");
  };

  let deleteLocation = (locationId) => {
    axios.delete(`${baseUrl}/locations/${locationId}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.topPanel}>
        <TouchableOpacity onPress={() => router.push("/main")}>
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
        <TouchableOpacity onPress={() => logoutUser()}>
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
          <Image source={require("../assets/images/edit.png")} />
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
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <FlatList
            style={styles.familyItems}
            horizontal={true}
            data={profile.children}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setEditFamilyModal(true)}>
                <View style={styles.familyItem}>
                  <View style={styles.avatar}>
                    {item.name == "Вася" ? (
                      <Image source={require("../assets/images/Boy.png")} />
                    ) : (
                      <Image source={require("../assets/images/Girl.png")} />
                    )}
                    <Text
                      style={{ fontSize: styles.fontSizeText, marginLeft: 5 }}
                    >
                      {item.name}
                    </Text>
                  </View>
                </View>
                <EditFamilyModal
                  editFamilyModal={editFamilyModal}
                  setEditFamilyModal={setEditFamilyModal}
                  child={item}
                  token={token}
                />
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setAddFamilyModal(true)}
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
        </ScrollView>
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
                  <TouchableOpacity onPress={(item) => deleteLocation(item.id)}>
                    <Image
                      style={{ marginRight: 10 }}
                      source={require("../assets/images/delete.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setEditAddressModal(true)}>
                    <Image source={require("../assets/images/edit.png")} />
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
          Расписания
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
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
        token={token}
      />
      <AddFamilyModal
        addFamilyModal={addFamilyModal}
        setAddFamilyModal={setAddFamilyModal}
        token={token}
      />
      <EditCategoryModal
        editCategoryModal={editCategoryModal}
        setEditCategoryModal={setEditCategoryModal}
        token={token}
      />
      <EditAddressModal
        editAddressModal={editAddressModal}
        setEditAddressModal={setEditAddressModal}
      />
    </View>
  );
}
