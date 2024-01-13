import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  Radio,
  ScrollView,
  Switch,
} from "react-native";
import { CheckBox } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Formik, Field, Form } from "formik";
import React, { useEffect, useState } from "react";
import {
  categories,
  family,
  times,
  baseUrl,
  token,
} from "../constants/constants";
import { RadioButton } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import { styles } from "../styles/StylesSheet";
import { useRouter } from "expo-router";
import AddFamilyModal from "../components/addModals/addFamilyModal";
import AddTimingModal from "../components/addModals/addTimingModal";
import AddElementsModal from "../components/addModals/addElementsModal";
import axios from "axios";
import AddPeriodModal from "../components/addModals/addPeriodModal";

export default function AddEvent() {
  const router = useRouter();
  let [categoryID, setCategory] = useState("0");
  let [addFamilyModal, setAddFamilyModal] = useState(false);
  let [addTimingModal, setAddTimingModal] = useState(false);
  let [addElementsModal, setAddElementsModal] = useState(false);
  let [addPeriodModal, setAddPeriodModal] = useState(false);
  let [comment, setComment] = useState(false);
  let [selectedValue, setSelectedValue] = useState("one");
  let [children, setChildren] = useState([]);
  let [childId, setChildId] = useState(0);
  let [locationId, setLocationId] = useState();
  let [locations, setLocations] = useState([]);
  let [days, setDays] = useState([]);
  let [startingDay, setStartingDay] = useState();
  let [endingDay, setEndingDay] = useState();
  const [isEnabledBefore, setIsEnabledBefore] = useState(false);
  const toggleSwitchBefore = () =>
    setIsEnabledBefore((previousState) => !previousState);
    const [isEnabledAfter, setIsEnabledAfter] = useState(false);
  const toggleSwitchAfter = () =>
    setIsEnabledAfter((previousState) => !previousState);
  let location = React.createRef();

  let formatDate = (date) => {
    let [day, month, year] = date.split(".");
    return `${year}-${month}-${day}`;
  };

  const fetchChildren = () => {
    axios
      .get(`${baseUrl}/users/children`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setChildren(response.data);
      });

    axios
      .get(`${baseUrl}/locations`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLocations(response.data);
        console.log(locations);
      });
  };
  useEffect(fetchChildren, []);

  const createEvent = (values) => {
    selectedValue === "one"
      ? axios
          .post(
            `${baseUrl}/events/`,
            {
              main_name: values.main_name,
              child: childId,
              location: location.current.value,
              event_date: formatDate(values.event_date),
              event_time_start: values.event_time_start,
              event_time_finish: values.event_time_finish,
              event_description: values.event_description,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
          })
      : axios
          .post(
            `${baseUrl}/events/schedule/`,
            {
              main_name: values.main_name,
              child: childId,
              location: location.current.value,
              event_description: values.event_description,
              schedule: {
                days: days,
                date_start: startingDay,
                date_finish: endingDay,
              },
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log("Событие с расписанием", response);
          });
    router.push("/");
  };
  console.log(startingDay, endingDay);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topPanel}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Image
            /* style={{ height: 30, width: 30 }} */
            source={require("../assets/images/back.png")}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: styles.fontSizeTitle,
            fontWeight: 700,
            justifyContent: "flex-start",
          }}
        >
          Добавить событие
        </Text>
        <TouchableOpacity onPress={() => router.push("home")}>
          <Image
            /* style={{ height: 30, width: 30 }} */
            source={require("../assets/images/done.png")}
          />
        </TouchableOpacity>
      </View>

      <Formik
        style={{ marginTop: styles.marginTopBlocks }}
        initialValues={{
          main_name: "",
          child: childId,
          location: locationId,
          event_date: "",
          event_time_start: "",
          event_time_finish: "",
          event_description: "",
        }}
        onSubmit={(values) => createEvent(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <View>
              <Text style={{ fontSize: styles.fontSizeText, fontWeight: 700 }}>
                Название события
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("main_name")}
                onBlur={handleBlur("main_name")}
                value={values.main_name}
                placeholder="Название события"
              />
            </View>
            <View style={{ marginTop: styles.marginTopBlocks }}>
              <View style={styles.radioButton}>
                <RadioButton
                  value="option1"
                  status={selectedValue === "one" ? "checked" : "unchecked"}
                  onPress={() => setSelectedValue("one")}
                  color="#2688EB"
                />
                <Text
                  style={{ fontSize: styles.fontSizeText, fontWeight: 700 }}
                >
                  Разовое событие
                </Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="option1"
                  status={selectedValue === "repeat" ? "checked" : "unchecked"}
                  onPress={() => setSelectedValue("repeat")}
                  color="#2688EB"
                />
                <Text
                  style={{ fontSize: styles.fontSizeText, fontWeight: 700 }}
                >
                  Повторяющееся событие
                </Text>
              </View>

              {selectedValue === "one" && (
                <View style={styles.oneEvent}>
                  <TextInput
                    style={styles.dateInput}
                    onChangeText={handleChange("event_date")}
                    onBlur={handleBlur("event_date")}
                    value={values.event_date}
                    placeholder="ДД/ММ/ГГ"
                  />
                  <TextInput
                    style={styles.timeInput}
                    onChangeText={handleChange("event_time_start")}
                    onBlur={handleBlur("event_time_start")}
                    value={values.event_time_start}
                    placeholder="00:00"
                  />
                  <Text style={{ marginRight: styles.marginRightElements }}>
                    {" "}
                    —{" "}
                  </Text>
                  <TextInput
                    style={styles.timeInput}
                    onChangeText={handleChange("event_time_finish")}
                    onBlur={handleBlur("event_time_finish")}
                    value={values.event_time_finish}
                    placeholder="00:00"
                  />
                </View>
              )}

              {selectedValue === "repeat" && (
                <View style={styles.repeatEvent}>
                  <TouchableOpacity
                    style={styles.timing}
                    onPress={() => {
                      setAddTimingModal(true);
                    }}
                  >
                    <Text>Расписание</Text>
                    <Text>{days.length > 0 ? "Есть" : "Нет"}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.repeat}
                    onPress={() => setAddPeriodModal(true)}
                  >
                    <Text>Повторять</Text>
                    <Text>{endingDay ? "Да" : "Нет"}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View>
              <View style={styles.family}>
                <Text
                  style={{
                    fontSize: styles.fontSizeText,
                    fontWeight: 700,
                    marginBottom: 10,
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
                    data={children}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => setChildId(item.id)}>
                        <View style={styles.familyItem}>
                          <View
                            style={[
                              styles.avatar,
                              childId == item.id && styles.click,
                            ]}
                          >
                            {item.name == "Петя" ? (
                              <Image
                                source={require("../assets/images/Boy.png")}
                              />
                            ) : (
                              <Image
                                source={require("../assets/images/Girl.png")}
                              />
                            )}
                            <Text
                              style={{
                                fontSize: styles.fontSizeText,
                                paddingLeft: 10,
                              }}
                            >
                              {item.name}
                            </Text>
                          </View>
                        </View>
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
                </View>
              </View>
            </View>

            <View style={{ marginTop: 32 }}>
              <Text style={{ fontSize: 14, fontWeight: 700 }}>
                Напомнить до начала за
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: styles.marginTopInsideBlocks,
                }}
              >
                <FlatList
                  /* style={styles.familyItems} */
                  horizontal={true}
                  data={times}
                  renderItem={({ item }) => (
                    <TouchableOpacity>
                      <View style={styles.time}>
                        <Text style={{ fontSize: styles.fontSizeText }}>
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity style={styles.plus}>
                  <Image source={require("../assets/images/plus.png")} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <Switch
                  trackColor={{ false: "#EFEAEA", true: "#ADB9E3" }}
                  thumbColor={!isEnabledBefore ? "#F2F3F5" : "red"}
                  onValueChange={toggleSwitchBefore}
                  value={isEnabledBefore}
                />
                <Text style={{ marginLeft: 10 }}>
                  Напомнить другому члену семьи
                </Text>
              </View>
              {isEnabledBefore && <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <FlatList
                  style={styles.familyItems}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={family}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setChildId(item.id)}>
                      <View style={styles.familyItem}>
                        <View
                          style={[
                            styles.avatar,
                            childId == item.id && styles.click,
                          ]}
                        >
                          {item.name == "Петя" ? (
                            <Image
                              source={require("../assets/images/Boy.png")}
                            />
                          ) : (
                            <Image
                              source={require("../assets/images/Girl.png")}
                            />
                          )}
                          <Text
                            style={{
                              fontSize: styles.fontSizeText,
                              paddingLeft: 10,
                            }}
                          >
                            {item.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>}
            </View>

            <View>
              <Text style={{ fontSize: 14, fontWeight: 700 }}>
                Напомнить до окончания за
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: styles.marginTopInsideBlocks,
                }}
              >
                <FlatList
                  /* style={styles.familyItems} */
                  horizontal={true}
                  data={times}
                  renderItem={({ item }) => (
                    <TouchableOpacity>
                      <View style={styles.time}>
                        <Text style={{ fontSize: styles.fontSizeText }}>
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity style={styles.plus}>
                  <Image source={require("../assets/images/plus.png")} />
                </TouchableOpacity>
              </View>
            </View>
            <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <Switch
                  trackColor={{ false: "#EFEAEA", true: "#ADB9E3" }}
                  thumbColor={!isEnabledAfter ? "#F2F3F5" : "red"}
                  onValueChange={toggleSwitchAfter}
                  value={isEnabledAfter}
                />
                <Text style={{ marginLeft: 10 }}>
                  Напомнить другому члену семьи
                </Text>
              </View>
              {isEnabledAfter && <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <FlatList
                  style={styles.familyItems}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={family}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setChildId(item.id)}>
                      <View style={styles.familyItem}>
                        <View
                          style={[
                            styles.avatar,
                            childId == item.id && styles.click,
                          ]}
                        >
                          {item.name == "Петя" ? (
                            <Image
                              source={require("../assets/images/Boy.png")}
                            />
                          ) : (
                            <Image
                              source={require("../assets/images/Girl.png")}
                            />
                          )}
                          <Text
                            style={{
                              fontSize: styles.fontSizeText,
                              paddingLeft: 10,
                            }}
                          >
                            {item.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>}
            <View style={{ marginTop: 32 }}>
              <Text style={{ fontSize: 14, fontWeight: 700 }}>Адрес</Text>
              <select style={styles.input} name="locations" ref={location}>
                <option value="Адрес"></option>
                {locations.map((item) => (
                  <option value={item.id}>{item.address}</option>
                ))}
              </select>
            </View>

            {comment && (
              <View>
                <Text
                  style={{ fontSize: styles.fontSizeText, fontWeight: 700 }}
                >
                  Комментарий
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("event_description")}
                  onBlur={handleBlur("event_description")}
                  value={values.event_description}
                  placeholder="Текст"
                />
              </View>
            )}

            <TouchableOpacity
              style={styles.buttonWhite}
              onPress={() => setAddElementsModal(true)}
            >
              <Text style={{ fontWeight: 700 }}>Добавить элемент</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonGrey} onPress={handleSubmit}>
              <Text style={{ fontWeight: 700 }}>Добавить событие</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <AddFamilyModal
        addFamilyModal={addFamilyModal}
        setAddFamilyModal={setAddFamilyModal}
      />
      <AddTimingModal
        addTimingModal={addTimingModal}
        setAddTimingModal={setAddTimingModal}
        days={days}
        setDays={setDays}
      />
      <AddElementsModal
        addElementsModal={addElementsModal}
        setAddElementsModal={setAddElementsModal}
        setComment={setComment}
      />
      <AddPeriodModal
        addPeriodModal={addPeriodModal}
        setAddPeriodModal={setAddPeriodModal}
        startingDay={startingDay}
        setStartingDay={setStartingDay}
        endingDay={endingDay}
        setEndingDay={setEndingDay}
      />
    </ScrollView>
  );
}
