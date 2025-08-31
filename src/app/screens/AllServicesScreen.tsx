import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { popularServices } from "../../util/popularServices";
import ServiceCard from "../components/ServiceCard";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { ServicesContext } from "../../store/ServicesContext";
import { iconMap } from "../../util/iconMap";
import ScreenHeader from "../components/ScreenHeader";

export default function AllServicesScreen() {
  const { services } = useContext(ServicesContext);
  const navigation = useNavigation<any>();
      return (
    <View style={styles.root}>

      {services.length < 1 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <ScreenHeader name="Services" style={{ }} backButton={true} rightIcon={false}/>
        
          <FlatList data={services} renderItem={({item})=>(
            <ServiceCard
              key={item._id}
              bgcolor="white"
              description={item.description}
              id={item._id}
              image={iconMap[item.icon] || iconMap["default"]}
              originalPrice={item.basePrice}
              icon = {item.icon}
              price={item.basePrice}
              rating={5}
              title={item.name}
              onPressBook={() => navigation.navigate("SelectServiceScreen" , {service: item})}
              onPressDetail={() =>
                navigation.navigate("ServiceDetailsScreen", {service : item})
              }
            />
          )}/>
          
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop : 18
    // marginTop: 18,
  },
});
