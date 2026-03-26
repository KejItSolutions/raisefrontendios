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

export default function PrivacyPolicyScreen() {
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

  const policies = [
    {
      title: "Data Privacy",
      desc: "This app collects location data only to ensure student safety and campus tracking.",
    },
    {
      title: "Data Storage",
      desc: "Location data is securely stored and retained only for a limited duration.",
    },
    {
      title: "User Responsibility",
      desc: "Users must ensure permissions are granted correctly for smooth functioning.",
    },
    {
      title: "Acceptance",
      desc: "By using this app, you agree to the college privacy policy and terms.",
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header openDrawer={openDrawer} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* TITLE */}
        <Text style={styles.pageTitle}>Privacy Policy & Terms</Text>

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
          {policies.map((item, index) => (
            <View key={index} style={styles.innerCard}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.text}>{item.desc}</Text>
            </View>
          ))}
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
    borderRadius: 22,
    padding: 14,

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    elevation: 3,
  },

  innerCard: {
    backgroundColor: "#EEF2FF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },

  title: {
    fontSize: width * 0.042,
    fontWeight: "700",
    marginBottom: 4,
    color: "#1E293B",
  },

  text: {
    fontSize: width * 0.036,
    color: "#6B7280",
    lineHeight: 20,
  },
});