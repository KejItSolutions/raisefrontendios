import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Animated,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function Dashboard() {
  const router = useRouter();

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EEF1F7" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: wp("5%"),
          paddingBottom: hp("3%"),
          flexGrow: 1,
        }}
      >
        {/* HEADER */}
        <Header openDrawer={openDrawer} />

        {/* TITLE */}
        <Text style={styles.title}>Dashboard</Text>

        {/* TOP CARDS */}
        <View style={styles.cardsContainer}>
          {/* LEFT */}
          <View style={styles.leftColumn}>
            <TouchableOpacity
              style={styles.smallCard}
              onPress={() => router.push("/ScholarshipDetails")}
            >
              <Image
                source={require("../../assets/images/scholarship.png")}
                style={styles.cardIcon}
              />
              <Text style={styles.cardText}>Scholarships</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallCard}
              onPress={() =>
                router.push("/DashboardScreens/DocumentsScreens/Document")
              }
            >
              <Image
                source={require("../../assets/images/Folders.png")}
                style={styles.cardIcon}
              />
              <Text style={styles.cardText}>My Documents</Text>
            </TouchableOpacity>
          </View>

          {/* RIGHT */}
          <TouchableOpacity
            style={styles.largeCard}
            onPress={() => router.push("/CertificationCourses")}
          >
            <Text style={styles.cardText}>Certificates</Text>
            <Text style={styles.cardSubText}>Courses</Text>

            <Image
              source={require("../../assets/images/Certification.png")}
              style={styles.largeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* LEAVE */}
        <TouchableOpacity
          style={styles.leaveCard}
          onPress={() => router.push("/LeaveRequestScreen")}
        >
          <Image
            source={require("../../assets/images/Leavechat.png")}
            style={{ width: wp("6%"), height: wp("6%") }}
          />
          <Text style={styles.leaveText}>Leave Request</Text>
        </TouchableOpacity>

        {/* PROGRESS */}
        <TouchableOpacity
          onPress={() =>
            router.push("/DashboardScreens/StudentProgressAcademic")
          }
        >
          <View style={styles.progressCard}>
            <Text style={styles.progressTitle}>Student Progress</Text>

            <View style={styles.divider} />

            <View style={styles.progressRow}>
              <View style={styles.progressCircle} />

              <View style={styles.progressStats}>
                <Text style={styles.statBlue}>● 88% Attendance</Text>
                <Text style={styles.statPurple}>● 73% 4th Semester</Text>
                <Text style={styles.statBlack}>● 60.8 C.G.P.A</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {/* ACCOUNT */}
        <TouchableOpacity
          style={styles.accountCard}
          onPress={() => router.push("./AccountDetails/AccountDetailsAcademic")}
        >
          <Ionicons name="person-outline" size={wp("5%")} color="red" />
          <Text style={styles.accountText}>Account Details</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* DRAWER */}
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
    fontWeight: "700",
    marginTop: hp("1%"),
    marginBottom: hp("2%"),
  },

  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("1%"),
  },

  leftColumn: {
    width: "50%",
  },

  smallCard: {
    backgroundColor: "#fff",
    borderRadius: wp("4%"),
    padding: wp("4%"),
    marginBottom: hp("2%"),
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    height: hp("8%"),
  },

  cardIcon: {
    width: wp("8%"),
    height: wp("8%"),
    marginRight: wp("3%"),
  },

  largeCard: {
    width: "46%",
    backgroundColor: "#fff",
    borderRadius: wp("4%"),
    padding: wp("5%"),
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    height: hp("20%"),
  },

  largeIcon: {
    width: wp("15%"),
    height: wp("15%"),
    marginTop: hp("1%"),
  },

  cardText: {
    fontSize: wp("4%"),
    textAlign: "center",
  },

  cardSubText: {
    fontSize: wp("3.5%"),
  },

  leaveCard: {
    backgroundColor: "#fff",
    borderRadius: wp("4%"),
    padding: wp("5%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("2%"),
    elevation: 3,
  },

  leaveText: {
    marginLeft: wp("3%"),
    fontSize: wp("4%"),
  },

  progressCard: {
    backgroundColor: "#fff",
    borderRadius: wp("4%"),
    padding: wp("5%"),
    marginBottom: hp("2%"),
    elevation: 3,
  },

  progressTitle: {
    fontWeight: "600",
    marginBottom: hp("1%"),
    fontSize: wp("4%"),
  },

  divider: {
    height: 1,
    backgroundColor: "#ECEEF6",
    marginVertical: hp("2%"),
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  progressCircle: {
    width: wp("22%"),
    height: wp("22%"),
    borderRadius: wp("11%"),
    borderWidth: 7,
    borderColor: "#4A63F3",
    marginRight: wp("5%"),
  },

  progressStats: {
    flex: 1,
  },

  statBlue: {
    color: "#2563eb",
    marginBottom: hp("0.5%"),
    fontSize: wp("3.8%"),
  },

  statPurple: {
    color: "#343D7E",
    marginBottom: hp("0.5%"),
    fontSize: wp("3.8%"),
  },

  statBlack: {
    color: "#000",
    fontSize: wp("3.8%"),
  },

  accountCard: {
    backgroundColor: "#fff",
    borderRadius: wp("4%"),
    padding: wp("5%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  accountText: {
    marginLeft: wp("3%"),
    fontSize: wp("4%"),
  },
});
