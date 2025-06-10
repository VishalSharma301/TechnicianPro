import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface catProps {
  cat: {
    name: string;
    icon: any;
  };
}

export default function CategoryComponent({cat}: catProps) {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.categoryItem}>
      <Pressable onPress={() => navigation.navigate("SelectServiceScreen", {serviceName : cat.name})}>
        <View style={styles.iconPlaceholder}>
          <Image source={cat.icon} />
        </View>
        <Text style={{ fontSize: 11, fontWeight: "500" }}>{cat.name}</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  categoryItem: { alignItems: "center", justifyContent: "center" },
  iconPlaceholder: {
    width: 62,
    height: 62,
    // backgroundColor:'rgba(61, 52, 52, 0.05)',
    backgroundColor: "#FAFAFA",
    borderRadius: 31,
    marginBottom: 12,
    // elevation : 5,?
    borderColor: "white",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
