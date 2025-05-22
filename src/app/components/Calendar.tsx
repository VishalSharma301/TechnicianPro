import { View } from "react-native";
import { Calendar,LocaleConfig } from "react-native-calendars";
import colors from "../../constants/colors";
import { StyleSheet } from "react-native";

export default function CalendarComponent(){

  

  return (
    <View style={styles.calendarContainer}>
        {/* <Text style={styles.month}>October 2024</Text> */}
        <Calendar
        
          // Specify theme for customization
          theme={{
            todayTextColor: colors.primary.Primary700,
            arrowColor: colors.primary.Primary700,
            
          }}
          //   markedDates={{
          //     '2024-10-06': { selected: true, selectedColor: '#f7b500' },
          //     '2024-10-07': { marked: true, dotColor: '#f7b500' },
          //     // Add more marked dates
          //   }}
        />
      </View>
  );
};

const styles = StyleSheet.create({
    calendarContainer: {
        marginTop: 16,
        backgroundColor: "#f8f8f8",
        borderRadius: 8,
        fontFamily: "WorkSans-SemiBold",
      },
});