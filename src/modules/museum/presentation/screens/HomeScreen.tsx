import { useAppDispatch } from "@/store/store";
import { useEffect, useMemo, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { fetchMuseums } from "@/modules/museum/usecases/fetch-museums.usecase";
import {
  selectCategories,
  selectMuseum,
} from "@/modules/museum/selectors/museum.selector";
import MuseumCard from "@/modules/museum/presentation/components/MuseumCard";
import SearchInput from "@/modules/museum/presentation/components/SearchInput";
import CategoryDropdown from "@/modules/museum/presentation/components/CategoryDropdown";
import { fetchCategories } from "@/modules/museum/usecases/fetch-categories.usecase";

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const { data: museums } = useSelector(selectMuseum);
  const { data: categories } = useSelector(selectCategories);

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [categories]
  );

  useEffect(() => {
    dispatch(fetchCategories);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMuseums(search, category));
  }, [dispatch, search, category]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput value={search} onChange={handleSearch} />
      <CategoryDropdown
        value={category}
        onChange={setCategory}
        options={categoryOptions}
      />
      <FlatList
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
    backgroundColor: "transparent",
  },
});
