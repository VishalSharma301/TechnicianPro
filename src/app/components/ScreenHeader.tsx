import { StyleSheet, View, ViewStyle, Text } from "react-native";
import PressableIcon from "./PressableIcon";
import { useNavigation } from "@react-navigation/native";

import colors from "../../constants/colors";
import { Button, Icon } from "@rneui/base";
// import { IconName } from "./Icon";

interface ScreenHeaderProps {
  ScreenName: string;
  IconLeft?:any
  IconRight?:  any;
  onIconRightPress?: () => void;
  onIconLeftPress?: () => void;
  button?: boolean;
  onButtonPress?: () => void;
  backgroundColor?: string;
  style?: ViewStyle | ViewStyle[];
}

export default function ScreenHeader({
  ScreenName,
  IconLeft = "ArrowBack",
  IconRight,
  onIconRightPress,
  onIconLeftPress,
  button,
  onButtonPress,
  backgroundColor,
  style,
}: ScreenHeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={[{ backgroundColor: backgroundColor },styles.header, style]}>
      {IconLeft && (
        <PressableIcon
          name={IconLeft}
          onPress={
            onIconLeftPress
              ? onIconLeftPress
              : () => {
                  navigation.goBack();
                }
          }
          color="black"
          containerStyle={styles.icon}
        />
      )}
      <Text
        style={[
          styles.screenName,
          IconLeft && {
            alignSelf: "center",
            textAlign: "center",
            fontSize: 24,
          },
        ]}
      >
        {ScreenName}
      </Text>
      {button && (
        <PressableIcon
          name="AddPerson"
          height={22}
          width={22}
          color="black"
          containerStyle={{
            // backgroundColor :'red',
            position: "absolute",
            right: 74,
            // bottom : 0,
            // left : 0,
            top : 10,
            flexDirection: "row",
            gap: 8,
            height: 44,
            width: 90,
            backgroundColor: "#EBEBEB",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
          }}
          text="Invite"
          onPress={onButtonPress}
        />
      )}

      {IconRight && (
        <PressableIcon
          name={IconRight}
          onPress={onIconRightPress}
          color="black"
          containerStyle={styles.icon}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // marginBottom: 24,
    // marginTop: 8,
    // marginHorizontal: 4,
    paddingLeft : 14,
    paddingRight : 14,
    backgroundColor : colors.neutral.Neutral100,
    // borderBottomColor: colors.border_grey,
    // borderBottomWidth: 0.5,
    // height: 70,
    paddingTop : 10,
    paddingBottom : 16
    
  },
  icon: {
    height: 44,
    width: 44,
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 2,
    backgroundColor: colors.neutral.Neutral300,
    borderRadius: 16,
  },
  screenName: {
    fontSize: 32,

    width: "76%",
  },
});
