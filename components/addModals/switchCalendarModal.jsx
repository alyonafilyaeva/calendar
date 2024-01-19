import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { backgroundColor, styles } from "../../styles/StylesSheet";
import { baseUrl, token } from "../../constants/constants";
import axios from "axios";

function SwitchCalendarModal({
  switchCalendarModal,
  setSwitchCalendarModal,
  switchCalendar,
  setSwitchCalendar,
  events,
  setEvents,
  token
}) {
  let onSwitchCalendar = (state) => {
    setSwitchCalendar(state);
    setSwitchCalendarModal(false);
    switchCalendar == "month" && axios
        .get(`${baseUrl}/events/?date=${new Date().toISOString().slice(0, 10)}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setEvents(response.data);
        });
  };
  return (
    <View>
      <Modal
        visible={switchCalendarModal}
        animationType="slide"
        transparent={true}
        style={{ zIndex: 10 }}
      >
        <View
          style={{
            top: "8%",
            width: 100,
            left: "60%",
            display: "flex",
            paddingBottom: 30,
          }}
        >
          <TouchableOpacity
            style={[styles.week, switchCalendar == "week" && styles.click]}
            onPress={() => onSwitchCalendar("week")}
          >
            <Text>Неделя</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.month, switchCalendar == "month" && styles.click]}
            onPress={() => onSwitchCalendar("month")}
          >
            <Text>Месяц</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default SwitchCalendarModal;
