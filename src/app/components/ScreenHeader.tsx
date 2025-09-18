import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { moderateScale, scale, verticalScale } from "../../util/scaling";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  style?: ViewStyle;
  name: string;
  backButton?: boolean;
  rightIcon ?: boolean;
}

export default function ScreenHeader({
  style,
  name,
  backButton = true,
  rightIcon = true
}: HeaderProps) {
  const navigation = useNavigation<any>();
  return (
    <View style={[styles.header, style]}>
  <View style={styles.backContainer}>
    {backButton && (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>{`< Back`}</Text>
      </TouchableOpacity>
    )}
  </View>

  <View style={styles.titleContainer}>
    <Text style={styles.title}>{name}</Text>
  </View>

  <View style={styles.rightContainer}>
    {rightIcon && (
      <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
        <Ionicons name="settings-outline" size={moderateScale(24)} color="#000" />
      </TouchableOpacity>
    )}
  </View>
</View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(13),
    marginBottom: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  backContainer: {
    width: scale(50), // fixed width for left
  },
  titleContainer: {
    flex: 1, // takes all remaining space
    alignItems: "center",
  },
  rightContainer: {
    width: scale(50), // fixed width for right
    alignItems: "flex-end",
  },
  back: {
    fontSize: moderateScale(14),
    fontWeight: "500",
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: "600",
  },
});
