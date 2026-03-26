import { Feather, Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CreateClubForm from "./CreateClub";

// Import your shared components
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";

const EVENTS_DATA = [
  { 
    id: "1", 
    title: "Annual Tech Fest 2024", 
    date: "Dec 15th 2025", 
    time: "10am to 06pm", 
    location: "Main Auditorium", 
    count: "6-10 events", 
    color: "#F4F8FB",
    img: require("../../assets/images/fluent-color_design-ideas-24.png") 
  },
  { 
    id: "2", 
    title: "Career Fair", 
    date: "Dec 20 2025", 
    time: "09am to 05pm", 
    location: "Sports complex", 
    count: "6-10 events", 
    color: "#FFF9EC",
    img: require("../../assets/images/fluent-color_design-ideas-24.png") 
  },
  { 
    id: "3", 
    title: "Soft skill Fest", 
    date: "Dec 29th 2025", 
    time: "10am to 06pm", 
    location: "Main Auditorium", 
    count: "6-10 events", 
    color: "#F4F8FB",
    img: require("../../assets/images/fluent-color_design-ideas-24.png") 
  },
];

const CLUBS_DATA = [
  { 
    id: "1", 
    category: "Tech", 
    title: "Techno Innovation Club", 
    members: "230 members", 
    description: "Explore cutting-edge technologies participates in hackathons and build innovative projects." 
  },
  { 
    id: "2", 
    category: "Cultural (Student created)", 
    title: "Photography Club", 
    members: "2340 members", 
    description: "Capture moments, learn photography Techniques and participate in photo walks." 
  },
  { 
    id: "3", 
    category: "Soft skills", 
    title: "Debate Society Club", 
    members: "530 members", 
    description: "Sharpen your public speaking skills and engage in intellectual discussions" 
  },
];

export default function EventAndFeedback() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Events");
  const [isCreating, setIsCreating] = useState(false);
  
  // Drawer logic - Standardized to -wp('75%')
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(wp('-75%'))).current;

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(drawerAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnim, { toValue: wp('-75%'), duration: 250, useNativeDriver: true })
      .start(() => setDrawerOpen(false));
  };

  const handleBack = () => {
    if (isCreating) {
      setIsCreating(false);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaProvider>
      {/* Remove the "index" title from Expo Router header */}
      <Stack.Screen options={{ headerShown: false }} />
      
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F3FF" }} edges={['top']}>
        <StatusBar barStyle="dark-content" />
        
        <DrawerMenu drawerOpen={drawerOpen} closeDrawer={closeDrawer} drawerAnim={drawerAnim} router={router} />
        
        <Header openDrawer={openDrawer} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.headerRow}>
            <View>
                <Text style={styles.screenTitle}>{isCreating ? "Clubs" : activeTab}</Text>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Feather name="arrow-left" size={20} color="#4A63F3" />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
            </View>

            {activeTab === "Clubs" && !isCreating && (
                <TouchableOpacity style={styles.createClubBtn} onPress={() => setIsCreating(true)}>
                    <Text style={styles.createBtnText}>Create Club</Text>
                </TouchableOpacity>
            )}
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === "Events" && styles.activeTab]} 
              onPress={() => {
                setActiveTab("Events");
                setIsCreating(false);
              }}
            >
              <Text style={[styles.tabText, activeTab === "Events" && styles.activeTabText]}>Events</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tab, activeTab === "Clubs" && styles.activeTab]} 
              onPress={() => setActiveTab("Clubs")}
            >
              <Text style={[styles.tabText, activeTab === "Clubs" && styles.activeTabText]}>Clubs</Text>
            </TouchableOpacity>
          </View>

          {isCreating ? (
            <CreateClubForm onsubmit={() => setIsCreating(false)} />
          ) : (
            activeTab === "Events" ? (
              EVENTS_DATA.map((item) => (
                <View key={item.id} style={styles.eventCard}>
                  <View style={[styles.topSection, { backgroundColor: item.color }]}>
                    <View style={styles.iconCircle}><Image source={item.img} style={styles.cardIcon} resizeMode="contain" /></View>
                    <Text style={styles.eventTitle}>{item.title}</Text>
                    <Text style={styles.eventDate}>{item.date}</Text>
                    <TouchableOpacity style={styles.registerBtn}><Text style={styles.registerBtnText}>Register</Text></TouchableOpacity>
                  </View>
                  <View style={styles.bottomSection}>
                    <Text style={styles.timingTitle}>Timings: {item.time}</Text>
                    <View style={styles.detailsRow}>
                      <View><Text style={styles.detailLabel}>Location</Text><Text style={styles.detailValue}>{item.location}</Text></View>
                      <View><Text style={styles.detailLabel}>Events</Text><Text style={styles.detailValue}>{item.count}</Text></View>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              CLUBS_DATA.map((item) => (
                <View key={item.id} style={styles.clubCard}>
                  <View style={styles.clubHeader}>
                    <Image source={require("../../assets/images/fluent-color_design-ideas-24.png")} style={styles.clubLogo} />
                    <View style={styles.clubHeaderInfo}>
                      <Text style={styles.clubCategory}>{item.category}</Text>
                      <Text style={styles.clubTitleText}>{item.title}</Text>
                    </View>
                  </View>
                  <View style={styles.memberRow}><Ionicons name="people" size={18} color="#7B8190" /><Text style={styles.memberText}>{item.members}</Text></View>
                  <View style={styles.divider} />
                  <Text style={styles.clubDesc}>{item.description}</Text>
                  <View style={styles.clubActions}>
                    <TouchableOpacity style={styles.viewMoreBtn}><Ionicons name="eye-outline" size={18} color="#4A63F3" /><Text style={styles.viewMoreText}>View more</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.joinBtn}><Text style={styles.joinText}>Join Club</Text></TouchableOpacity>
                  </View>
                </View>
              ))
            )
          )}

          {!isCreating && (
            <View style={styles.pagination}>
              <Text style={styles.paginationLabel}>1-3 of 15</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="arrow-left" size={24} color="#D1D1D1" />
                <Feather name="arrow-right" size={24} color="#4A63F3" style={{ marginLeft: 20 }} />
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  scrollContent: { 
    paddingHorizontal: wp('5%'), 
    paddingBottom: hp('5%') 
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  screenTitle: { fontSize: wp('7%'), fontWeight: "700", color: "#1A1A1A" },
  backButton: { flexDirection: "row", alignItems: "center", marginVertical: hp('1%') },
  backText: { color: "#4A63F3", fontSize: wp('4%'), marginLeft: 5, fontWeight: "500" },
  createClubBtn: { backgroundColor: '#4A63F3', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, elevation: 4 },
  createBtnText: { color: '#FFF', fontWeight: '700' },
  tabContainer: { flexDirection: "row", backgroundColor: "#FFF", borderRadius: 15, padding: 5, marginBottom: hp('2%'), marginTop: hp('1%') },
  tab: { flex: 1, paddingVertical: hp('1.2%'), alignItems: "center", borderRadius: 12 },
  activeTab: { backgroundColor: "#4A63F3" },
  tabText: { color: "#666", fontWeight: "600", fontSize: wp('3.8%') },
  activeTabText: { color: "#FFF" },
  eventCard: { backgroundColor: "#FFF", borderRadius: 25, overflow: "hidden", marginBottom: hp('2.5%'), elevation: 4, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  topSection: { alignItems: "center", paddingVertical: hp('3%') , margin: 8, borderRadius: 25},
  iconCircle: { width: wp('14%'), height: wp('14%'), borderRadius: wp('7%'), backgroundColor: "#FFF", justifyContent: "center", alignItems: "center", elevation: 2 },
  cardIcon: { width: wp('10%'), height: wp('10%') },
  eventTitle: { fontSize: wp('4.5%'), fontWeight: "700", marginTop: 12, color: "#1A1A1A" },
  eventDate: { color: "#666", fontSize: wp('3.5%'), marginTop: 4 },
  registerBtn: { backgroundColor: "#4A63F3", paddingHorizontal: wp('10%'), paddingVertical: 8, borderRadius: 10, marginTop: 15 },
  registerBtnText: { color: "#FFF", fontWeight: "600" },
  bottomSection: { padding: 20 },
  timingTitle: { fontSize: wp('4%'), fontWeight: "700", marginBottom: 12 },
  detailsRow: { flexDirection: "row", justifyContent: "space-between" },
  detailLabel: { color: "#A0A0A0", fontSize: wp('3.2%') },
  detailValue: { fontSize: wp('3.8%'), fontWeight: "700" },
  clubCard: { backgroundColor: "#FFF", borderRadius: 25, padding: 20, marginBottom: hp('2.5%'), elevation: 4, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10 },
  clubHeader: { flexDirection: 'row', alignItems: 'center' },
  clubLogo: { width: 50, height: 50, borderRadius: 12 },
  clubHeaderInfo: { marginLeft: 15 },
  clubCategory: { color: '#A0A0A0', fontSize: 12, fontWeight: '500' },
  clubTitleText: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  memberRow: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  memberText: { marginLeft: 8, color: '#666', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 15 },
  clubDesc: { color: '#888', lineHeight: 20, marginBottom: 20 },
  clubActions: { flexDirection: 'row', justifyContent: 'space-between' },
  viewMoreBtn: { flex: 1, flexDirection: 'row', backgroundColor: '#F0F3FF', height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 10 , elevation: 4},
  viewMoreText: { color: '#4A63F3', fontWeight: '700', marginLeft: 5},
  joinBtn: { 
    flex: 1, 
    backgroundColor: '#4A63F3', 
    height: 45, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#4A63F3',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  joinText: { color: '#FFF', fontWeight: '600' },
  pagination: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FFF", paddingHorizontal: wp('6%'), paddingVertical: hp('1.5%'), borderRadius: 15, marginTop: hp('2%'), marginBottom: hp('2%'), width: wp('55%'), alignSelf: 'center', elevation: 3, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5,},
  paginationLabel: { fontSize: 16, color: "#1A1A1A", fontWeight: "600" },
});