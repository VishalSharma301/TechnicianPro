import {
  ActivityIndicator,
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

export default function AllServicesScreen() {
  const { services } = useContext(ServicesContext);
  const navigation = useNavigation<any>();
      return (
    <ScrollView style={styles.root}>
      {services.length < 1 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text style={{ fontWeight: "600", fontSize: 20, marginBottom: 10 }}>
            Services
          </Text>
          {services.map((service) => (
            <ServiceCard
              key={service._id}
              bgcolor="white"
              description={service.description}
              id={service._id}
              image={service.icon}
              originalPrice={service.basePrice}
              price={service.basePrice}
              rating={5}
              title={service.name}
              onPressBook={() => navigation.navigate("SelectServiceScreen" , {service: service})}
              onPressDetail={() =>
                navigation.navigate("ServiceDetailsScreen", service)
              }
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#EFF4FF",
    paddingHorizontal: 20,
    // paddingTop : 18
    marginTop: 18,
  },
});
