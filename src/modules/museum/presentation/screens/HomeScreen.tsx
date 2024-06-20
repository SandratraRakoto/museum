import { useAppDispatch } from "@/store/store";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { fetchMuseums } from "@/modules/museum/usecases/fetch-museums.usecase";
import { selectMuseum } from "@/modules/museum/selectors/museum.selector";
import Map from "@/modules/museum/presentation/components/Map";
import MuseumCard from "@/modules/museum/presentation/components/MuseumCard";
import SearchInput from "../components/SearchInput";

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");
  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const { data: museums } = useSelector(selectMuseum);

  useEffect(() => {
    dispatch(fetchMuseums(search));
  }, [dispatch, search]);

  return (
    <SafeAreaView style={styles.container}>
      <Map
        markers={museums.map((museum) => ({
          latitude: museum.coordinates.lat,
          longitude: museum.coordinates.lon,
        }))}
      />
      <SearchInput value={search} onChange={handleSearch} />
      <FlatList
        horizontal
        data={museums}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MuseumCard museum={item} />}
        contentContainerStyle={styles.flatListContentContainer}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContentContainer: {
    paddingBottom: 20,
  },
  flatList: {
    position: "absolute",
    bottom: 0,
    height: 290,
    backgroundColor: "transparent",
  },
});
