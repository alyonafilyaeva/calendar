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
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Main from "./main";
import { styles } from "../styles/StylesSheet";
import Login from "./login";
import Logup from "./logup";
import * as SecureStore from "expo-secure-store";
import AuthContext, { AuthProvider } from "../constants/context";

export default function index() {
  const [active, setActive] = useState("login");
  let [token, setToken] = useState('k');
  
  async function getToken() {
    let res = await SecureStore.getItemAsync("token");
    setToken(res);
  }
  useEffect(() => {
    getToken();
    console.log("token auth", token);
  });
  return (
    <View>
        {token ? (
          <Main />
        ) : (
          <View style={styles.container}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                padding: 10,
                marginBottom: 50,
              }}
            >
              <Pressable onPress={() => setActive("login")}>
                <Text
                  style={[
                    styles.passiveAuth,
                    active == "login" && styles.activeAuth,
                  ]}
                >
                  Вход
                </Text>
              </Pressable>
              <Pressable onPress={() => setActive("logup")}>
                <Text
                  style={[
                    styles.passiveAuth,
                    active == "logup" && styles.activeAuth,
                  ]}
                >
                  Регистрация
                </Text>
              </Pressable>
            </View>
            {active == "login" ? <Login /> : <Logup />}
          </View>
        )}

    </View>
  );
}
