import { View, Text, StyleSheet, Image } from "react-native";
import SkipButton from "../../../ui/SkipButton";
import NextButton from "../../../ui/NextButton";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

function IntroScreen1() {
  const [screen, setScreen] = useState(1);

  const navigation = useNavigation() as any;
  function onSkip() {
    navigation.navigate("SelectLocationScreen");
  }
  function onNext() {
    if (screen > 2) {
      navigation.navigate("SelectLocationScreen");
    } else {
      setScreen((prev) => prev + 1);
    }
    console.log("screen", screen);

    // navigation.navigate("IntroScreen2")
  }
  return (
    <View style={styles.root}>
      <SkipButton onPress={onSkip} style={{ alignSelf: "flex-end" }} />
      <View style={styles.image}>
        <Image
        style={{width : '100%', height : '100%', resizeMode : 'contain', alignSelf : 'center'}}
          source={
            screen === 1
              ? require("../../../../assets/image 1.png")
              : screen === 2
              ? require("../../../../assets/image 2.png")
              : require("../../../../assets/image 3.png")
          }
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {screen === 1
            ? "We Provide Professional\nHome services at a very\nfriendly price"
            : screen === 2
            ? "Easy Service booking \n& Scheduling"
            : "Get Beauty parlor at your \nhome & other Personal \nGrooming needs"}
        </Text>
      </View>
      <View style={styles.loading}>
        <Image
          source={
            screen === 1
              ? require("../../../../assets/load1.png")
              : screen === 2
              ? require("../../../../assets/load2.png")
              : require("../../../../assets/load3.png")
          }
        />
      </View>
      <View style={{ marginTop: 50, alignSelf: "center" }}>
        <NextButton onPress={onNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    flex: 1,
    padding: 16,
  },
  image: {
    height: '39%',
    width: '84%',
    // borderWidth : 1,
    alignSelf: "center",
    marginTop: 16,
    borderRadius: 180,
  },
  textContainer: {
    marginTop: 57,
    height: 105,
    // borderWidth : 1
  },
  text: {
    fontSize: 25,
    fontWeight: "600",
    lineHeight: 35,
    flexDirection: "row",
    textAlign: "center",
  },
  loading: {
    marginTop: 71,
    alignSelf: "center",
  },
});

export default IntroScreen1;
