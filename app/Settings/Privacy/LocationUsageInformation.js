import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import DrawerMenu from "../../components/DrawerMenu";
import Header from "../../components/Header";

const { width } = Dimensions.get("window");

export default function LocationUsageInformation() {
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-260)).current;

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
      toValue: -260,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setDrawerOpen(false));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={["#F4F6FF", "#E9EDFF"]} style={styles.container}>
        
        <Header openDrawer={openDrawer} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* TITLE */}
          <Text style={styles.pageTitle}>Location Usage</Text>

          {/* BACK */}
          <TouchableOpacity
            style={styles.backRow}
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={20}
              color="#4A6FFF"
            />
            <Text style={styles.backText}>Back to Settings</Text>
          </TouchableOpacity>

          {/* CARD */}
          <View style={styles.card}>
            
            {/* SECTION */}
            <View style={styles.sectionBox}>
              <Text style={styles.title}>When Tracking Starts</Text>
              <Text style={styles.text}>
                Location tracking starts automatically when the student logs in and grants permission.
              </Text>
              <Text style={styles.text}>
                Tracking is active during college-defined hours and when the app is running in the background.
              </Text>
            </View>

            {/* SECTION */}
            <View style={styles.sectionBox}>
              <Text style={styles.title}>What Data Is Collected</Text>

              <Text style={styles.text}>The app collects the following information:</Text>

              <View style={styles.bullets}>
                <Text style={styles.bullet}>• Current location (latitude & longitude)</Text>
                <Text style={styles.bullet}>• Campus zone or building (when inside campus)</Text>
                <Text style={styles.bullet}>• Entry and exit time from campus</Text>
                <Text style={styles.bullet}>• Last known location (if live tracking is unavailable)</Text>
              </View>

              <Text style={[styles.text, styles.bold]}>
                No audio, camera, or files are accessed.
              </Text>
            </View>

            {/* SECTION */}
            <View style={styles.sectionBox}>
              <Text style={styles.title}>Who Can See This Data</Text>

              <Text style={styles.text}>Location data is visible only to:</Text>

              <View style={styles.bullets}>
                <Text style={styles.bullet}>• The linked Parent</Text>
                <Text style={styles.bullet}>• Authorized college administrators (for safety)</Text>
              </View>

              <Text style={[styles.text, styles.bold]}>
                Location data is not shared with other students or third parties.
              </Text>
            </View>

            {/* FOOTER */}
            <Text style={styles.footer}>
              Location tracking is used only for safety and campus monitoring purposes and follows the college’s privacy guidelines.
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>

      <DrawerMenu
        drawerOpen={drawerOpen}
        closeDrawer={closeDrawer}
        drawerAnim={drawerAnim}
        router={router}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#EEF2FF",
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  pageTitle: {
    fontSize: width * 0.065,
    fontWeight: "700",
    marginTop: 10,
    color: "#1A1A1A",
  },

  backRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },

  backText: {
    marginLeft: 8,
    color: "#4A6FFF",
    fontWeight: "600",
    fontSize: width * 0.04,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 18,

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },

    // Android
    elevation: 3,
  },

  sectionBox: {
    backgroundColor: "#F4F7FF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
  },

  title: {
    fontSize: width * 0.042,
    fontWeight: "700",
    marginBottom: 6,
  },

  text: {
    fontSize: width * 0.036,
    color: "#4B5563",
    lineHeight: 20,
    marginBottom: 4,
  },

  bold: {
    fontWeight: "600",
    marginTop: 6,
  },

  bullets: {
    marginTop: 6,
    marginLeft: 4,
  },

  bullet: {
    fontSize: width * 0.034,
    color: "#6B7280",
    marginBottom: 4,
  },

  footer: {
    textAlign: "center",
    fontSize: width * 0.033,
    color: "#9CA3AF",
    marginTop: 10,
  },
});