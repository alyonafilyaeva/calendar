import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { styles } from "../../styles/StylesSheet";

export default function AddElementsModal({
  addElementsModal,
  setAddElementsModal,comment, setComment
}) {
  return (
    <View>
      <Modal
        visible={addElementsModal}
        animationType="slide"
        transparent={true}
        style={{ zIndex: 10 }}
      >
        <View
          style={{
            top: "80%",
            height: "40%",
            display: "flex",
            backgroundColor: "#FFF",
            paddingLeft: 16,
            paddingRight: 16,
            shadowColor: "#000",
            shadowRadius: 4,
            shadowOffset: { width: -6, height: -4 },
            shadowOpacity: 0.2,
            borderTopColor: "#EFEAEA",
            borderTopWidth: 1,
            paddingTop: 10,
            /* justifyContent: "flex-end", */
          }}
        >
          <TouchableOpacity
            style={styles.addElement}
            onPress={() => {
              setAddElementsModal(false);
              setComment(true)
            }}
          >
            <Image
              style={{ marginRight: 14 }}
              source={require("../../assets/images/notification.png")}
            />
            <Text>Комментарий</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addElement}>
            <Image
              style={{ marginRight: 8 }}
              source={require("../../assets/images/checklist.png")}
            />
            <Text>Чеклист</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addElement}>
            <Image
              style={{ marginRight: 8 }}
              source={require("../../assets/images/format_list.png")}
            />
            <Text>Нумерованный список</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addElement}>
            <Image
              style={{ marginRight: 8 }}
              source={require("../../assets/images/grid.png")}
            />
            <Text>Таблица</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
