import { MaterialCommunityIcons } from "@expo/vector-icons";
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
  View,
} from "react-native";

import DrawerMenu from "../../components/DrawerMenu";
import Header from "../../components/Header";

const { width } = Dimensions.get("window");

export default function VisibilityRulesScreen() {
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

  const rules = {
    title: "Location Visibility",
    description:
      "Parents can view student location only during active tracking hours.",
    trackingHours: [
      "Monday to Friday: 8:30 AM – 6:00 PM",
      "Saturday: Limited tracking",
      "Sunday: Disabled",
    ],
    exceptions:
      "Location may be visible outside hours during emergency situations.",
    footer:
      "These rules are set by the college and cannot be modified by users.",
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header openDrawer={openDrawer} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* TITLE */}
        <Text style={styles.pageTitle}>Visibility Rules</Text>

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
          <View style={styles.innerCard}>
            <Text style={styles.title}>{rules.title}</Text>
            <Text style={styles.text}>{rules.description}</Text>

            {/* TRACKING HOURS */}
            <Text style={styles.label}>Tracking Hours</Text>
            <View style={styles.list}>
              {rules.trackingHours.map((item, index) => (
                <Text key={index} style={styles.listItem}>
                  • {item}
                </Text>
              ))}
            </View>

            {/* EXCEPTIONS */}
            <Text style={styles.label}>Exceptions</Text>
            <Text style={styles.text}>{rules.exceptions}</Text>

            {/* FOOTER */}
            <Text style={styles.footer}>{rules.footer}</Text>
          </View>
        </View>
      </ScrollView>

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
    backgroundColor: "#F3F5FF",
  },

  scrollContent: {
    paddingHorizontal: 16,
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
    fontSize: width * 0.04,
    color: "#4A6FFF",
    fontWeight: "500",
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 16,

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    // Android fallback
    elevation: 3,
  },

  innerCard: {
    backgroundColor: "#EEF2FF",
    borderRadius: 18,
    padding: 16,
  },

  title: {
    fontSize: width * 0.045,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1E293B",
  },

  text: {
    fontSize: width * 0.037,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 8,
  },

  label: {
    fontSize: width * 0.037,
    color: "#94A3B8",
    marginTop: 8,
    marginBottom: 4,
  },

  list: {
    marginBottom: 6,
  },

  listItem: {
    fontSize: width * 0.036,
    color: "#6B7280",
    lineHeight: 22,
  },

  footer: {
    marginTop: 12,
    fontSize: width * 0.036,
    fontWeight: "600",
    color: "#1E293B",
    lineHeight: 20,
  },
});