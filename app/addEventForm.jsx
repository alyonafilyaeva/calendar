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
  Form,
} from "react-native";
import { CheckBox } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useState } from "react";
import { categories, family, times } from "../constants/constants";
import { RadioButton } from "react-native-paper";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { styles } from "../styles/StylesSheet";
import { useRouter } from "expo-router";
import AddFamilyModal from "../components/addModals/addFamilyModal";
import AddTimingModal from "../components/addModals/addTimingModal";
import AddElementsModal from "../components/addModals/addElementsModal";

export default function AddEvent() {
  const router = useRouter();

  let [categoryID, setCategory] = useState("0");
  let [addFamilyModal, setAddFamilyModal] = useState(false);
  let [addTimingModal, setAddTimingModal] = useState(false);
  let [addElementsModal, setAddElementsModal] = useState(false);
  let [comment, setComment] = useState(false);
  let [selectedValue, setSelectedValue] = useState("one");

  let [child, setChild] = useState("");
  let [location, setLocation] = useState("");
  let [owner, setOwner] = useState();
  let [mainName, setMainName] = useState("");
  let [eventDate, setEventDate] = useState();
  let [eventTimeStart, setEventTimeStart] = useState();
  let [eventTimeFinish, setEventTimeFinish] = useState();
  let [eventDescription, setEventDescription] = useState();

  let onInputChange = (e) => {
    switch (e.target.name) {
      case mainName:
        setMainName(e.target.value);
        break;
      case child:
        setChild(e.target.value);
        break;
      case eventDate:
        setEventDate(e.target.value);
        break;
      case eventTimeStart:
        setEventTimeStart(e.target.value);
        break;
      case eventTimeFinish:
        setEventTimeFinish(e.target.value);
        break;
      case eventDescription:
        setEventDescription(e.target.value);
        break;
      default:
        break;
    }
  };

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

      <Form style={{ marginTop: styles.marginTopBlocks }}>
          <View>
            <View>
              <Text style={{ fontSize: styles.fontSizeText, fontWeight: 700 }}>
                Название события
              </Text>
              <TextInput
                style={styles.input}
                onChange={onInputChange}
                name='mainName'
                value={mainName}
                placeholder="Название события"
              />
            </View>

            <View>
              <Text style={{ fontSize: 14, fontWeight: 700 }}>Категория</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <FlatList
                  horizontal={true}
                  style={styles.categoriesItems}
                  data={categories}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.category}>
                      <Text
                        onPress={() => setCategory("1")}
                        value={categoryID}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity style={styles.plus}>
                  <Image source={require("../assets/images/plus.png")} />
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
                    data={family}
                    renderItem={({ item }) => (
                      <TouchableOpacity>
                        <View style={styles.familyItem}>
                          <Image
                            source={require("../assets/images/avatar.png")}
                          />
                          <Text style={{ fontSize: styles.fontSizeText }}>
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              fontSize: styles.fontSizeText,
                              color: styles.backgroundColorMain,
                            }}
                          >
                            {item.type}
                          </Text>
                        </View>
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
                      <Text style={{ fontSize: styles.fontSizeText }}>
                        Добавить
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
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
                    status={
                      selectedValue === "repeat" ? "checked" : "unchecked"
                    }
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
                      onChange={onInputChange}
                      name='eventDate'
                      value={eventDate}
                      placeholder="ДД/ММ/ГГ"
                    />
                    <TextInput
                      style={styles.timeInput}
                      onChange={onInputChange}
                      name='eventTimeStart'
                      value={eventTimeStart}
                      placeholder="00:00"
                    />
                    <Text style={{ marginRight: styles.marginRightElements }}>
                      {" "}
                      —{" "}
                    </Text>
                    <TextInput
                      style={styles.timeInput}
                      onChange={onInputChange}
                      name='eventTimeFinish'
                      value={eventTimeFinish}
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
                      <Text>Нет</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.repeat}>
                      <Text>Повторяется</Text>
                      <Text>Нет</Text>
                    </TouchableOpacity>
                  </View>
                )}
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

            <View style={{ marginTop: 32 }}>
              <Text style={{ fontSize: 14, fontWeight: 700 }}>Адрес</Text>
              <TextInput
                style={styles.input}
                onChange={onInputChange}
                name='location'
                value={location}
                placeholder="Адрес"
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
                  onChange={onInputChange}
                  name='eventDescription'
                  value={eventDescription}
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
            <TouchableOpacity style={styles.buttonGrey}>
              <Text style={{ fontWeight: 700 }}>Добавить событие</Text>
            </TouchableOpacity>
          </View>
      </Form>
      <AddFamilyModal
        addFamilyModal={addFamilyModal}
        setAddFamilyModal={setAddFamilyModal}
      />
      <AddTimingModal
        addTimingModal={addTimingModal}
        setAddTimingModal={setAddTimingModal}
      />
      <AddElementsModal
        addElementsModal={addElementsModal}
        setAddElementsModal={setAddElementsModal}
        setComment={setComment}
      />
    </ScrollView>
  );
}
