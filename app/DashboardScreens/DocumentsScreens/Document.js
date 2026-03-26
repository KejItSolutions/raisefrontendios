import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // ADDED: Import the router
import { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DrawerMenu from "../../components/DrawerMenu";
import Header from "../../components/Header";
// 1. DYNAMIC DATA STRUCTURE
// You can easily replace this with data fetched from your backend
const initialData = [
  {
    id: "1",
    title: "Identification Documents",
    count: 2,
    total: 10,
    color: "#FFCA28", // Yellow folder
  },
  {
    id: "2",
    title: "Educational Documents",
    count: 8,
    total: 10,
    color: "#00E676", // Green folder
  },
  {
    id: "3",
    title: "Other Documents",
    count: 3,
    total: 3,
    color: "#29B6F6", // Blue folder
  },
  {
    id: "4",
    title: "Certifications",
    count: 7,
    total: 8,
    color: "#7E57C2", // Purple folder
  },
];

const Documents = () => {
  //DrawerMenu
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
  // State to hold your dynamic data
  const [documents, setDocuments] = useState(initialData);

  const router = useRouter(); // ADDED: Initialize the router

  // Example of how you would fetch from your backend later:
  /*
  useEffect(() => {
    fetch('https://your-api.com/documents')
      .then(response => response.json())
      .then(data => setDocuments(data))
      .catch(error => console.error(error));
  }, []);
  */

  const renderDocumentCard = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.7}
      onPress={() =>
        router.push("/DashboardScreens/DocumentsScreens/DocumentUploads")
      }
    >
      <MaterialCommunityIcons
        name="folder"
        size={45}
        color={item.color}
        style={styles.folderIcon}
      />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSubtitle}>
        {item.count}/{item.total}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* TOP HEADER */}
        <Header openDrawer={openDrawer} />

        {/* TITLE SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>My Documents</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={16} color="#5C6BC0" />
            <Text style={styles.backText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </View>

        {/* DYNAMIC LIST OF DOCUMENTS */}
        <FlatList
          data={documents}
          keyExtractor={(item) => item.id}
          renderItem={renderDocumentCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        />

        {/* FLOATING ACTION BUTTON */}
        <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
          <Ionicons name="add" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>
      <DrawerMenu
        drawerOpen={drawerOpen}
        closeDrawer={closeDrawer}
        drawerAnim={drawerAnim}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EEF2FF", // Light purple/blue background
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
  },
  titleSection: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E1E1E",
    marginBottom: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#4259FA",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },
  listContent: {
    paddingBottom: 80,
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    elevation: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  folderIcon: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0A1629",
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#91929E",
    fontWeight: "500",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#448AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#448AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default Documents;
