import {
  Calendar,
  WeekCalendar,
  CalendarProvider,
  LocaleConfig,
} from "react-native-calendars";
import { View } from "react-native";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../constants/constants";

export default function WeekViewCalendar({ markedDates, setEvents, token }) {

    useEffect(() => {
        axios
        .get(`${baseUrl}/events/?week=${new Date().toISOString().slice(0, 10)}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setEvents(response.data);
        })
    }, [])
  return (
    <View>
      <CalendarProvider
        style={{ marginTop: 20 }}
        date={new Date().toISOString().slice(0, 10)}
      >
        <WeekCalendar
          style={{ borderRadius: 20, marginBottom: 32 }}
          firstDay={1}
          hideDayNames={false}
          markingType={"multi-dot"}
          markedDates={markedDates}
        />
      </CalendarProvider>
    </View>
  );
}
