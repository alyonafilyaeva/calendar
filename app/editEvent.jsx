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
import * as SecureStore from "expo-secure-store";
import { useLocalSearchParams } from "expo-router";

export default function EditEvent() {
  const router = useRouter();
  let { id } = useLocalSearchParams();
  const [addFamilyModal, setAddFamilyModal] = useState(false);
  const [addElementsModal, setAddElementsModal] = useState(false);
  const [comment, setComment] = useState(false);
  const [selectedValue, setSelectedValue] = useState("one");
  const [children, setChildren] = useState([]);
  const [childId, setChildId] = useState(0);
  const [locationId, setLocationId] = useState(0);
  const [locations, setLocations] = useState([]);
  const [mainName, setMainName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTimeStart, setEventTimeStart] = useState("");
  const [eventTimeFinish, setEventTimeFinish] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [days, setDays] = useState([]);
  const [token, setToken] = useState("");
  const [event, setEvent] = useState();
  const [isEnabledBefore, setIsEnabledBefore] = useState(false);
  const toggleSwitchBefore = () =>
    setIsEnabledBefore((previousState) => !previousState);
  const [isEnabledAfter, setIsEnabledAfter] = useState(false);
  const toggleSwitchAfter = () =>
    setIsEnabledAfter((previousState) => !previousState);
  console.log("days are", days);
  console.log("event is", event);

  let formatDate = (date) => {
    let [day, month, year] = date?.split(".");
    return `${year}-${month}-${day}`;
  };

  let onformatDate = (date) => {
    let [year, month, day] = date?.split("-");
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    (async () => {
      let res = await SecureStore.getItemAsync("token");
      setToken(res);
    })();
  }, []);

  let dataLocations = locations.map((item) => ({
    key: item.id,
    value: item.address,
  }));

  const fetchChildren = () => {
    axios
      .get(`${baseUrl}/events/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEvent(response.data);
        setChildId(response.data.child.id);
        setLocationId(response.data.location.id);
        setMainName(response.data.main_name);
        setEventDate(onformatDate(response.data.event_date));
        setEventTimeStart(response.data.event_time_start);
        setEventTimeFinish(response.data.event_time_finish);
        setEventDescription(response.data.event_description);
      });

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
      });
    console.log("все получено");
  };
  useEffect(() => {
    fetchChildren();
  }, [token]);

  const editEvent = () => {
    axios({
      method: "put",
      url: `${baseUrl}/events/${event.id}/`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        'main_name': mainName,
        'child': childId,
        'location': locationId,
        'event_date': formatDate(eventDate),
        'event_time_start': eventTimeStart,
        'event_time_finish': eventTimeFinish,
        'event_description': eventDescription
      }
  }).then(response => {
    if (response.status === 200) {
      router.push("/main");
    }
  })
    /* axios
      .put(
        `${baseUrl}/events/${event.id}/`,
        {data: 
          {main_name: mainName,
          child: childId,
          location: locationId,
          event_date: formatDate(eventDate),
          event_time_start: eventTimeStart,
          event_time_finish: eventTimeFinish,
          event_description: eventDescription,}
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log('response put',response);
      });
 */
    
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topPanel}>
        <TouchableOpacity onPress={() => router.push("/main")}>
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
          Редактировать событие
        </Text>
        <TouchableOpacity /* onPress={() => router.push("home")} */>
          <Image
            /* style={{ height: 30, width: 30 }} */
            source={require("../assets/images/done.png")}
          />
        </TouchableOpacity>
      </View>

      <Formik
        style={{ marginTop: styles.marginTopBlocks }}
        initialValues={{
          main_name: mainName,
          child: childId,
          location: locationId,
          event_date: eventDate,
          event_time_start: eventTimeStart,
          event_time_finish: eventTimeFinish,
          event_description: eventDescription,
        }}
        onSubmit={() => editEvent()}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <View>
              <Text style={{ fontSize: styles.fontSizeText, fontWeight: 700 }}>
                Название события
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={setMainName}
                value={mainName}
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

              {selectedValue === "one" && (
                <View style={styles.oneEvent}>
                  <TextInput
                    style={styles.dateInput}
                    onChangeText={setEventDate}
                    value={eventDate}
                  />
                  <TextInput
                    style={styles.timeInput}
                    onChangeText={setEventTimeStart}
                    value={eventTimeStart.slice(0, 5)}
                  />
                  <Text style={{ marginRight: 8 }}> — </Text>
                  <TextInput
                    style={styles.timeInput}
                    onChangeText={setEventTimeFinish}
                    value={eventTimeFinish.slice(0, 5)}
                  />
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
              {isEnabledBefore && (
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
                </View>
              )}
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
            {isEnabledAfter && (
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
              </View>
            )}
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                Адрес
              </Text>
              <SelectList
                setSelected={(key) => setLocationId(key)}
                data={dataLocations}
                placeholder="Адрес"
                searchPlaceholder="Найти адрес"
                save="key"
                boxStyles={{ borderRadius: 20, borderColor: "#ADB9E3" }}
                dropdownItemStyles={{
                  borderRadius: 20,
                  borderColor: "#ADB9E3",
                }}
              />
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
                  onChangeText={setEventDescription}
                  value={eventDescription}
                  placeholder={eventDescription}
                />
              </View>
            )}

            <TouchableOpacity
              style={[styles.buttonWhite, { marginTop: 8 }]}
              onPress={() => setAddElementsModal(true)}
            >
              <Text style={{ fontWeight: 700 }}>Добавить элемент</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonGrey} onPress={handleSubmit}>
              <Text style={{ fontWeight: 700 }}>Изменить событие</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <AddFamilyModal
        addFamilyModal={addFamilyModal}
        setAddFamilyModal={setAddFamilyModal}
      />
      <AddElementsModal
        addElementsModal={addElementsModal}
        setAddElementsModal={setAddElementsModal}
        setComment={setComment}
      />
    </ScrollView>
  );
}
