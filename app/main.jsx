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
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { styles } from "../styles/StylesSheet";
import {
  Calendar,
  CalendarProvider,
  LocaleConfig,
} from "react-native-calendars";
import { baseUrl, getMonth, Swimming, Drowing } from "../constants/constants";
import Day from "../components/calendar/day";
import axios from "axios";
import SwitchCalendarModal from "../components/addModals/switchCalendarModal";
import * as SecureStore from "expo-secure-store";
import WeekViewCalendar from "../components/calendar/weekCalendar";
import MonthViewCalendar from "../components/calendar/monthCalendar";

export default function Main() {
  const router = useRouter();
  const [clickCategory, setClickCategory] = useState("");
  const [clickSchedule, setClickSchedule] = useState("");
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [switchCalendarModal, setSwitchCalendarModal] = useState(false);
  const [switchCalendar, setSwitchCalendar] = useState("month");
  const [filterSchedule, setFilterSchedule] = useState([]);
  const [token, setToken] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  let markedDates = {};
  allEvents.forEach((item) => {
    markedDates[item.event_date] = {
      dots: [item.main_name == "Плавание" ? Swimming : Drowing],
    };
  });

  LocaleConfig.locales["fr"] = {
    monthNames: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентрябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    monthNamesShort: [
      "Janv.",
      "Févr.",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juil.",
      "Août",
      "Sept.",
      "Oct.",
      "Nov.",
      "Déc.",
    ],
    dayNames: [
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
      "Воскресенье",
    ],
    dayNamesShort: ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
  };
  LocaleConfig.defaultLocale = "fr";

  useEffect(() => {
    (async () => {
      let res = await SecureStore.getItemAsync("token");
      setToken(res);
    })();
  }, []);

  useEffect(() => {
    console.log("token is", token);

    console.log("schedule is", filterSchedule);
    fetchData(token);

    /*  if (switchCalendar == "week") {
      fetchFilterEvents("", "", new Date().toISOString().slice(0, 10));
      console.log("week");
    } */
  }, [token]);

  useEffect(() => {
    console.log("1 schedule");
    getSchedule();
    console.log("2 schedule");
  }, [events]);

  const getSchedule = () => {
    let schedule = events
      .filter(function (item) {
        return item.schedule != null;
      })
      .map((item) => ({ id: item.schedule.id, name: item.main_name }));

    setFilterSchedule(
      Array.from(new Set(schedule.map(JSON.stringify))).map(JSON.parse)
    );
    console.log("schedule");
  };

  const fetchData = (token) => {
    token &&
      axios
        .get(
          `${baseUrl}/events/?date=${new Date().toISOString().slice(0, 10)}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setEvents(response.data);
        });

    token &&
      axios
        .get(`${baseUrl}/events/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAllEvents(response.data);
        });

    token &&
      axios
        .get(`${baseUrl}/users/children/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setCategories(response.data);
          setCategories((categories) => [
            ...categories,
            { id: "", name: "Все" },
          ]);
        });

    setMonth(getMonth(new Date().getMonth() + 1));
    setYear(new Date().getFullYear());
  };

  const fetchFilterEvents = (
    childId = "",
    date = "",
    week = "",
    scheduleId = ""
  ) => {
    console.log(
      "filter",
      `${baseUrl}/events/?child=${childId}&date=${date}&week=${week}&schedule=${scheduleId}`
    );
    axios
      .get(
        `${baseUrl}/events/?child=${childId}&date=${date}&week=${week}&schedule=${scheduleId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setEvents(response.data);
        console.log("события отфильтрованы");
      });
    setClickCategory(childId);
    setClickSchedule(scheduleId);
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

  const onChangeMonth = (month, year) => {
    setMonth(getMonth(month));
    setYear(year);
  };

  return (
    <View>
      <ScrollView style={styles.container}>
        <StatusBar theme="auto" />
        <View style={styles.topPanel}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ fontSize: hp(4), fontWeight: 700, marginRight: 5 }}>
              {month}
            </Text>
            <Text style={{ fontSize: hp(4), fontWeight: 700 }}>{year}</Text>
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity
                style={styles.switch}
                onPress={() => setSwitchCalendarModal(true)}
              >
                <Text>{switchCalendar == "month" ? "Месяц" : "Неделя"}</Text>
              </TouchableOpacity>
            </View>
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
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            style={styles.categoriesItems}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => fetchFilterEvents(item.id)}
                key={item}
              >
                <View
                  style={[
                    styles.category,
                    clickCategory === item.id && styles.click,
                  ]}
                >
                  <Text style={{ fontSize: 14 }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <FlatList
            style={styles.categoriesItems}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={filterSchedule}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => fetchFilterEvents("", "", "", item.id)}
                key={item}
              >
                <View
                  style={[
                    styles.category,
                    clickSchedule === item.id && styles.click,
                  ]}
                >
                  <Text style={{ fontSize: 14 }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>

        {switchCalendar == "month" ? (
          <MonthViewCalendar
            markedDates={markedDates}
            setEvents={setEvents}
            token={token}
            fetchFilterEvents={fetchFilterEvents}
            onChangeMonth={onChangeMonth}
          />
        ) : (
          <WeekViewCalendar
            markedDates={markedDates}
            setEvents={setEvents}
            token={token}
          />
        )}

        <View>
          <FlatList
            data={dates}
            renderItem={({ item }) => (
              <View>
                <Day date={item} events={events} key={item.id} token={token} />
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
        token={token}
      />
    </View>
  );
}
