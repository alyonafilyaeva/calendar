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
    TextInput
  } from "react-native";
  import React from "react";
  import { useState, useEffect } from "react";
  import { Formik, Field, Form } from "formik";
  import { styles } from "../styles/StylesSheet";
  import { useRouter } from "expo-router";
  
  export default function Logup() {
      const router = useRouter();
  
      let logup = () => {
          router.push("/main")
      }
    return (
      <View>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          onSubmit={(values) => logup(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <View>
                <Text style={{
                      fontSize: styles.fontSizeText,
                      fontWeight: 700,
                      marginBottom: 10,
                    }}>Имя</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("name")}
                  value={values.password}
                  placeholder="Имя"
                />
              </View>
              <View>
                <Text style={{
                      fontSize: styles.fontSizeText,
                      fontWeight: 700,
                      marginBottom: 10,
                    }}>Почта</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("email")}
                  value={values.email}
                  placeholder="email@email.ru"
                />
              </View>
              <View>
                <Text style={{
                      fontSize: styles.fontSizeText,
                      fontWeight: 700,
                      marginBottom: 10,
                    }}>Пароль</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("password")}
                  value={values.password}
                  placeholder="Пароль"
                />
              </View>
              
              <TouchableOpacity style={styles.buttonGrey} onPress={handleSubmit}>
                <Text style={{ fontWeight: 700, color: '#fff' }}>Создать аккаунт</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    );
  }
  