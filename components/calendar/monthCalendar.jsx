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

export default function MonthViewCalendar({ markedDates, setEvents, token, fetchFilterEvents, onChangeMonth}) {
    useEffect(() => {
        axios
        .get(`${baseUrl}/events/?date=${new Date().toISOString().slice(0, 10)}`, {
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
        <Calendar
            style={{ borderRadius: 20, marginTop: 32, marginBottom: 32 }}
            markingType={"multi-dot"}
            firstDay={1}
            markedDates={markedDates}
            onDayPress={(day) => {
              fetchFilterEvents("", day.dateString);

            }}
            onMonthChange={(date) => onChangeMonth(date.month, date.year) }
          />
    </View>
  )
}
