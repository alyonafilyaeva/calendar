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
import { token, baseUrl } from "../../constants/constants";
import { styles } from "../../styles/StylesSheet";
import { Formik } from "formik";
import axios from "axios";

export default function AddAddressModal({
  addAddressModal,
  setAddAddressModal,
}) {
  let [address, setAddress] = useState();
  let [latitude, setLatitude] = useState(0)
  let [longitude, setLongitude] = useState(0)
  const addLocation = () => {
    axios.post(
      `${baseUrl}/locations/`,
      {
        address,
        latitude,
        longitude
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setAddAddressModal(false);
    setAddress("");
    document.location.reload();
  };
  return (
    <View>
      <Modal
        visible={addAddressModal}
        animationType="slide"
        transparent={true}
        style={{ zIndex: 10 }}
      >
        <View
          style={{
            top: "80%",
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
            <Text style={{ fontSize: 22, fontWeight: 700 }}>
              Добавить адрес
            </Text>
            <TouchableOpacity onPress={() => addLocation()}>
              <Image source={require("../../assets/images/done.png")} />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ fontSize: styles.fontSizeText, fontWeight: 700 }}>
              Адрес
            </Text>
            <TextInput
              style={styles.input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
