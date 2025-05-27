import { ScrollView, StyleSheet, Text, View } from "react-native";
import { popularServices } from "../../util/popularServices";
import ServiceCard from "../components/ServiceCard";
import { useNavigation } from "@react-navigation/native";

export default function AllServicesScreen() {
    const navigation = useNavigation<any>()
  return (
    <ScrollView style={styles.root}>
      <Text style={{ fontWeight: "600", fontSize: 20 }}> Services </Text>
      {popularServices.map((service, id) => (
        <ServiceCard
          bgcolor={service.color}
          description={service.description}
          id={id}
          image={service.image}
            originalPrice={service.mrp}
            price={service.discountPrice}
            rating={service.rating}
            title={service.name}
            onPressBook={service.onPress}    
            onPressDetail={()=>navigation.navigate('ServiceDetailsScreen',service)}
              />
      ))}
      <Text style={{ fontWeight: "600", fontSize: 20, marginTop : 24, marginBottom :12 }}> Services </Text>
      {popularServices.map((service, id) => (
        <ServiceCard
          bgcolor={service.color}
          description={service.description}
          id={`${id}`}
          image={service.image}
            originalPrice={service.mrp}
            price={service.discountPrice}
            rating={service.rating}
            title={service.name}
            onPressBook={service.onPress}
             onPressDetail={()=>navigation.navigate('ServiceDetailsScreen',service)}    
              />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#EFF4FF",
    paddingHorizontal: 20,
    // paddingTop : 18
    marginTop : 18
  },
});
