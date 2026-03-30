import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Animated,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";

export default function StudentProfile() {
  const [showCard, setShowCard] = useState(false);
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

  const [student] = useState({
    name: "Evan Yates",
    email: "evanyates@gmail.com",
    birthday: "Apr 12, 1995",
    registerNo: "R2012567",
    stream: "BCA",
    mobile: "6286597412",
    father: "John David",
    fatherMobile: "6287857875",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#DCE1F1" }}>
      <LinearGradient colors={["#EEF1F7", "#DCE1F1"]} style={styles.container}>
        {/* HEADER */}
        <Header openDrawer={openDrawer} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: hp("3%") }}
        >
          <Text style={styles.welcome}>Welcome back, {student.name}!</Text>
          <Text style={styles.title}>Student profile</Text>
          {/* STUDENT CARD */}
          <View style={styles.card}>
            <Image
              source={require("../../assets/images/watermark.png")}
              style={styles.watermark}
            />

            <View style={styles.profileTop}>
              <Image source={{ uri: student.avatar }} style={styles.avatar} />

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{student.name}</Text>
                <Text style={styles.email}>{student.email}</Text>
              </View>

              <Feather name="more-vertical" size={wp("5%")} />
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Birthday</Text>
                <Text style={styles.value}>{student.birthday}</Text>
              </View>

              <View>
                <Text style={styles.label}>Register No</Text>
                <Text style={styles.value}>{student.registerNo}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Stream</Text>
                <Text style={styles.value}>{student.stream}</Text>
              </View>

              <View>
                <Text style={styles.label}>Mobile No</Text>
                <Text style={styles.value}>{student.mobile}</Text>
              </View>
            </View>
          </View>
          {/* PARENT CARD */}
          <View style={styles.card}>
            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Parent (Father)</Text>
                <Text style={styles.value}>{student.father}</Text>
              </View>

              <View>
                <Text style={styles.label}>Mobile No</Text>
                <Text style={styles.value}>{student.fatherMobile}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => setShowCard(true)}>
              <LinearGradient
                colors={["#4A63F3", "#5B6CF5"]}
                style={styles.button}
              >
                <Feather name="credit-card" size={wp("4.5%")} color="#fff" />
                <Text style={styles.buttonText}>View Digital Card</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* DIGITAL CARD MODAL */}
      <Modal visible={showCard} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalOverlay}
          onPress={() => setShowCard(false)}
        >
          <View style={styles.digitalCard}>
            <View style={styles.digitalTop}>
              <Image
                source={require("../../assets/images/watermark.png")}
                style={styles.digitalWatermark}
              />

              <Image
                source={{ uri: student.avatar }}
                style={styles.digitalAvatar}
              />

              <Text style={styles.digitalName}>{student.name}</Text>
              <Text style={styles.digitalCourse}>{student.stream}</Text>
              <Text style={styles.digitalReg}>{student.registerNo}</Text>
            </View>

            <Text style={styles.validText}>Valid till Sept 2026</Text>

            <View style={styles.barcodeBox}>
              <View style={styles.barcode} />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* DRAWER */}
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
  container: {
    flex: 1,
    paddingHorizontal: wp("5%"),
    marginBottom: 0,
  },

  welcome: {
    marginTop: hp("2%"),
    fontSize: wp("4%"),
    color: "#7A7F9A",
  },

  title: {
    fontSize: wp("7%"),
    fontWeight: "700",
    marginTop: hp("0.5%"),
    color: "#0B132A",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: wp("5%"),
    padding: wp("5%"),
    marginTop: hp("2%"),
    elevation: 5,
  },

  profileTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: wp("14%"),
    height: wp("14%"),
    borderRadius: wp("7%"),
    marginRight: wp("3%"),
  },

  name: {
    fontSize: wp("4.2%"),
    fontWeight: "700",
  },

  email: {
    fontSize: wp("3.5%"),
    color: "#8A8FA3",
  },

  divider: {
    height: 1,
    backgroundColor: "#ECEEF6",
    marginVertical: hp("2%"),
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("2%"),
  },

  label: {
    fontSize: wp("3.5%"),
    color: "#9AA0B4",
    paddingRight: 12,
  },

  value: {
    fontSize: wp("4%"),
    fontWeight: "600",
    marginTop: 2,
  },

  button: {
    borderRadius: 12,
    paddingVertical: hp("1.8%"),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("1%"),
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: wp("2%"),
    fontSize: wp("3.8%"),
  },

  watermark: {
    position: "absolute",
    alignSelf: "center",
    top: hp("8%"),
    width: wp("60%"),
    height: hp("20%"),
    opacity: 0.15,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },

  digitalCard: {
    width: wp("85%"),
    backgroundColor: "#fff",
    borderRadius: wp("6%"),
    overflow: "hidden",
    elevation: 10,
  },

  digitalTop: {
    backgroundColor: "#E9EBF7",
    alignItems: "center",
    paddingVertical: hp("3%"),
  },

  digitalWatermark: {
    position: "absolute",
    width: wp("60%"),
    height: hp("20%"),
    opacity: 0.15,
    top: hp("4%"),
  },

  digitalAvatar: {
    width: wp("18%"),
    height: wp("18%"),
    borderRadius: wp("9%"),
    borderWidth: 3,
    borderColor: "#4A63F3",
  },

  digitalName: {
    marginTop: hp("1%"),
    fontSize: wp("4.5%"),
    fontWeight: "700",
  },

  digitalCourse: {
    fontSize: wp("3.5%"),
    color: "#666",
  },

  digitalReg: {
    fontSize: wp("3.5%"),
    color: "#777",
  },

  validText: {
    marginTop: hp("2%"),
    textAlign: "center",
    color: "#555",
  },

  barcodeBox: {
    marginTop: hp("2%"),
    marginBottom: hp("3%"),
    alignSelf: "center",
    backgroundColor: "#D9DCF5",
    borderRadius: 8,
    padding: wp("2%"),
  },

  barcode: {
    width: wp("45%"),
    height: hp("4%"),
    backgroundColor: "#4259FA",
  },
});
