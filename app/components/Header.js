import { useRouter } from "expo-router";
import {
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Header = ({ openDrawer }) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={openDrawer}>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View style={styles.headerRight}>
        <TouchableOpacity onPress={() => router.push("/Notifications")}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#333"
            style={styles.headerIcon}
          />
        </TouchableOpacity>

        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />

        <Ionicons name="ellipsis-vertical" size={24} color="#333" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 30,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 30,
    marginBottom: 24,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 15,
  },
  headerLogo: {
    height: hp("6%"),
    width: wp("10%"),
  },
  avatar: {
    width: wp("8%"),
    height: wp("8%"),
    borderRadius: wp("4%"),
    marginRight: 15,
  },
});

export default Header;
