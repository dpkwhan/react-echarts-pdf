import React from "react";
import { Font, Text, View, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const BORDER_COLOR = "#000";
const BORDER_STYLE = "solid";

const styles = StyleSheet.create({
  headerBgColor: {
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

  tableHeader: {
    margin: 2,
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Oswald",
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

  tableCell: {
    margin: 2,
    fontSize: 12,
    fontFamily: "Oswald",
  },
});

const checkStrEmpty = str => {
  return !(str && str.length > 1 && str.split(" ").join("").length > 0);
}

const CustomTablePDF = props => {
  const { fields = [], data = [] } = props;

  return (
    <View style={styles.table}>
      <View style={[styles.tableRow, styles.headerBgColor]}>
        {fields.map((_item, _idx) => (
          <View key={`header-${_idx}`} style={[styles.tableCol, { width: `${_item.width}%` }]}>
            <Text style={[styles.tableHeader, { textAlign: "center" }]}>
              {_item.title}
            </Text>
          </View>
        ))}
      </View>

      {data.map((item, idx) => item && (
        <View key={`row-${idx}`} style={styles.tableRow}>
          {fields.map((_item, _idx) => {
            let val = item[_item.value] || "";
            let value_alt = (_item.value_alt && item[_item.value_alt]) || "";

            return (
              <View key={`col-${_idx}`} style={[styles.tableCol, { width: `${_item.width}%` }]}>
                <Text style={[styles.tableCell, _item.style ? _item.style : {}]}>
                  {_item.custom ? _item.component(item) : checkStrEmpty(val) ? value_alt : val || "-"}
                </Text>
              </View>
            );
          })}
        </View>)
      )}
    </View>
  );
}

export default CustomTablePDF;
