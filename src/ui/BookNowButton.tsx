import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface buttonProps {
    onPress : ()=>void
    style? : ViewStyle
    text? : string
    textStyle? : TextStyle
}

export default function BookNowButton({textStyle, onPress, style, text }: buttonProps) {
  return (
    <TouchableOpacity style={StyleSheet.compose(styles.root, style)} onPress={onPress}>
      <Text style={[styles.text, textStyle]} >{text || "Book Now"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 30,
    width: 83,
    alignItems: "center",
    justifyContent : 'center',
    // alignContent: "center",
    backgroundColor : "#2E4886",
   borderRadius : 100,
   padding : 7,
   paddingHorizontal : 11

  },
  text : {
    fontSize : 12,
    fontWeight : "500",
    color : "white",
    alignSelf : 'center',
    margin : 0,
    lineHeight : 15

  }
});


