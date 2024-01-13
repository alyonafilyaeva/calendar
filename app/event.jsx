import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Formik, Field, Form } from "formik";
import React, { useEffect, useState } from "react";
import {
  categories,
  family,
  times,
  timing,
  toDate,
  events,
  toDay
} from "../constants/constants";
import { marginRightElements, styles } from "../styles/StylesSheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { token, baseUrl } from "../constants/constants";
import axios from "axios";

export default function Event() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState(events[0]);
  const fetchEvents = () => {
    axios
      .get(`${baseUrl}/events/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEvent(response.data);
      });
  };
  useEffect(fetchEvents, []);

  const deleteEvent = () => {
    axios.delete(`${baseUrl}/events/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    router.push("/");
  };

  let newDate = toDate(event.event_date);

  return (
    <View style={styles.container}>
      <View style={styles.topPanel}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Image
            /* style={{ height: 30, width: 30 }} */
            source={require("../assets/images/back.png")}
          />
        </TouchableOpacity>
        <Text>
          <Text style={{fontSize: 22}}>•</Text> <Text style={{fontSize: 22}}>{event.main_name}</Text>
        </Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity onPress={() => deleteEvent()}>
            <Image
              style={{ /* height: 30, width: 30, */ marginRight: 10 }}
              source={require("../assets/images/delete.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              /* style={{ height: 30, width: 30 }} */
              source={require("../assets/images/edit.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 32 }}>
        <Text style={{ fontSize: 18, fontWeight: 700 }}>{newDate}</Text>
        <Text style={{ fontSize: 18, fontWeight: 700 }}>15:00</Text>
        <Text style={{ fontSize: 18, fontWeight: 700 }}>–</Text>
        <Text style={{ fontSize: 18, fontWeight: 700 }}>16:00</Text>
      </View>

      <View>
        <View style={styles.family}>
          <Text
            style={{
              fontSize: styles.fontSizeText,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Член семьи
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <TouchableOpacity>
            <View style={styles.avatar}>
                    {
                      (event.child.name == "Петя" ? (
                        <Image source={require("../assets/images/Boy.png")} />
                      ) : (
                        <Image source={require("../assets/images/Girl.png")} />
                      ))
                    }
                    <Text style={{ fontSize: styles.fontSizeText, marginLeft: 10 }}>
                    {event.child.name}
                  </Text>
                  </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 32 }}>
        <Text
          style={{
            fontSize: styles.fontSizeText,
            fontWeight: 700,
          }}
        >
          Напоминание в
        </Text>
        <View style={styles.categoriesItems}>
          <View style={styles.category}>
            <Text style={{ fontSize: styles.fontSizeText }}>12:20</Text>
          </View>
          <View style={styles.category}>
            <Text style={{ fontSize: styles.fontSizeText }}>13:30</Text>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 32 }}>
        <Text
          style={{
            fontSize: styles.fontSizeText,
            fontWeight: 700,
          }}
        >
          Адрес
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{fontSize: styles.fontSizeText}}>{event.location.address}</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity>
              <Image
                style={{ /* height: 30, width: 30, */ marginRight: 10 }}
                source={require("../assets/images/map.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                /* style={{ height: 30, width: 30 }} */
                source={require("../assets/images/copy.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {event.schedule && <View>
        <FlatList
          style={styles.familyItems}
          data={event?.schedule.days}
          renderItem={({ item }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 18 }}>{toDay(item.day_of_week)}</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18 }}>{item.time_start}</Text>
                <Text style={{ fontSize: 18 }}>–</Text>
                <Text style={{ fontSize: 18 }}>{item.time_finish}</Text>
              </View>
            </View>
          )}
        />
      </View>}

      {event.event_description && (
        <View>
          <Text
            style={{
              fontSize: styles.fontSizeText,
              fontWeight: 700,
            }}
          >
            Комментарий
          </Text>
          <Text>{event.event_description}</Text>
        </View>
      )}
    </View>
  );
}
