import { useAppDispatch } from "@/store/store";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { fetchMuseums } from "@/modules/museum/usecases/fetch-museums.usecase";
import { selectMuseum } from "@/modules/museum/selectors/museum.selector";
import { MaterialIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");
  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const { data: museums, status } = useSelector(selectMuseum);

  useEffect(() => {
    dispatch(fetchMuseums);
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={20}
          color="#000"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search Museum"
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        horizontal
        data={museums}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.history}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 200,
    width: screenWidth * 0.9,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
