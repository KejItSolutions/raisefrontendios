import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    ImageBackground,
    ScrollView,
    StyleSheet // ✅ ADDED (FIX)
    ,




    Text,
    TouchableOpacity,
    View
} from "react-native";

// ✅ FIXED FOR iOS (ONLY CHANGE)
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";

const { width, height } = Dimensions.get("window");

// ✅ Responsive scale
const scale = (size) => (width / 375) * size;

export default function App() {
  const [activeTab, setActiveTab] = useState("navigation");
  const [activeFilter, setActiveFilter] = useState("All Location");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showMainCard, setShowMainCard] = useState(true);

  const drawerAnim = useRef(new Animated.Value(-260)).current;
  const router = useRouter();

  const filters = [
    { label: "All Location", icon: "location-outline" },
    { label: "Academic", icon: "school-outline" },
    { label: "Facilities", icon: "home-outline" },
    { label: "Dining", icon: "restaurant-outline" },
  ];

  const places = [
    {
      title: "Main Building (Building A)",
      icon: "account-balance",
      color: "#4F6EF7",
      type: "MaterialIcons",
      category: "Academic",
      top: "35%",
      left: "40%",
    },
    {
      title: "Science Lab Complex",
      icon: "science",
      color: "#B76EF7",
      type: "MaterialIcons",
      category: "Academic",
      top: "15%",
      left: "60%",
    },
    {
      title: "Library & Learning Center",
      icon: "menu-book",
      color: "#4FBF9F",
      type: "MaterialIcons",
      category: "Facilities",
      top: "55%",
      left: "70%",
    },
    {
      title: "Cafeteria & Food Court",
      icon: "restaurant",
      color: "#F79E4F",
      type: "Ionicons",
      category: "Dining",
      top: "70%",
      left: "55%",
    },
    {
      title: "Sports Complex",
      icon: "fitness",
      color: "#F7C04F",
      type: "Ionicons",
      category: "Facilities",
      top: "80%",
      left: "20%",
    },
    {
      title: "Help Desk",
      icon: "support-agent",
      color: "#6EA8F7",
      type: "MaterialIcons",
      category: "Facilities",
      top: "10%",
      left: "15%",
    },
    {
      title: "Washrooms",
      icon: "wc",
      color: "#8F8F8F",
      type: "MaterialIcons",
      category: "Facilities",
      top: "25%",
      left: "25%",
    },
  ];

  const filteredPlaces =
    activeFilter === "All Location"
      ? places
      : places.filter((p) => p.category === activeFilter);

  return (
    <ScrollView style={styles.container}>
      <Header openDrawer={() => router.push("/Dashboard")} />

      <DrawerMenu
        drawerOpen={drawerOpen}
        closeDrawer={() => setDrawerOpen(false)}
        drawerAnim={drawerAnim}
        router={router}
      />

      <Text style={styles.title}>Map</Text>

      <TouchableOpacity style={styles.backRow} onPress={()=>router.back()}>
        <Ionicons name="arrow-back" size={scale(16)} color="#4F6EF7" />
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={activeTab === "navigation" ? styles.activeTab : styles.inactiveTab}
          onPress={() => setActiveTab("/DrawerMenu/MApsCampus")}
        >
          <Text style={styles.tabText(activeTab === "navigation")}>
            Campus Navigation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={activeTab === "tracking" ? styles.activeTab : styles.inactiveTab}
          onPress={() => router.push("/DrawerMenuScreens/MapStudentTracking")}
        >
          <Text style={styles.tabText(activeTab === "tracking")}>
            Student tracking
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {filters.map((item, index) => {
          const isActive = activeFilter === item.label;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setActiveFilter(item.label);
                setShowMainCard(true);
              }}
              style={isActive ? styles.filterActive : styles.filter}
            >
              <Ionicons
                name={item.icon}
                size={scale(12)}
                color={isActive ? "#fff" : "#4F6EF7"}
              />
              <Text style={styles.filterText(isActive)}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* MAP */}
      <View style={styles.map}>
        <ImageBackground
          source={require("../../assets/images/campus.png")}
          style={styles.mapImage}
          imageStyle={{ borderRadius: 16 }}
        >
          {filteredPlaces.map((item, i) => (
            <View key={i} style={[styles.mapPin, { top: item.top, left: item.left }]}>
              {item.type === "MaterialIcons" ? (
                <MaterialIcons name={item.icon} size={scale(14)} color={item.color} />
              ) : (
                <Ionicons name={item.icon} size={scale(14)} color={item.color} />
              )}
            </View>
          ))}

          <View style={styles.mapControls}>
            <Ionicons name="search" size={scale(18)} />
            <Ionicons name="add" size={scale(18)} />
            <Ionicons name="locate" size={scale(18)} />
          </View>
        </ImageBackground>
      </View>

      {/* MAIN CARD */}
      {showMainCard && activeFilter === "All Location" && (
        <View style={styles.card}>
          <View style={styles.cardIconBox}>
            <MaterialIcons name="account-balance" size={scale(20)} color="#4F6EF7" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Main Building (Building A)</Text>
            <Text style={styles.cardSub}>
              Administrative offices, Lecture halls 101-305
            </Text>

            <Text style={styles.cardSub}>📍 Main Campus</Text>
            <Text style={styles.cardSub}>📞 +1 (555) 123-4567</Text>
            <Text style={styles.cardSub}>📶 Free WiFi Available</Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Direction</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* LIST */}
      {filteredPlaces
        .filter((item) => {
          if (
            (activeFilter === "Facilities" || activeFilter === "Dining") &&
            item.title === "Main Building (Building A)"
          ) return false;

          return true;
        })
        .map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.listItem}
            onPress={() => {
              if (activeFilter === "All Location") {
                setShowMainCard(false);
              }
            }}
          >
            <View style={[styles.listIcon, { backgroundColor: item.color + "22" }]}>
              {item.type === "MaterialIcons" ? (
                <MaterialIcons name={item.icon} size={scale(16)} color={item.color} />
              ) : (
                <Ionicons name={item.icon} size={scale(16)} color={item.color} />
              )}
            </View>

            <View>
              <Text style={styles.listText}>{item.title}</Text>
              <Text style={styles.listSub}>Details about {item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
}

// ✅ ADDED (FIX)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FB", padding: scale(16) },
  title: { fontSize: scale(24), fontWeight: "700" },

  backRow: { flexDirection: "row", alignItems: "center", marginBottom: scale(10) },
  back: { color: "#4F6EF7", marginLeft: 6 },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#E9EBF5",
    borderRadius: 14,
    padding: 4,
    marginBottom: scale(12),
  },

  activeTab: { flex: 1, backgroundColor: "#4F6EF7", padding: scale(10), borderRadius: 12 },
  inactiveTab: { flex: 1, padding: scale(10) },

  tabText: (active) => ({
    color: active ? "#fff" : "#4F6EF7",
    textAlign: "center",
    fontSize: scale(12),
  }),

  filters: { flexDirection: "row", marginBottom: scale(12) },

  filter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: scale(8),
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 2,
  },

  filterActive: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: scale(8),
    backgroundColor: "#4F6EF7",
    borderRadius: 10,
    marginHorizontal: 2,
  },

  filterText: (active) => ({
    color: active ? "#fff" : "#4F6EF7",
    fontSize: scale(10),
    marginLeft: 4,
  }),

  map: {
    height: height * 0.4,
    borderRadius: 16,
    marginBottom: scale(16),
    overflow: "hidden",
  },

  mapImage: { flex: 1 },

  mapPin: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: scale(5),
    borderRadius: 20,
  },

  mapControls: {
    position: "absolute",
    right: 10,
    top: 60,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: scale(12),
    borderRadius: 16,
    marginBottom: scale(10),
    alignItems: "center",
  },

  cardIconBox: {
    backgroundColor: "#EEF1FF",
    padding: scale(8),
    borderRadius: 10,
    marginRight: 8,
  },

  cardTitle: { fontWeight: "700", fontSize: scale(13) },
  cardSub: { fontSize: scale(10), color: "#777" },

  button: {
    backgroundColor: "#4F6EF7",
    paddingHorizontal: scale(8),
    paddingVertical: scale(5),
    borderRadius: 8,
  },

  buttonText: { color: "#fff", fontSize: scale(10) },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: scale(10),
    borderRadius: 12,
    marginBottom: scale(8),
  },

  listIcon: { marginRight: 8, padding: scale(6), borderRadius: 8 },

  listText: { fontWeight: "600", fontSize: scale(12) },
  listSub: { fontSize: scale(10), color: "#777" },
});