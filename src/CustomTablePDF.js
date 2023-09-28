import React from "react";
import { Font, Text, View, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const BORDER_COLOR = "#000";
const BORDER_STYLE = "solid";

const styles = StyleSheet.create({
  headerBg: {
    backgroundColor: "#aaa",
  },

  table: {
    display: "table",
    width: "auto",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },

  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },

  tableCol: {
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },

  tableCellHeader: {
    margin: 2,
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Oswald",
  },

  tableCell: {
    margin: 2,
    fontSize: 12,
    fontFamily: "Oswald",
  },

  textCenter: {
    textAlign: "center",
  }
});

const checkStrEmpty = str => {
  return !(str && str.length > 1 && str.split(" ").join("").length > 0);
}

const CustomTablePDF = props => {
  const { fields = [], data = [] } = props;

  return (
    <View style={styles.table}>
      <View style={[styles.tableRow, styles.headerBg]}>
        {fields.map((_item, _idx) => (
          <View key={_idx} style={[styles.tableCol, { width: `${_item.width}%` }]}>
            <Text style={[styles.tableCellHeader, { textAlign: "center" }]}>
              {_item.title}
            </Text>
          </View>
        ))}
      </View>

      {data.map((item, idx) => item && (
        <View key={idx} style={styles.tableRow}>
          {fields.map((_item, _idx) => {
            let val = item[_item.value] || "";
            let value_alt = (_item.value_alt && item[_item.value_alt]) || "";

            if (_item.custom) {
              return (
                <View key={_idx} style={[styles.tableCol, { width: `${_item.width}%` }]}>
                  <Text style={[styles.tableCell, item.style ? item.style : {}]}>
                    {_item.component(item)}
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={[styles.tableCol, { width: `${_item.width}%` }]}>
                  <Text style={[styles.tableCell, item.style ? item.style : {}]}>
                    {checkStrEmpty(val) ? value_alt : val || "-"}
                  </Text>
                </View>
              );
            }
          })}
        </View>)
      )}
    </View>
  );
}

export default CustomTablePDF;
