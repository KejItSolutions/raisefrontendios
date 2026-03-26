import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

// DATA
const initialDigiLockerDocs = [
  { id: "1", title: "Aadhaar Card", status: "Available" },
  { id: "2", title: "PAN Card", status: "Available" },
  { id: "3", title: "10th Marks Card", status: "Available" },
  { id: "4", title: "12th Marks Card", status: "Available" },
];

const initialCertifications = [
  { id: "1", title: "UG Semester 01 Marks card" },
  { id: "2", title: "UG Semester 02 Marks card" },
  { id: "3", title: "UG Semester 03 Marks card" },
  { id: "4", title: "UG Semester 04 Marks card" },
  { id: "5", title: "UG Semester 05 Marks card" },
];

export default function DocumentUploads() {
  const router = useRouter();

  //DrawerMenu
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-260)).current;

  const [digiDocs] = useState(initialDigiLockerDocs);
  const [certDocs] = useState(initialCertifications);

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

  const renderDigiLockerItem = (item) => (
    <View key={item.id} style={styles.listItem}>
      <View style={styles.itemLeft}>
        <Ionicons name="checkmark-circle-outline" size={22} color="#00C853" />
        <View style={styles.textBox}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.status}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.iconBtn}>
        <Ionicons name="eye" size={18} color="#5C6BC0" />
      </TouchableOpacity>
    </View>
  );

  const renderCertItem = (item) => (
    <View key={item.id} style={styles.listItem}>
      <View style={styles.itemLeft}>
        <Ionicons name="document-text-outline" size={22} color="#5C6BC0" />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <TouchableOpacity style={styles.iconBtn}>
        <Feather name="download" size={18} color="#4259FA" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <DrawerMenu
        drawerOpen={drawerOpen}
        closeDrawer={closeDrawer}
        drawerAnim={drawerAnim}
        router={router}
      />

      <Header openDrawer={openDrawer} />

      {/* TITLE */}
      <View style={styles.headerSection}>
        <Text style={styles.pageTitle}>My Documents</Text>

        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Ionicons name="arrow-back" size={16} color="#5C6BC0" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Integrated with DigiLocker</Text>
            <Text style={styles.cardSub}>
              Access your official documents securely
            </Text>

            <TouchableOpacity style={styles.fetchBtn}>
              <Ionicons name="document-text" size={16} color="#FFF" />
              <Text style={styles.fetchText}>Fetch Documents</Text>
            </TouchableOpacity>
          </View>

          {/* DIGILOCKER */}
          <Text style={styles.section}>From DigiLocker</Text>
          {digiDocs.map(renderDigiLockerItem)}

          {/* CERTIFICATIONS */}
          <Text style={styles.section}>Results & Certifications</Text>
          {certDocs.map(renderCertItem)}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#EEF2FF",
  },

  container: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },

  headerSection: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  pageTitle: {
    fontSize: width * 0.06,
    fontWeight: "700",
    marginBottom: 6,
  },

  back: {
    flexDirection: "row",
    alignItems: "center",
  },

  backText: {
    marginLeft: 5,
    color: "#4259FA",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    // Android
    elevation: 3,
  },

  cardTitle: {
    fontWeight: "600",
    fontSize: 15,
  },

  cardSub: {
    fontSize: 13,
    color: "#777",
    marginVertical: 10,
  },

  fetchBtn: {
    backgroundColor: "#4259FA",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  fetchText: {
    color: "#FFF",
    marginLeft: 8,
    fontWeight: "600",
  },

  section: {
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 10,
  },

  listItem: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },

    elevation: 2,
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  textBox: {
    marginLeft: 10,
  },

  title: {
    fontWeight: "600",
    fontSize: 14,
  },

  subtitle: {
    fontSize: 12,
    color: "#888",
  },

  iconBtn: {
    padding: 8,
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
  },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#448AFF",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#448AFF",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },

    elevation: 5,
  },
});
