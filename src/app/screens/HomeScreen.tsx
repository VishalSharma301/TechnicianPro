import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeImages from "../components/SwipeImages";

const ASSETS_PATH = '../../../assets/';

const categories = [
  { name: "AC Service", icon: require(`${ASSETS_PATH}ac.png`) },
  { name: "Chimney", icon: require(`${ASSETS_PATH}chimney.png`) },
  { name: "Plumbing", icon: require(`${ASSETS_PATH}plumber.png`) },
  { name: "Electrical", icon: require(`${ASSETS_PATH}electric.png`) }
];

const images = [
  require(`${ASSETS_PATH}coupon.png`),
  require(`${ASSETS_PATH}coupon.png`),
  require(`${ASSETS_PATH}coupon.png`)
]

const dailyNeeds = [
  "R.O. Services",
  "Water Testing",
  "Tap Change",
  "Fan Repair",
  "Washing M. Repair",
  "Gyser Repair",
  "Gas Repair",
  "Iron Repair",
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF4FF" }}>
      <ScrollView>
        {/* Header */}
        <View style={styles.headerCard}></View>
        <View style={styles.headerContainer}>
          <View style={styles.headerTop}>
            <View style={{flexDirection : 'row'}}>

            <Ionicons name="location-outline" size={20} color="#000" />
            <Text style={styles.locationText}>Allow Location</Text>
            
            </View>
          

          <View style={styles.welcomeContainer}> 

            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={styles.avatar}
              />
              
            <View>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.username}>Amandeep kaur</Text>
            </View>
            <Ionicons
              name="notifications-outline"
              size={24}
              style={{backgroundColor : '#fff',height : 44, width : 44, borderRadius : 22, marginLeft: "auto",  textAlign : 'center', textAlignVertical : 'center' }}
            />
          </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#888" />
            <TextInput
              placeholder="Search For Services"
              style={{ flex: 1, marginLeft: 10 }}
            />
            <Ionicons name="options-outline" size={20} color="#888" />
          </View>
        </View>

        {/* Category Icons */}
        <View style={styles.categoryRow}>
          {categories.map((cat, idx) => (
            <View key={idx} style={styles.categoryItem}>
              <View style={styles.iconPlaceholder}>
                <Image source={cat.icon}/>
                </View>
              <Text style={{fontSize : 11, fontWeight : '500'}}>{cat.name}</Text>
            </View>
          ))}
        </View>

        {/* Coupon Banner */}
        <View style={styles.couponBanner}>
         
         <SwipeImages bannerImages={images}/>
         
          {/* <Image source={require('../../../assets/coupon.png')} style={{height : 178 , width : 'auto', overflow : 'hidden', borderRadius : 15  }} /> */}
          {/* <Text style={styles.hotDeal}>🔥 Hot Deal</Text>
          <Text style={styles.couponText}>
            Get coupons for Over 150 Merchants
          </Text>
          <TouchableOpacity style={styles.bookBtn}>
            <Text style={styles.bookBtnText}>Book Now</Text>
          </TouchableOpacity> */}
        </View>

        {/* Popular Services */}
        <Text style={styles.sectionTitle}>Popular Services</Text>
        <View style={styles.serviceGrid}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <View key={idx} style={styles.serviceCard}>
              <View style={styles.cardImage} />
              <View style={styles.ratingRow}>
                <Ionicons name="star" color="gold" size={14} />
                <Text style={{ marginLeft: 4 }}>4.5</Text>
              </View>
              <Text style={styles.serviceTitle}>Service Name</Text>
              <Text style={styles.priceText}>
                ₹300 <Text style={styles.strikePrice}>₹450</Text>
              </Text>
              <TouchableOpacity style={styles.bookNow}>
                <Text style={styles.bookNowText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Info Badges */}
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>12 Spec.\nAvailable near you</Text>
          <Text style={styles.badge}>2 Days\nArrival Time</Text>
        </View>

        {/* Daily Need */}
        <Text style={styles.sectionTitle}>Daily Need</Text>
        <View style={styles.dailyGrid}>
          {dailyNeeds.map((item, idx) => (
            <View key={idx} style={styles.dailyItem}>
              <View style={styles.dailyIcon} />
              <Text style={{ fontSize: 12, textAlign: "center" }}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Extra Banners */}
        <View style={styles.bannerRow}>
          <Text style={styles.banner}>5000+ Services</Text>
          <Text style={styles.banner}>It’s 39°C in Patiala!</Text>
        </View>

        {/* Referral Section */}
        <View style={styles.referralBanner}>
          <Text style={styles.referralText}>
            Get ₹100 for each friend who books!
          </Text>
          <TouchableOpacity style={styles.bookBtn}>
            <Text style={styles.bookBtnText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   headerCard: {
    backgroundColor: "#FBBF24",
    height: 263,
    padding: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    width: "100%",
    position : 'absolute'
  },
  
  headerContainer: {
    // backgroundColor:'rgba(104, 94, 69, 0.39)',
    // height: 263,
    padding: 16,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,

    width: "100%",
  },
  headerTop: {
    flexDirection: "column",
    // alignItems: "center",
    
  },
  locationText: { fontWeight: "bold", marginLeft: 5 },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    height : 44
  },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 10, borderWidth : 2, borderColor : 'white'  },
  welcomeText: { fontSize: 14, fontWeight : '400', color: "#000" },
  username: { fontSize: 15, fontWeight: "600", color: "#000" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 13,
    height : 50
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    height : 132,
    backgroundColor : '#FAFAFA',
    borderRadius : 15,
    marginHorizontal : 20,

  },
  categoryItem: { alignItems: "center", justifyContent : 'center' },
  iconPlaceholder: {
    width: 62,
    height: 62,
    // backgroundColor:'rgba(61, 52, 52, 0.05)',
    backgroundColor:'#FAFAFA',
    borderRadius: 31,
    marginBottom: 12,
    // elevation : 5,?
    borderColor : 'white',
    borderWidth : 2,
    alignItems : 'center',
    justifyContent : 'center'
  },
  couponBanner: {
    // backgroundColor: "#1D4ED8",
    // padding: 16,
    borderRadius: 16,
    margin: 16,
    height : 198
  },
  hotDeal: { color: "orange", marginBottom: 5 },
  couponText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  bookBtn: {
    marginTop: 10,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  bookBtnText: { color: "#1D4ED8", fontWeight: "bold" },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginHorizontal: 16,
    marginTop: 20,
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 10,
  },
  serviceCard: {
    width: "45%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    marginVertical: 10,
    elevation: 2,
  },
  cardImage: { height: 80, backgroundColor: "#eee", borderRadius: 10 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  serviceTitle: { fontWeight: "bold", marginTop: 5 },
  priceText: { color: "#000", marginTop: 3 },
  strikePrice: { textDecorationLine: "line-through", color: "#888" },
  bookNow: {
    backgroundColor: "#1D4ED8",
    padding: 6,
    borderRadius: 6,
    marginTop: 8,
  },
  bookNowText: { color: "#fff", textAlign: "center" },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  badge: {
    backgroundColor: "#facc15",
    padding: 10,
    borderRadius: 8,
    width: "45%",
    textAlign: "center",
  },
  dailyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 10,
  },
  dailyItem: { width: "22%", alignItems: "center", marginVertical: 10 },
  dailyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginBottom: 5,
  },
  bannerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  banner: {
    backgroundColor: "#1D4ED8",
    color: "#fff",
    padding: 16,
    borderRadius: 10,
    width: "45%",
    textAlign: "center",
  },
  referralBanner: {
    backgroundColor: "#1D4ED8",
    padding: 16,
    margin: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  referralText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
});

// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   Pressable,
// } from "react-native";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import BookNowButton from "../../ui/BookNowButton";
// import { useNavigation } from "@react-navigation/native";

// export default function HomeScreen() {
// const navigation = useNavigation()
//   const name = 'Vishal Sharma'

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       {/* Header */}
//       <View style={styles.header}>
//         {/* <Ionicons name="location-outline" size={20} color="black" /> */}

//           <Pressable onPress={()=>{navigation.navigate('ProfileScreen')}}>
//         <View style={styles.profileSection}>
//           <Image
//             source={require('../../../assets/images/tony.jpg')}
//             style={styles.avatar}
//           />
//           <View>
//             <Text style={styles.username}>{name}</Text>
//             <Text style={styles.location}>Brooklyn, New York</Text>
//           </View>
//         </View>
//         </Pressable>
//         <View
//           style={{
//             height: 44,
//             width: 44,
//             borderWidth: 1,
//             borderRadius: 22,
//             justifyContent: "center",
//             alignItems : 'center',
//             borderColor : '#D9D9D9'
//           }}
//         >
//           <Ionicons name="notifications-outline" size={24} color="black" />
//         </View>
//       </View>

//       {/* Search Box */}
//       <View style={styles.searchBox}>
//         <Ionicons name="search-outline" size={18} color="#aaa" />
//         <TextInput
//           placeholder="Search For Services"
//           style={styles.searchInput}
//         />
//         <MaterialIcons name="tune" size={24} color="#aaa" />
//       </View>

//       {/* Promotion Card */}
//       <View style={styles.promoCard}>
//         {/* <Text style={styles.badge}>🔥 Hot Deal</Text>
//         <Text style={styles.promoText}>
//           Monsoon Special!{"\n"}Full cleaning sirf ₹499
//         </Text>
//         <Image
//           source={require("../../../assets/icon.png")}
//           style={styles.promoImage}
//         />
//         <TouchableOpacity style={styles.bookButton}>
//           <Text style={styles.bookButtonText}>Book Now</Text>
//         </TouchableOpacity> */}
//          <Image
//           source={require("../../../assets/monsoonOffer.png")}
//           style={styles.promoImage}
//         />
//       </View>

//       {/* Our Services */}
//       <View style={styles.servicesHeader}>
//         <Text style={styles.sectionTitle}>Our Services</Text>
//         <TouchableOpacity>
//           <Text style={styles.seeAll}>See All</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.servicesRow}>
//         {[
//           { label: "AC Service", icon: require("../../../assets/ac.png") },
//           { label: "Chimney", icon: require("../../../assets/chimney.png") },
//           { label: "Plumbing", icon: require("../../../assets/plumber.png") },
//           {
//             label: "Electrical",
//             icon: require("../../../assets/electric.png"),
//           },
//         ].map((item, index) => (
//           <Pressable onPress={()=> navigation.navigate('SelectServiceScreen')}>
//           <View style={styles.serviceItem} key={index}>
//             <Image source={item.icon} style={styles.serviceIcon} />
//             <Text style={styles.serviceLabel}>{item.label}</Text>
//           </View>
//           </Pressable>
//         ))}
//       </View>

//       {/* Reminder Card */}
//       <View style={styles.reminderCard}>

//         <Image
//           source={require("../../../assets/bgimage.png")}
//           style={styles.reminderImage}
//         />

// <View style={styles.remindBox}>
//         <Text style={styles.reminderText}>
//           Hello, {name}! Your Voltas {"\n"}AC is due for service.
//         </Text>

//         <Text style={{fontWeight : '400', fontSize : 15}}>
//         12 nearby
//           technicians.{"\n"}Fastest arrival: 25 mins
//         </Text>
//         <BookNowButton  onPress={()=>{}} style={{marginTop : 2}}/>
// </View>

//         <Image
//           source={require("../../../assets/remind.png")}
//           style={styles.remindImage}
//         />

//         {/*
//         <Image
//           source={require("../../../assets/icon.png")}
//           style={styles.reminderImage}
//         />
//         <TouchableOpacity style={styles.bookButtonReminder}>
//           <Text style={styles.bookButtonText}>Book Now</Text>
//         </TouchableOpacity> */}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 16,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 16,
//     height: 44,
//     // borderWidth : 1
//      marginVertical : 17
//   },
//   profileSection: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,

//   },
//   avatar: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     marginRight: 10,
//   },
//   username: {
//     fontWeight: "bold",
//     fontSize: 14,
//   },
//   location: {
//     color: "#00000080",
//     fontSize: 14,
//     fontWeight: "400",
//   },
//   searchBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f1f1f1",
//     // padding: 10,
//     borderRadius: 12,
//     marginBottom: 21,
//     height : 50,
//     borderWidth : 1,
//     paddingHorizontal : 12
//   },
//   searchInput: {
//     flex: 1,
//     marginHorizontal: 10,
//   },
//   promoCard: {
//     // backgroundColor: "#f9f9f9",
//     borderRadius: 16,
//     paddingHorizontal: 16,
//     marginBottom: 20,
//     // height : 160
//     // position: "relative",
//   },
//   badge: {
//     backgroundColor: "#0066ff",
//     color: "white",
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     borderRadius: 12,
//     fontSize: 12,
//     alignSelf: "flex-start",
//     marginBottom: 10,
//   },
//   promoText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   promoImage: {
//     // width: "100%",
//     height: 160,
//     resizeMode: "contain",
//     alignSelf : 'center'
//   },
//   bookButton: {
//     backgroundColor: "#364fd2",
//     borderRadius: 8,
//     paddingVertical: 10,
//     marginTop: 10,
//     alignItems: "center",
//   },
//   bookButtonReminder: {
//     backgroundColor: "#364fd2",
//     borderRadius: 8,
//     paddingVertical: 10,
//     marginTop: 10,
//     alignItems: "center",
//   },
//   bookButtonText: {
//     color: "white",
//     fontWeight: "600",
//   },
//   servicesHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   seeAll: {
//     color: "#364fd2",
//     fontWeight: "600",
//   },
//   servicesRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 20,
//   },
//   serviceItem: {
//     alignItems: "center",
//   },
//   serviceIcon: {
//     width: 50,
//     height: 50,
//     marginBottom: 6,
//   },
//   serviceLabel: {
//     fontSize: 12,
//     textAlign: "center",
//   },
//   reminderCard: {
//     backgroundColor: "#f2f6ff",
//     borderRadius: 16,
//     // padding: 16,
//     height : 176
//   },
//   reminderText: {
//     fontSize: 16.4,
//     // marginBottom: 10,
//     fontWeight: "700",
//   },
//   reminderImage: {
//     // width: "100%",
//     height: 176,
//     resizeMode: "contain",
//     alignSelf : 'center',
//     opacity : 0.2,
//     position : 'absolute'
//     // marginBottom: 10,
//   },
//    remindImage: {

//     resizeMode: "contain",
//     alignSelf : 'flex-end',
//     bottom : 0,

//     position : 'absolute'
//     // marginBottom: 10,
//   },
//    remindBox: {
// //  borderWidth : 1,
//  position : 'absolute',
//  height : 124,
//  width : 197,
//  top : 25,
//  gap : '7'
//   },
// });
