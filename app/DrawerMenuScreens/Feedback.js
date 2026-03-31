// ONLY minimal iOS + responsive fixes applied

import { useRef, useState } from "react";
import {
    Animated,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";

import { useRouter } from "expo-router";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function FeedbackScreen() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-260)).current;

  const [submitted, setSubmitted] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const categories = [
    "Academic",
    "Food",
    "Faculty",
    "Facilities",
    "Administration",
    "Other",
  ];

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

  const selectCategory = (item) => {
    setCategory(item);
    setDropdownOpen(false);
  };

  const handleSubmit = () => {
    if (!category || !message) {
      alert("Please fill all fields");
      return;
    }

    setSubmitted(true);
  };

  return (
    // ✅ FIXED SAFE AREA (important for iOS)
    <SafeAreaView style={{ flex: 1, backgroundColor: "#d6dfe0" }}>
      {/* ✅ FIXED SCROLLVIEW (no bottom gap) */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: hp("3%"),
        }}
      >
        <View style={styles.container}>
          <Header openDrawer={openDrawer} />

          <View style={styles.header}>
            <Text style={styles.headerTitle}>Feedback</Text>
          </View>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.back}>← Back</Text>
          </TouchableOpacity>

          {/* CARD */}
          <View style={styles.card}>
            {submitted ? (
              <View style={styles.successContainer}>
                <Image
                  source={require("../../assets/images/Illustration.png")}
                  style={styles.successImage}
                />

                <Text style={styles.successText}>
                  Feedback Submitted Successfully!
                </Text>

                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setSubmitted(false)}
                >
                  <Text style={styles.backButtonText}>Back</Text>
                  <Feather name="arrow-left" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Text style={styles.title}>Submit your feedback</Text>

                <Text style={styles.label}>Select Category</Text>

                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setDropdownOpen(!dropdownOpen)}
                >
                  <Text style={styles.dropdownText}>
                    {category ? category : "Select Category"}
                  </Text>

                  <Feather
                    name={dropdownOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>

                {dropdownOpen && (
                  <View style={styles.dropdownList}>
                    {categories.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.dropdownItem}
                        onPress={() => selectCategory(item)}
                      >
                        <Text style={styles.dropdownItemText}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                <Text style={styles.label}>Message</Text>

                <TextInput
                  style={styles.messageBox}
                  placeholder="Give reason"
                  placeholderTextColor="#8A8FA3"
                  value={message}
                  onChangeText={setMessage}
                  multiline
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Submit Feedback</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>

      <DrawerMenu
        drawerOpen={drawerOpen}
        closeDrawer={closeDrawer}
        drawerAnim={drawerAnim}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6dfe0",
    paddingHorizontal: wp("5%"),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("3%"),
  },

  headerTitle: {
    fontSize: wp("6%"),
    fontWeight: "600",
  },

  back: {
    color: "#4A63F3",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: wp("5%"),
    padding: wp("6%"),
    marginTop: hp("3%"),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  title: {
    fontSize: wp("4.5%"),
    fontWeight: "600",
    marginBottom: hp("2%"),
  },

  label: {
    fontSize: wp("3.8%"),
    marginBottom: hp("1%"),
    color: "#444",
  },

  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D3D6E0",
    borderRadius: wp("3%"),
    padding: wp("3%"),
    marginBottom: hp("1%"),
  },

  dropdownText: {
    fontSize: wp("3.8%"),
    color: "#333",
  },

  dropdownList: {
    borderWidth: 1,
    borderColor: "#D3D6E0",
    borderRadius: wp("3%"),
    marginBottom: hp("2%"),
  },

  dropdownItem: {
    padding: wp("3%"),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  dropdownItemText: {
    fontSize: wp("3.8%"),
  },

  messageBox: {
    borderWidth: 1,
    borderColor: "#D3D6E0",
    borderRadius: wp("3%"),
    height: hp("10%"),
    padding: wp("3%"),
    textAlignVertical: "top",
    marginBottom: hp("3%"),
  },

  button: {
    backgroundColor: "#3A4DE9",
    paddingVertical: hp("1.8%"),
    borderRadius: wp("3%"),
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: wp("4%"),
    fontWeight: "600",
  },

  /* SUCCESS SCREEN */

  successContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  successImage: {
    width: wp("60%"),
    height: hp("20%"),
    resizeMode: "contain",
    marginBottom: hp("2%"),
  },

  successText: {
    fontSize: wp("4.5%"),
    fontWeight: "600",
    marginBottom: hp("3%"),
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#3A4DE9",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("10%"),
    borderRadius: wp("3%"),
  },

  backButtonText: {
    color: "#fff",
    fontSize: wp("4%"),
    fontWeight: "600",
  },
});
