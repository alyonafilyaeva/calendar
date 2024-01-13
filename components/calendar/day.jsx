import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Event from "./event";
import axios from "axios";
import { toDate } from "../../constants/constants";

export default function Day({ date, events }) {
  /* const [events, setEvents] = useState([]); */
  /* const fetchEvents = () => {
    axios
      .get("http://localhost:8000/api/events/", {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzMjY0OTk5LCJpYXQiOjE3MDMyNjEzOTksImp0aSI6ImE2NTY2Nzg3ZjI2OTRhMTI4NmFhMTI2YTljOWYxYTk1IiwidXNlcl9pZCI6MX0.qUJfpbvqYPx_yuu02-skA0GoCYmEhftYeYSR_TraF6A",
        },
      })
      .then((response) => {
        setEvents(response.data);
        console.log(response.data);
      });
  };

  useEffect(fetchEvents, []); */

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
