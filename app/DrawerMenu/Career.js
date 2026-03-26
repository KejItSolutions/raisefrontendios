// ONLY small updates applied for iOS responsiveness

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Animated,
    Image,
    Modal,
    SafeAreaView,
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
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";

export default function CareerScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("placements");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState({});
  const [mailSent, setMailSent] = useState(false);

  //Drawer
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

  /* ---------- DATA ---------- */
  const placements = [
    {
      id: 1,
      company: "Google",
      role: "Software Developer",
      location: "Bengaluru",
      package: "4-5LPA",
      date: "Last date to apply 15 dec 2025",
      logo: require("../../assets/images/Image.png"),
    },
    {
      id: 2,
      company: "Amazon",
      role: "Devops Engineer",
      location: "Bengaluru",
      package: "4-5LPA",
      date: "Last date to apply 25 dec 2025",
      logo: require("../../assets/images/Image.png"),
    },
    {
      id: 3,
      company: "Flipkart",
      role: "UI/UX Designer",
      location: "Bengaluru",
      package: "4-5LPA",
      date: "Last date to apply 21 dec 2025",
      logo: require("../../assets/images/Image.png"),
    },
  ];

  const internships = [
    {
      id: 4,
      company: "Google",
      role: "Data Science Intern",
      location: "Bengaluru",
      stipend: "5k/month",
      duration: "3 months",
      date: "Last date to apply 15 dec 2025",
      logo: require("../../assets/images/Image.png"),
    },
    {
      id: 5,
      company: "Amazon",
      role: "Devops Engineer Intern",
      location: "Bengaluru",
      stipend: "5k/month",
      duration: "3 months",
      date: "Last date to apply 25 dec 2025",
      logo: require("../../assets/images/Image.png"),
    },
    {
      id: 6,
      company: "Flipkart",
      role: "UI/UX Designer Intern",
      location: "Bengaluru",
      stipend: "5k/month",
      duration: "3 months",
      date: "Last date to apply 21 dec 2025",
      logo: require("../../assets/images/Image.png"),
    },
  ];

  const jobs = activeTab === "placements" ? placements : internships;

  const openApplyModal = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const submitApplication = () => {
    if (!selectedJob) return;

    setAppliedJobs((prev) => ({
      ...prev,
      [selectedJob.id]: true,
    }));

    setModalVisible(false);

    setMailSent(true);

    setTimeout(() => {
      setMailSent(false);
    }, 2500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EEF1F7", margin: 20 }}>
      <Header openDrawer={openDrawer} />

      <Text style={styles.header}>Career</Text>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      {/* TABS */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "placements" && styles.activeTab]}
          onPress={() => setActiveTab("placements")}
        >
          <Text
            style={
              activeTab === "placements" ? styles.activeTabText : styles.tabText
            }
          >
            Placements
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "internships" && styles.activeTab]}
          onPress={() => setActiveTab("internships")}
        >
          <Text
            style={
              activeTab === "internships"
                ? styles.activeTabText
                : styles.tabText
            }
          >
            Internships
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "resume" && styles.activeTab]}
          onPress={() => setActiveTab("resume")}
        >
          <Text
            style={
              activeTab === "resume" ? styles.activeTabText : styles.tabText
            }
          >
            Resume AI
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* content */}
        {activeTab === "resume" ? (
          <View style={styles.resumeCard}>
            <View style={styles.resumeTitleRow}>
              <Image
                source={require("../../assets/images/streamline.png")}
                style={styles.streamline}
              />
              <Text style={styles.resumeTitle}>Resume AI</Text>
            </View>

            <Text style={styles.resumeSub}>
              Generate professional resume with AI
            </Text>

            <View style={styles.resumeInfo}>
              <Text style={styles.resumeInfoTitle}>
                Our AI will automatically fetch your data from your student
                profile.
              </Text>

              <Text style={styles.resumeBullet}>• Personal Information</Text>
              <Text style={styles.resumeBullet}>
                • Education & Academic Records
              </Text>
              <Text style={styles.resumeBullet}>• Skills & Technologies</Text>
              <Text style={styles.resumeBullet}>• Projects & Experience</Text>
              <Text style={styles.resumeBullet}>
                • Achievements & Certifications
              </Text>
            </View>

            <TouchableOpacity style={styles.generateBtn}>
              <Image
                source={require("../../assets/images/streamline.png")}
                style={styles.streamline}
              />
              <Text style={styles.generateText}>Generate and send Email</Text>
            </TouchableOpacity>
          </View>
        ) : (
          jobs.map((job) => {
            const isApplied = appliedJobs[job.id];

            return (
              <View key={job.id} style={styles.card}>
                <View style={styles.companyRow}>
                  <Image source={job.logo} style={styles.logo} />

                  <View>
                    <Text style={styles.company}>{job.company}</Text>
                    <Text style={styles.role}>{job.role}</Text>
                  </View>
                </View>

                <View style={styles.dateRow}>
                  <Feather name="calendar" size={16} color="#777" />
                  <Text style={styles.date}>{job.date}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.levelRow}>
                  <Text style={styles.levelText}>
                    {activeTab === "placements"
                      ? "Enter Level"
                      : `Duration: ${job.duration}`}
                  </Text>

                  <Image
                    source={require("../../assets/images/hugeicons_new-job.png")}
                    style={styles.levelIcon}
                  />
                </View>

                <View style={styles.footer}>
                  <View>
                    <Text style={styles.label}>Location</Text>
                    <Text style={styles.value}>{job.location}</Text>
                  </View>

                  <View>
                    <Text style={styles.label}>
                      {activeTab === "placements" ? "Package" : "Stipend"}
                    </Text>

                    <Text style={styles.value}>
                      {activeTab === "placements" ? job.package : job.stipend}
                    </Text>
                  </View>

                  {isApplied ? (
                    <View style={styles.appliedBtn}>
                      <Text style={{ color: "#fff", fontWeight: "600" }}>
                        Applied
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.applyBtn}
                      onPress={() => openApplyModal(job)}
                    >
                      <Text style={styles.applyText}>One Click Apply</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp("3%"),
          flexGrow: 1,
        }}
      ></ScrollView> */}

      {/* MAIL TOAST */}
      {mailSent && (
        <View style={styles.toast}>
          <Feather name="check-circle" size={18} color="#2ecc71" />
          <Text style={styles.toastText}>Mail Sent</Text>
        </View>
      )}

      {/* APPLY MODAL */}

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Apply For This Position</Text>

            <Text style={styles.modalRole}>{selectedJob?.role}</Text>

            <Text style={styles.modalLabel}>Attach Resume (PDF)</Text>

            <View style={styles.fileRow}>
              <TouchableOpacity style={styles.fileBtn}>
                <Text style={styles.fileBtnText}>Choose File</Text>
              </TouchableOpacity>

              <Text style={styles.fileName}>No File Chosen</Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Feather name="x-circle" size={18} color="#4A63F3" />
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={submitApplication}
              >
                <Feather name="arrow-right" size={18} color="#fff" />
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <DrawerMenu
        drawerOpen={drawerOpen}
        closeDrawer={closeDrawer}
        drawerAnim={drawerAnim}
      />
    </SafeAreaView>
  );
}

/* ---------- STYLES  ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF1F7",
    padding: wp("5%"),
  },

  header: {
    fontSize: wp("7%"),
    fontWeight: "600",
  },

  back: {
    color: "#4A63F3",
    marginTop: hp("1%"),
  },
  tab: {
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("4%"),
    alignItems: "center",
  },
  tabText: {
    color: "#777",
    fontSize: wp("3.5%"),
  },
  activeTab: {
    backgroundColor: "#4A63F3",
    borderRadius: 15,
  },

  activeTabText: {
    color: "#fff",
    fontSize: wp("3.5%"),
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#E9EBF3",
    borderRadius: 20,
    padding: 5,
    marginTop: hp("2%"),
    marginBottom: hp("2%"),
    justifyContent: "space-between",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: wp("4%"),
    marginBottom: hp("2%"),
    elevation: 4,
  },

  logo: {
    width: wp("10%"),
    height: wp("10%"),
    marginRight: wp("3%"),
  },
  company: {
    color: "#777",
  },

  role: {
    fontSize: wp("4.5%"),
    fontWeight: "600",
    marginBottom: 12,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  date: {
    marginLeft: 5,
    color: "#777",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },

  levelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  levelText: {
    fontWeight: "600",
  },

  levelIcon: {
    width: 24,
    height: 24,
  },
  toast: {
    position: "absolute",
    top: hp("7%"),
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    elevation: 6,
  },

  toastText: {
    marginLeft: 6,
    color: "#2ecc71",
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  label: {
    marginBottom: 5,
    fontSize: 12,
    color: "#777",
  },

  value: {
    fontWeight: "600",
  },

  applyBtn: {
    backgroundColor: "#4A63F3",
    paddingVertical: 12,
    marginTop: 3,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  applyText: {
    color: "#fff",
    fontSize: 12,
  },

  appliedBtn: {
    backgroundColor: "#27ae60",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: wp("80%"),
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: wp("6%"),
    elevation: 10,
  },

  modalTitle: {
    textAlign: "center",
    color: "#4A63F3",
    fontSize: 16,
  },

  modalRole: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },

  modalLabel: {
    fontSize: 16,
    marginBottom: 10,
  },

  fileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  fileBtn: {
    backgroundColor: "#4A63F3",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
  },

  fileBtnText: {
    color: "#fff",
  },

  fileName: {
    marginLeft: 10,
    color: "#888",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cancelBtn: {
    flexDirection: "row",
    alignItems: "center",
  },

  cancelText: {
    color: "#4A63F3",
    fontSize: 16,
    marginLeft: 6,
  },

  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A63F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 6,
  },
  resumeCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: wp("5%"),
    marginTop: hp("1%"),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  resumeTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  resumeTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "600",
    marginLeft: 8,
  },

  resumeSub: {
    color: "#6B7280",
    marginTop: 4,
    marginBottom: hp("2%"),
  },

  resumeInfo: {
    backgroundColor: "#EEF1F7",
    borderRadius: 15,
    padding: wp("4%"),
  },

  resumeInfoTitle: {
    fontSize: wp("3.5%"),
    marginBottom: hp("1%"),
  },

  resumeBullet: {
    fontSize: wp("3.5%"),
    marginBottom: hp("0.6%"),
    color: "#444",
  },

  generateBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("2%"),
    backgroundColor: "#4A63F3",
    paddingVertical: hp("1.8%"),
    borderRadius: 12,
  },

  generateText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: wp("3.8%"),
    marginLeft: 8,
  },
});
