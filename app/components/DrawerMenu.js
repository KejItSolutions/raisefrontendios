import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DrawerMenu({ drawerOpen, closeDrawer, drawerAnim }) {
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", icon: "grid", route: "/DrawerMenu/Dashboard" },
    { name: "Academics", icon: "book-open", route: "/Academics" },
    { name: "Maps", icon: "map-pin", route: "/Maps" },
    { name: "Careers", icon: "target", route: "/DrawerMenu/Career" },
    { name: "Events", icon: "award", route: "/Events" },
    { name: "Sports & Athletics", icon: "activity", route: "/SportsAthletics" },
    { name: "Feedback", icon: "message-square", route: "/DrawerMenu/Feedback" },
  ];

  if (!drawerOpen) return null;

  return (
    <View style={styles.overlay}>
      {/* Click outside closes drawer */}
      <TouchableOpacity style={styles.overlayTouch} onPress={closeDrawer} />

      <Animated.View
        style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {/* Prevent closing when clicking inside */}
          <TouchableWithoutFeedback>
            <View style={{ flex: 1 }}>
              {/* HEADER */}
              <View style={styles.drawerHeader}>
                <Image
                  source={require("../../assets/images/Logo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.title}>Classroom</Text>
              </View>

              {/* MENU */}
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  activeOpacity={0.7}
                  onPress={() => {
                    router.replace(item.route);
                    closeDrawer();
                  }}
                >
                  <Feather name={item.icon} size={wp("5%")} color="#7B8190" />
                  <Text style={styles.menuText}>{item.name}</Text>
                </TouchableOpacity>
              ))}

              {/* LOGOUT */}
              <TouchableOpacity
                style={styles.logoutBtn}
                activeOpacity={0.8}
                onPress={() => router.push("/LoginScreen")}
              >
                <Feather name="log-out" size={wp("4.5%")} color="#fff" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    zIndex: 999,
  },

  overlayTouch: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  drawer: {
    width: wp("75%"), // better for iOS screens
    height: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: wp("5%"),
    position: "absolute",
    left: 0,
    top: 0,

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 2, height: 0 },

    // Android
    elevation: 10,
  },

  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("4%"),
  },

  logo: {
    height: hp("5%"),
    width: wp("10%"),
    marginRight: wp("3%"),
  },

  title: {
    fontSize: wp("4.5%"),
    fontWeight: "700",
    color: "#5266d6",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("1.8%"),
  },

  menuText: {
    marginLeft: wp("4%"),
    fontSize: wp("4%"),
    color: "#6F7685",
  },

  logoutBtn: {
    marginTop: hp("4%"),
    backgroundColor: "#4A63F3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp("1.8%"),
    borderRadius: 12,
  },

  logoutText: {
    color: "#fff",
    marginLeft: wp("2%"),
    fontWeight: "600",
    fontSize: wp("4%"),
  },
});
