import {
  ArrowLeft,
  ArrowUp,
  Building2,
  CheckCircle,
  Users,
} from "lucide-react-native";
 
import { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
 
import { Stack, useRouter } from "expo-router";
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";
 
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
 
const COLORS = {
  primary: "#4259FA",
  secondary: "#F97D24",
  background: "#F3F6FF",
  white: "#FFFFFF",
  textGray: "#888",
  success: "#0AC947",
};
 
export default function ScholarshipScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("eligible");
 
  // Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-300)).current;
 
  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
 
  const closeDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: -300,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setDrawerOpen(false));
  };
 
  const eligibleData = [
    { id: 1, title: "Merit Based \nScholarships 2026", lastDate: "2025-12-23" },
    {
      id: 2,
      title: "Alumni Scholarships from \n batch 2023 to 2025",
      lastDate: "2025-12-14",
    },
    { id: 3, title: "Need Based \nScholarships 2026", lastDate: "2025-12-13" },
  ];
 
  const statusData = [
    {
      id: 4,
      title: "Merit Based \nScholarships 2026",
      amount: "25000/year",
      status: "Approved",
    },
    {
      id: 5,
      title: "Alumni Scholarships \nfrom batch 2023 to 2025",
      lastDate: "14 Dec 2025",
      status: "Pending",
    },
  ];
 
  const renderCard = ({ item }) => {
    const isEligible = activeTab === "eligible";
    const isAlumni = item.title.toLowerCase().includes("alumni");
 
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}>
            {isAlumni ? (
              <Users color={COLORS.secondary} size={wp("7%")} />
            ) : (
              <Building2 color={COLORS.primary} size={wp("7%")} />
            )}
          </View>
 
          <View style={styles.infoContainer}>
            <Text style={styles.cardTitle}>{item.title}</Text>
 
            {isEligible ? (
              <View style={styles.eligibleRow}>
                <Text style={styles.dateText}>Last date {item.lastDate}</Text>
 
                <TouchableOpacity style={styles.applyBtn}>
                  <Text style={styles.applyBtnText}>Apply now</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.statusRow}>
                <Text style={styles.subText}>
                  {item.amount
                    ? `Rs ${item.amount}`
                    : `Last date ${item.lastDate}`}
                </Text>
 
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.status}</Text>
                </View>
              </View>
            )}
          </View>
 
          <View style={styles.statusIconWrapper}>
            {isEligible ? (
              <ArrowUp color={COLORS.secondary} size={wp("6%")} />
            ) : (
              <CheckCircle color={COLORS.success} size={wp("6%")} />
            )}
          </View>
        </View>
      </View>
    );
  };
 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar barStyle="dark-content" />
 
      <View style={{ paddingHorizontal: wp("5%"), flex: 1 }}>
        <Stack.Screen options={{ headerShown: false }} />
        <Header openDrawer={openDrawer} />
 
        <Text style={styles.title}>Scholarships</Text>
 
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color={COLORS.primary} size={wp("5%")} />
          <Text style={styles.backText}>Back to Dashboard</Text>
        </TouchableOpacity>
 
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "eligible" && styles.activeTab]}
            onPress={() => setActiveTab("eligible")}
          >
            <Text
              style={[
                styles.tabLabel,
                activeTab === "eligible" && styles.activeLabel,
              ]}
            >
              Eligible to apply
            </Text>
          </TouchableOpacity>
 
          <TouchableOpacity
            style={[styles.tab, activeTab === "status" && styles.activeTab]}
            onPress={() => setActiveTab("status")}
          >
            <Text
              style={[
                styles.tabLabel,
                activeTab === "status" && styles.activeLabel,
              ]}
            >
              Applied
            </Text>
          </TouchableOpacity>
        </View>
 
        <FlatList
          data={activeTab === "eligible" ? eligibleData : statusData}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: hp("3%"),
            flexGrow: 1,
          }}
        />
      </View>
 
      <DrawerMenu
        drawerOpen={drawerOpen}
        closeDrawer={closeDrawer}
        drawerAnim={drawerAnim}
      />
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  title: {
    fontSize: wp("7%"),
    fontWeight: "bold",
    marginTop: hp("1%"),
  },
 
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("1%"),
    marginBottom: hp("2%"),
  },
 
  backText: {
    color: COLORS.primary,
    marginLeft: wp("2%"),
    fontSize: wp("4%"),
  },
 
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: wp("4%"),
    padding: wp("2%"),
    marginBottom: hp("3%"),
  },
 
  tab: {
    flex: 1,
    paddingVertical: hp("1.5%"),
    alignItems: "center",
    borderRadius: wp("3%"),
    
  },
 
  activeTab: {
    backgroundColor: COLORS.primary,
  },
 
  tabLabel: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: wp("3.8%"),
  },
 
  activeLabel: {
    color: "#FFF",
  },
 
  card: {
    backgroundColor: "#FFF",
    borderRadius: wp("5%"),
    padding: wp("4%"),
    marginBottom: hp("2%"),
  },
 
  cardHeader: {
    flexDirection: "row",
  },
 
  iconBox: {
    marginRight: wp("4%"),
  },
 
  infoContainer: {
    flex: 1,
  },
 
  cardTitle: {
    fontSize: wp("4%"),
    fontWeight: "bold",
  },
 
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("1.5%"),
  },
 
  subText: {
    color: COLORS.textGray,
    fontSize: wp("3.5%"),
  },
 
  badge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("0.8%"),
    borderRadius: wp("3%"),
  },
 
  badgeText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: wp("3.5%"),
  },
 
  eligibleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("1%"),
  },
 
  dateText: {
    color: COLORS.textGray,
    fontSize: wp("3.5%"),
  },
 
  applyBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
    borderRadius: wp("3%"),
  },
 
  applyBtnText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: wp("3.5%"),
  },
 
  statusIconWrapper: {
    position: "absolute",
    right: 0,
    top: hp("0.5%"),
  },
});