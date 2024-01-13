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
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { styles } from "../styles/StylesSheet";
import {
  Calendar,
  WeekCalendar,
  CalendarProvider,
} from "react-native-calendars";
import { token, baseUrl } from "../constants/constants";
import Day from "../components/calendar/day";
import axios from "axios";
import SwitchCalendarModal from "../components/addModals/switchCalendarModal";

const Petr = { key: "Petr", color: "#A12FAA", selectedDotColor: "blue" };
const Ann = { key: "Ann", color: "#FD9800", selectedDotColor: "blue" };

export default function Index() {
  const router = useRouter();
  const [clickCategory, setClickCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [switchCalendarModal, setSwitchCalendarModal] = useState(false);
  let [switchCalendar, setSwitchCalendar] = useState("month");
  let markedDates = {};

  events.forEach((item) => {
    markedDates[item.event_date] = {
      dots: [item.child.name == "Петя" ? Petr : Ann],
    };
  });

  const fetchData = () => {
    axios
      .get(`${baseUrl}/events/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEvents(response.data);
      });

    axios
      .get(`${baseUrl}/users/children/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data)
        setCategories((categories => [...categories, { id: "", name: "Все" }]))
      })
  };

  useEffect(fetchData, []);
  const fetchFilterEvents = (childId = "", date = "") => {
    axios
      .get(`${baseUrl}/events/?child=${childId}&date=${date}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEvents(response.data);
      });
      setClickCategory(childId)
  };

  const dates = events
    .map((item) => item.event_date)
    .filter(function (date) {
      let today = new Date().toISOString().slice(0, 10);
      return date >= today;
    })
    .reduce((result, item) => {
      return result.includes(item) ? result : [...result, item];
    }, []);

  return (
    <View>
      <ScrollView style={styles.container}>
        <StatusBar theme="auto" />
        <View style={styles.topPanel}>
          <Text style={{ fontSize: hp(4), fontWeight: 700 }}>Календарь</Text>
          <View>
            <TouchableOpacity
              style={styles.switch}
              onPress={() => setSwitchCalendarModal(true)}
            >
              <Text>{switchCalendar == "month" ? "Месяц" : "Неделя"}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              router.push({ pathname: `/profile`, params: { id: 7 } })
            }
          >
            <Image
              style={{ height: 30, width: 30 }}
              source={require("../assets/images/profile.png")}
            />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            style={styles.categoriesItems}
            horizontal={true}
            /* keyExtractor={(item, index) => item.key} */
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => fetchFilterEvents(item.id)} key={item}>
                <View style={[styles.category, clickCategory === item.id && styles.click]}>
                  <Text style={{ fontSize: 14 }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {switchCalendar == "month" ? (
          <Calendar
            style={{ borderRadius: 20, marginTop: 32, marginBottom: 32 }}
            markingType={"multi-dot"}
            firstDay={1}
            markedDates={markedDates}
            onDayPress={(day) => {
              fetchFilterEvents("", day.dateString);
            }}
          />
        ) : (
          <CalendarProvider style={{ marginTop: 20 }} date={new Date().toISOString().slice(0, 10)}>
            <WeekCalendar
              firstDay={1}
              hideDayNames={false}
              markingType={"multi-dot"}
              markedDates={markedDates}
            />
          </CalendarProvider>
        )}

        <View>
          <FlatList
            data={dates}
            renderItem={({ item }) => (
              <View>
                <Day date={item} events={events} key={item.id}/>
              </View>
            )}
          />
        </View>
      </ScrollView>
      {
        <TouchableOpacity
          onPress={() => router.push("addEvent")}
          style={{ position: "absolute", left: wp(85), top: hp(90) }}
        >
          <Image
            style={[styles.plus, styles.click]}
            source={require("../assets/images/plus.png")}
          />
        </TouchableOpacity>
      }
      <SwitchCalendarModal
        switchCalendarModal={switchCalendarModal}
        setSwitchCalendarModal={setSwitchCalendarModal}
        switchCalendar={switchCalendar}
        setSwitchCalendar={setSwitchCalendar}
        events={events}
        setEvents={setEvents}
      />
    </View>
  );
}
