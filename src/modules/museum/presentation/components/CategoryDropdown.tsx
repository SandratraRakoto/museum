import { FC } from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect, { Item } from "react-native-picker-select";

type CategoryDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: Item[];
};

const CategoryDropdown: FC<CategoryDropdownProps> = ({
  onChange,
  value,
  options,
}) => {
  return (
    <View style={styles.container}>
      <RNPickerSelect
        value={value}
        placeholder={{ label: "Filter by category", color: "#46424289" }}
        onValueChange={onChange}
        items={options}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default CategoryDropdown;
