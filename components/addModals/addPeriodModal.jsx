import React, { useEffect, useState } from "react";
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

function AddPeriodModal({
  addPeriodModal,
  setAddPeriodModal,
  startingDay,
  setStartingDay,
  endingDay,
  setEndingDay,
}) {
  let [markedDates, setMarkedDates] = useState();
  let [end, setEnd] = useState();
  let [start, setStart] = useState();
  let [dates, setDates] = useState({ startDay: "", endDay: "" });
  let [click, setClick] = useState(1);
  let addPeriod = (day) => {
    setClick((click) => click + 1);
    console.log(click)
    switch (click) {
      case 1:
        setStartingDay(startingDay => String(day.dateString));
        setStart(day.timestamp);
        console.log(start);
        break;
      case 2:
        setEndingDay(endingDay => String(day.dateString));
        setEnd(day.timestamp);
        console.log(end);
      default:
        break;
    }

    let days = (end - start) / 3600 / 1000 / 24;
    console.log(days);
    let marked = {};
    for (let i = 1; i <= days; i++) {
      let day = day.plusDay
      marked[`2023-10-${day}`] = {
        startingDay: i == 1,
        endingDay: i == 15,
        color: "lightgreen",
        textColor: "#aaa",
        disabled: true,
      };
    }
    return marked;
  };
  return (
    <View>
      <Modal
        visible={addPeriodModal}
        animationType="slide"
        transparent={true}
        style={{ zIndex: 10 }}
      >
        <View
          style={{
            top: "55%",
            /* height: "40%", */
            display: "flex",
            backgroundColor: "#FFF",
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 30,
            shadowColor: "#000",
            shadowRadius: 4,
            shadowOffset: { width: -6, height: -4 },
            shadowOpacity: 0.2,
            borderTopColor: "#EFEAEA",
            borderTopWidth: 1,
            /* justifyContent: "flex-end", */
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: 700 }}>
              Выбрать период повторения
            </Text>

            <TouchableOpacity onPress={() => setAddPeriodModal(false)}>
              <Image source={require("../../assets/images/done.png")} />
            </TouchableOpacity>
          </View>
          <Calendar
            firstDay={1}
            markingType={"period"}
            markedDates={{
              startingDay: { startingDay: true, color: "#EFEAEA" },
              endingDay: {
                endingDay: true,
                color: "#EFEAEA",
              },
            }}
            onDayPress={(day) => addPeriod(day)}
          />
        </View>
      </Modal>
    </View>
  );
}

export default AddPeriodModal;
