import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "../../util/scaling";

interface catProps {
  cat: {
    name: string;
    icon: any;
  };
  onPress: () => void;
}

export default function CategoryComponent({ cat, onPress }: catProps) {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.categoryItem}>
      {/* <Pressable onPress={() => navigation.navigate("SelectServiceScreen", {serviceName : cat.name})}> */}
      <Pressable onPress={onPress} style={{ alignItems: "center" }}>
        <View
          style={{
            overflow: "hidden",
            width: moderateScale(62),
            height: moderateScale(62),
          //  backgroundColor : 'white',
            borderRadius: 31,
          }}
        >
          <View style={styles.iconPlaceholder}>
            <Image
              source={cat.icon}
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                resizeMode: "contain",
              }}
            />
          </View>
        </View>
        <Text
          lineBreakMode="tail"
          numberOfLines={1}
          style={{ fontSize: moderateScale(11), fontWeight: "500", alignSelf: "center", marginTop : 12  }}
        >
          {cat.name}
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  categoryItem: {
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    width: "25%",
    overflow: "hidden",
  },
  iconPlaceholder: {
    width: moderateScale(62),
    height: moderateScale(62),
    // backgroundColor:'rgba(61, 52, 52, 0.05)',
    // backgroundColor: "#FAFAFA",
    backgroundColor: "transparent",
    borderRadius: 31,
    // marginBottom: 12,
    elevation: 200,
    borderColor: "white",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
