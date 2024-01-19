import React, { useEffect, useMemo, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
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
  const [selected, setSelected] = useState('');
  const marked = useMemo(() => ({
    [selected]: {
      /* selected: true, */
      marked: true,
      selectedColor: 'red',
      selectedTextColor: "red",
      dotColor: '#ADB9E3'
    }
  }), [selected]);
  LocaleConfig.locales['fr'] = {
    monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентрябрь','Октябрь','Ноябрь','Декабрь'],
    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'],
    dayNamesShort: ['ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ',],
  };
  LocaleConfig.defaultLocale = 'fr';
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

   /*  let days = (end - start) / 3600 / 1000 / 24;
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
    return marked; */
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
            top: "53%",
            /* height: "40%", */
            display: "flex",
            backgroundColor: "#FFF",
            padding: 16,
            paddingBottom: 40,
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
            /* markedDates={{
              startingDay: { startingDay: true, color: "#EFEAEA" },
              endingDay: {
                endingDay: true,
                color: "#EFEAEA",
              },
            }} */
            markedDates={marked}
            onDayPress={(day) => {addPeriod(day); setSelected(day.dateString)}}
          />
        </View>
      </Modal>
    </View>
  );
}

export default AddPeriodModal;
