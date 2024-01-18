import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Event from "./event";
import axios from "axios";
import { toDate } from "../../constants/constants";

export default function Day({ date, events, token }) {

  const newCalendar = events.filter(function (item) {
    return item.event_date == date;
  });

  let newDate = toDate(date);
  
  const list = () => {
    return newCalendar.map((item) => {
      return (
        <View key={item.id}>
          <Event
            id={item.id}
            child={item.child.name}
            token={token}
          />
        </View>
      );
    });
  };

  return (
    <View>
      <Text style={{ marginBottom: 16, fontWeight: 700 }}>{newDate}</Text>
      <View style={{ marginBottom: 20 }}>
        {/* <FlatList
          data={newCalendar}
          renderItem={({ item }) => (
            <View>
              <Event event={item} key={item.id}/>
            </View>
          )}
        /> */}
        {list()}
      </View>
    </View>
  );
}
