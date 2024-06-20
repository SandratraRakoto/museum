import { FC } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { MuseumModel } from "@/modules/museum/domain/museum.model";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

const screenWidth = Dimensions.get("window").width;

type MuseumCardProps = {
  museum: MuseumModel.Museum;
};
const MuseumCard: FC<MuseumCardProps> = ({ museum }) => {
  return (
    <Link href={`/${museum.id}`} asChild>
      <Pressable>
        <View style={styles.container}>
          <Image
            source={{
              uri: "https://cdn-imgix.headout.com/media/images/3cc1e44db9183bbe3b72511e5725a962-243-paris-%23004-003-paris-%7C-eiffel-tower-01.jpg?w=882&h=450&crop=faces&auto=compress%2Cformat&fit=min",
            }}
            style={styles.image}
          ></Image>
          <View style={styles.item}>
            <Text style={styles.title}>{museum.name}</Text>
            <Text style={styles.subtitle}>{museum.history}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    height: 240,
    width: screenWidth * 0.9,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  item: {
    padding: 16,
    maxHeight: 120,
  },
  image: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 14,
  },
});

export default MuseumCard;
