import { View, Text, StyleSheet, Image } from "react-native";
import SkipButton from "../../../ui/SkipButton";
import NextButton from "../../../ui/NextButton";
import { useNavigation } from "@react-navigation/native";

function IntroScreen2() {
    const navigation = useNavigation() as any
     function onNext (){
        navigation.navigate("IntroScreen3")
    }
    function onSkip (){}
  return (
    <View style={styles.root}>
      <SkipButton onPress={onSkip} style={{alignSelf : 'flex-end'}}/>
      <View style={styles.image}>
        <Image source={require("../../../../assets/image 2.png")}/>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Easy Service booking {'\n'}& Scheduling</Text>
      </View>
      <View style={styles.loading}>
        <Image source={require("../../../../assets/load2.png")}/>
      </View>
      <View style={{marginTop : 50, alignSelf : 'center'}}>
        <NextButton onPress={onNext}/>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    root : {
        backgroundColor : 'white',
        flex : 1,
        padding : 16
        
    },
    image : {
        height : 328,
        width : 328,
        // borderWidth : 1,
        alignSelf : "center",
        marginTop : 16,
        borderRadius : 180
    },
    textContainer : {
        marginTop : 57,
       
    },
    text : {
        fontSize : 25,
        fontWeight : "600",
        lineHeight : 35,
        flexDirection: 'row', 
        textAlign : 'center'

    },
    loading : {
        marginTop : 71,
        alignSelf : 'center'
    }
})

export default IntroScreen2;
