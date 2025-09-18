import { View, ViewStyle } from "react-native";
import { moderateScale, scale, verticalScale } from "../../util/scaling";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IconBoxProps {
  boxSize?: number;
  iconSize?: number;
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  style: ViewStyle;
}

export default function IconBox({
  name,
  boxSize = moderateScale(32),
  iconSize = moderateScale(24),
  style,
}: IconBoxProps) {
  return (
    <View
      style={[
        {
          width: boxSize,
          aspectRatio: 1,
          backgroundColor: "#7494CE1A",
          borderWidth: moderateScale(1),
          borderColor: "#576F9B47",
          alignItems: "center",
          justifyContent: "center",
          borderRadius : scale(5)
        },
        style,
      ]}
    >
      <MaterialCommunityIcons name={name} size={iconSize} />
    </View>
  );
}
