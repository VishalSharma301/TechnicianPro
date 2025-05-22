import { Text, View } from "react-native";
import CalendarComponent from "../components/Calendar";

function CalendarScreen() {
  return (
  <View style={{flex : 1, height : '100%', backgroundColor : 'white'}}>
 <CalendarComponent />
  </View>
);
}

export default CalendarScreen;
