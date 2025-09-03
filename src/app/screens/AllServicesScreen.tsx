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
  const { services, servicesByCategory } = useContext(ServicesContext);
  const navigation = useNavigation<any>();
  return (
    <View style={styles.root}>
      <ScrollView>
        {Object.entries(servicesByCategory).map(([categoryName, services]) => (
          <View key={categoryName} style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {categoryName.toUpperCase()} ({services.length})
            </Text>

            {services.map((service) => (
              <ServiceCard
                key={service._id}
                bgcolor="#fff"
                description={service.description}
                id={service._id}
                image={iconMap[service.icon] || iconMap["default"]}
                onPressBook={() => {
                  navigation.navigate("SelectServiceScreen", { service });
                }}
                price={service.basePrice}
                originalPrice={service.originalPrice || service.basePrice}
                rating={service.rating || 4.5}
                title={service.name}
                onPressDetail={() => {
                  navigation.navigate("ServiceDetailScreen", { service });
                }}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 18,
    // marginTop: 18,
  },
});
