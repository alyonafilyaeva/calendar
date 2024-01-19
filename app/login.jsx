import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/StylesSheet";
import { useRouter } from "expo-router";
import { baseUrl } from "../constants/constants";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../constants/context";

export default function Login() {
  const router = useRouter();
  let [authToken, setAuthToken] = useState();
  let [authRefresh, setAuthRefresh] = useState();
  async function saveToken(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  let loginUser = async (values) => {
    let response = await fetch(`${baseUrl}/auth/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthRefresh(data.refresh);
      saveToken("token", data.access);
      saveToken("refresh", data.refresh);
      console.log("токен записан");
      router.push("/main");
    }
    setTimeout(updateToken, 1000 * 60 * 50)
  };

  let updateToken = async () => {
    saveToken('token', '')
    let response = await fetch(`${baseUrl}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authRefresh,
      }),
    });
    let data = await response.json()
    saveToken('token', data.access)
    saveToken('refresh', data.refresh)
    console.log('timer')
  };

  

  return (
    <View>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => loginUser(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <View>
              <Text
                style={{
                  fontSize: styles.fontSizeText,
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                Почта
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("email")}
                value={values.email}
                placeholder="email@email.ru"
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: styles.fontSizeText,
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                Пароль
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("password")}
                value={values.password}
                placeholder="Пароль"
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity style={styles.buttonGrey} onPress={handleSubmit}>
              <Text style={{ fontWeight: 700, color: "#fff" }}>
                Войти в аккаунт
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
