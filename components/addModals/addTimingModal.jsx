import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { CheckBox } from "@rneui/themed";
import { styles } from "../../styles/StylesSheet";

export default function AddTimingModal({ addTimingModal, setAddTimingModal, days, setDays }) {
  let [mondayCheck, setMondayCheck] = useState();
  let [tuesdayCheck, setTuesdayCheck] = useState();
  let [wednesdayCheck, setWednesdayCheck] = useState();
  let [thursdayCheck, setThursdayCheck] = useState();
  let [fridayCheck, setFridayCheck] = useState();
  let [saturdayCheck, setSatyrdayCheck] = useState();
  let [sundayCheck, setSundayCheck] = useState();

  let createShcedule = (values) => {
    if (mondayCheck) {
      let day = {
        day_of_week: 1,
        time_start: values.time_start_mon,
        time_finish: values.time_finish_mon,
      };
      let copy = Object.assign([], days);
      copy.push(day);
      setDays(copy);
    }

    if (thursdayCheck) {
      let day = {
        day_of_week: 2,
        time_start: values.time_start_tue,
        time_finish: values.time_finish_tue,
      };
      let copy = Object.assign([], days);
      copy.push(day);
      setDays(copy);
    }

    if (wednesdayCheck) {
      let day = {
        day_of_week: 2,
        time_start: values.time_start_wed,
        time_finish: values.time_finish_wed,
      };
      let copy = Object.assign([], days);
      copy.push(day);
      setDays(copy);
    }

    if (tuesdayCheck) {
      let day = {
        day_of_week: 2,
        time_start: values.time_start_tue,
        time_finish: values.time_finish_tue,
      };
      let copy = Object.assign([], days);
      copy.push(day);
      setDays(copy);
    }

    if (fridayCheck) {
      let day = {
        day_of_week: 2,
        time_start: values.time_start_fri,
        time_finish: values.time_finish_fri,
      };
      let copy = Object.assign([], days);
      copy.push(day);
      setDays(copy);
    }

    if (saturdayCheck) {
      let day = {
        day_of_week: 2,
        time_start: values.time_start_sat,
        time_finish: values.time_finish_sat,
      };
      let copy = Object.assign([], days);
      copy.push(day);
      setDays(copy);
    }

    if (sundayCheck) {
      let day = {
        day_of_week: 2,
        time_start: values.time_start_sun,
        time_finish: values.time_finish_sun,
      };
      let copy = Object.assign([], days);
      copy.push(day);
      setDays(copy);
    }

    setAddTimingModal(false)
  };

  return (
    <View>
      <Modal
        visible={addTimingModal}
        animationType="slide"
        transparent={true}
        style={{ zIndex: 10 }}
      >
        <View
          style={{
            top: "50%",
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
          }}
        >
          <Formik
            style={{ marginTop: styles.marginTopBlocks }}
            initialValues={{
              time_start_mon: "",
              time_finish_mon: "",
              time_start_tue: "",
              time_finish_tue: "",
              time_start_wed: "",
              time_finish_wed: "",
              time_start_thu: "",
              time_finish_thu: "",
              time_start_fri: "",
              time_finish_fri: "",
              time_start_sat: "",
              time_finish_sat: "",
              time_start_sun: "",
              time_finish_sun: "",
            }}
            onSubmit={(values) => createShcedule(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 22, fontWeight: 700 }}>
                    Расписание
                  </Text>

                  <TouchableOpacity onPress={handleSubmit}>
                    <Image source={require("../../assets/images/done.png")} />
                  </TouchableOpacity>
                </View>
                <View style={styles.checkDay}>
                  <CheckBox
                    checked={mondayCheck}
                    onPress={() => setMondayCheck(!mondayCheck)}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor="#313B97"
                  />
                  <Text>Понедельник</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      style={styles.timeInput}
                      onChangeText={handleChange("time_start_mon")}
                      onBlur={handleBlur("time_start_mon")}
                      value={values.time_start_mon}
                      placeholder="00:00"
                    />
                    <Text style={{ marginRight: styles.marginRightElements }}>
                      {" "}
                      —{" "}
                    </Text>
                    <TextInput
                      style={styles.timeInput}
                      onChangeText={handleChange("time_finish_mon")}
                      onBlur={handleBlur("time_finish_mon")}
                      value={values.time_finish_mon}
                      placeholder="00:00"
                    />
                  </View>
                </View>
                <View style={styles.checkDay}>
                  <CheckBox
                    checked={tuesdayCheck}
                    onPress={() => setTuesdayCheck(!tuesdayCheck)}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor="#313B97"
                  />
                  <Text>Вторник</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      style={styles.timeInput}
                      onChangeText={handleChange("time_start_tue")}
                      onBlur={handleBlur("time_start_tue")}
                      value={values.time_start_tue}
                      placeholder="00:00"
                    />
                    <Text style={{ marginRight: styles.marginRightElements }}>
                      {" "}
                      —{" "}
                    </Text>
                    <TextInput
                      style={styles.timeInput}
                      onChangeText={handleChange("time_finish_tue")}
                      onBlur={handleBlur("time_finish_tue")}
                      value={values.time_finish_tue}
                      placeholder="00:00"
                    />
                  </View>
                </View>
                <View style={styles.checkDay}>
                  <CheckBox
                    checked={wednesdayCheck}
                    onPress={() => setWednesdayCheck(!wednesdayCheck)}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor="#313B97"
                  />
                  <Text>Среда</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      style={styles.timeInput}
                      onChangeText={handleChange("time_start_wed")}
                      onBlur={handleBlur("time_start_wed")}
                      value={values.time_start_wed}
                      placeholder="00:00"
                    />
                    <Text style={{ marginRight: styles.marginRightElements }}>
                      {" "}
                      —{" "}
                    </Text>
                    <TextInput
                      style={styles.timeInput}
                      onChangeText={handleChange("time_finish_wed")}
                      onBlur={handleBlur("time_finish_wed")}
                      value={values.time_finish_wed}
                      placeholder="00:00"
                    />
                  </View>
                </View>
                <View style={styles.checkDay}>
                  <CheckBox
                    checked={thursdayCheck}
                    onPress={() => setThursdayCheck(!thursdayCheck)}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor="#313B97"
                  />
                  <Text>Четверг</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      style={styles.timeInput}
                      onChangeText={handleChange("time_start_thu")}
                      onBlur={handleBlur("time_start_thu")}
                      value={values.time_start_thu}
                      placeholder="00:00"
                    />
                    <Text style={{ marginRight: styles.marginRightElements }}>
                      {" "}
                      —{" "}
                    </Text>
                    <TextInput
                      style={styles.timeInput}
                      onChangeText={handleChange("time_finish_thu")}
                      onBlur={handleBlur("time_finish_thu")}
                      value={values.time_finish_thu}
                      placeholder="00:00"
                    />
                  </View>
                </View>
                <View style={styles.checkDay}>
                  <CheckBox
                    checked={fridayCheck}
                    onPress={() => setFridayCheck(!fridayCheck)}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor="#313B97"
                  />
                  <Text>Пятника</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      style={styles.timeInput}
                      onChangeText={handleChange("time_start_fri")}
                      onBlur={handleBlur("time_start_fri")}
                      value={values.time_start_fri}
                      placeholder="00:00"
                    />
                    <Text style={{ marginRight: styles.marginRightElements }}>
                      {" "}
                      —{" "}
                    </Text>
                    <TextInput
                      style={styles.timeInput}
                      onChangeText={handleChange("time_finish_fri")}
                      onBlur={handleBlur("time_finish_fri")}
                      value={values.time_finish_fri}
                      placeholder="00:00"
                    />
                  </View>
                </View>
                <View style={styles.checkDay}>
                  <CheckBox
                    checked={saturdayCheck}
                    onPress={() => setSatyrdayCheck(!saturdayCheck)}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor="#313B97"
                  />
                  <Text>Суббота</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      style={styles.timeInput}
                      onChangeText={handleChange("time_start_sat")}
                      onBlur={handleBlur("time_start_sat")}
                      value={values.time_start_sat}
                      placeholder="00:00"
                    />
                    <Text style={{ marginRight: styles.marginRightElements }}>
                      {" "}
                      —{" "}
                    </Text>
                    <TextInput
                      style={styles.timeInput}
                      onChangeText={handleChange("time_finish_sat")}
                      onBlur={handleBlur("time_finish_sat")}
                      value={values.time_finish_sat}
                      placeholder="00:00"
                    />
                  </View>
                </View>
                <View style={styles.checkDay}>
                  <CheckBox
                    checked={sundayCheck}
                    onPress={() => setSundayCheck(!sundayCheck)}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor="#313B97"
                  />
                  <Text>Воскресенье</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      style={styles.timeInput}
                      onChangeText={handleChange("time_start_sun")}
                      onBlur={handleBlur("time_start_sun")}
                      value={values.time_start_sun}
                      placeholder="00:00"
                    />
                    <Text style={{ marginRight: styles.marginRightElements }}>
                      {" "}
                      —{" "}
                    </Text>
                    <TextInput
                      style={styles.timeInput}
                      onChangeText={handleChange("time_finish_sun")}
                      onBlur={handleBlur("time_finish_sun")}
                      value={values.time_finish_sun}
                      placeholder="00:00"
                    />
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  );
}
