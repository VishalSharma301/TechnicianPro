import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IntroScreen1 from './src/app/screens/IntroScreens/IntroScreen1';
import IntroScreen3 from './src/app/screens/IntroScreens/IntroScreen3';
import IntroScreen2 from './src/app/screens/IntroScreens/IntroScreen2';

import HomeScreen from './src/app/screens/HomeScreen';
import MessageScreen from './src/app/screens/MessageScreen';
import CalendarScreen from './src/app/screens/CalendarScreen';
import ProfileScreen from './src/app/screens/ProfileScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LocaleConfig } from 'react-native-calendars';
import SelectServiceScreen from './src/app/screens/SelectServiceScreen';


const Stack = createStackNavigator()
const Tabs = createBottomTabNavigator()



LocaleConfig.locales["en"] = {
  formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  // numbers: ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] // number localization example
};
LocaleConfig.defaultLocale = "en";


function HomeScreens(){
  return(
  <Stack.Navigator screenOptions={{headerShown : false}}>
      <Stack.Screen name='HomeScreen' component={HomeScreen}  options={{headerShown : false}}/>
      <Stack.Screen name='SelectServiceScreen' component={SelectServiceScreen} />
      {/* <Stack.Screen name='IntroScreen3' component={IntroScreen3} />
      <Stack.Screen name='TabScreens' component={TabScreens} /> */}
    </Stack.Navigator>
  )
}

function TabScreens(){
  return(
    <Tabs.Navigator screenOptions={{headerShown : false}}>
      <Tabs.Screen name='HomeScreens' component={HomeScreens}/>
      <Tabs.Screen name='MessageScreen' component={MessageScreen}/>
      <Tabs.Screen name='CalendarScreen' component={CalendarScreen}/>
      <Tabs.Screen name='ProfileScreen' component={ProfileScreen}/>
    </Tabs.Navigator>
  )
}


function IntroScreens(){
  return(
  <Stack.Navigator screenOptions={{headerShown : false}}>
      <Stack.Screen name='IntroScreen1' component={IntroScreen1} />
      <Stack.Screen name='IntroScreen2' component={IntroScreen2} />
      <Stack.Screen name='IntroScreen3' component={IntroScreen3} />
      <Stack.Screen name='TabScreens' component={TabScreens} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{flex : 1}}>
    <NavigationContainer>
      <StatusBar style="auto" />
    <IntroScreens/>
    </NavigationContainer>
    </SafeAreaView>
   </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
