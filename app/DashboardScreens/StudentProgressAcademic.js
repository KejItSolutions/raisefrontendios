import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Animated,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const CircularProgress = ({ percentage, label, value }) => {
  const radius = 70;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (circumference * percentage) / 100;

  return (
    <View style={{ alignItems: "center" }}>
      <Svg width={wp("40%")} height={wp("40%")}>
        <Circle
          stroke="#E6E9F2"
          fill="none"
          cx={wp("20%")}
          cy={wp("20%")}
          r={radius}
          strokeWidth={strokeWidth}
        />

        <Circle
          stroke="#4A63F3"
          fill="none"
          cx={wp("20%")}
          cy={wp("20%")}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          rotation="-90"
          origin={`${wp("20%")},${wp("20%")}`}
        />
      </Svg>

      <View style={styles.circleText}>
        <Text style={styles.percent}>{value ? value : `${percentage}%`}</Text>
        <Text style={styles.circleLabel}>{label}</Text>
      </View>
    </View>
  );
};

export default function StudentProgressAcademic() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("attendance");

  const [semester, setSemester] = useState("Sem 01");
  const [showDropdown, setShowDropdown] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const nextMonth = () => {
    const next = new Date(currentDate);
    next.setMonth(month + 1);
    setCurrentDate(next);
  };

  const prevMonth = () => {
    const prev = new Date(currentDate);
    prev.setMonth(month - 1);
    setCurrentDate(prev);
  };

  const subjects = [
    { name: "Data Structures", marks: 88 },
    { name: "Theory Of Computation", marks: 78 },
    { name: "Cryptography", marks: 85 },
    { name: "System Programming", marks: 79 },
    { name: "Data Base Management", marks: 90 },
  ];

  const attendanceDays = [
    { day: 1, status: "present" },
    { day: 2, status: "absent" },
    { day: 3, status: "present" },
    { day: 4, status: "late" },
    { day: 7, status: "present" },
    { day: 8, status: "present" },
    { day: 9, status: "present" },
    { day: 10, status: "late" },
    { day: 11, status: "present" },
    { day: 14, status: "present" },
    { day: 15, status: "late" },
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let calendarDays = [];

  const firstDate = new Date(year, month, 1);
  let startDay = firstDate.getDay();

  for (let i = 0; i < startDay; i++) {
    calendarDays.push({ empty: true });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const record = attendanceDays.find((a) => a.day === d);

    calendarDays.push({
      day: d,
      status: record?.status,
    });
  }

  /* Drawer */
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EEF1F7", margin: 20 }}>
      <Header openDrawer={openDrawer} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp("3%"),
          flexGrow: 1,
        }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Student Progress</Text>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.back}>← Back to Dashboard</Text>
          </TouchableOpacity>
        </View>
        {/* TABS */}

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "attendance" && styles.activeTab]}
            onPress={() => setActiveTab("attendance")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "attendance" && styles.activeText,
              ]}
            >
              Attendance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "marks" && styles.activeTab]}
            onPress={() => setActiveTab("marks")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "marks" && styles.activeText,
              ]}
            >
              Marks Details
            </Text>
          </TouchableOpacity>
        </View>
        {/* ATTENDANCE TAB */}

        {activeTab === "attendance" && (
          <>
            <View style={styles.statsCard}>
              <View style={styles.statsHeader}>
                <View>
                  <Text style={styles.statsLabel}>Statistics</Text>
                  <Text style={styles.semesterTitle}>Semester 01</Text>
                </View>

                <View style={{ position: "relative" }}>
                  <TouchableOpacity
                    style={styles.semButton}
                    onPress={() => setShowDropdown(!showDropdown)}
                  >
                    <Text style={styles.semButtonText}>{semester}</Text>

                    <Feather
                      name={showDropdown ? "chevron-up" : "chevron-down"}
                      size={16}
                      color="#4A63F3"
                    />
                  </TouchableOpacity>

                  {showDropdown && (
                    <View style={styles.dropdownBox}>
                      {["Sem 01", "Sem 02", "Sem 03", "Sem 04"].map((item) => (
                        <TouchableOpacity
                          key={item}
                          style={styles.dropdownItem}
                          onPress={() => {
                            setSemester(item);
                            setShowDropdown(false);
                          }}
                        >
                          <Text style={styles.dropdownText}>{item}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.circleContainer}>
                <CircularProgress percentage={88} label="Attendance" />
              </View>

              <Text style={styles.overallText}>
                Over All 1st Semester Attendance
              </Text>
            </View>

            <Text style={styles.section}>Subject Attendance</Text>

            {subjects.map((item, index) => (
              <View key={index} style={styles.subjectCard}>
                <View style={styles.rowBetween}>
                  <Text style={styles.subjectName}>{item.name}</Text>
                  <Text style={styles.marks}>{item.marks}/100</Text>
                </View>

                <View style={styles.progressBar}>
                  <View
                    style={[styles.progressFill, { width: `${item.marks}%` }]}
                  />
                </View>
              </View>
            ))}

            {/* CALENDAR */}

            <View style={styles.calendarCard}>
              <TouchableOpacity style={styles.subjectButton}>
                <Text style={styles.subjectButtonText}>
                  Data Base Management
                </Text>
                <Feather name="chevron-down" size={18} color="#fff" />
              </TouchableOpacity>

              <View style={styles.divider} />

              <View style={styles.calendarHeader}>
                <TouchableOpacity onPress={prevMonth}>
                  <Feather name="arrow-left" size={24} color="#4259FA" />
                </TouchableOpacity>

                <Text style={styles.month}>
                  {monthName}, {year}
                </Text>

                <TouchableOpacity onPress={nextMonth}>
                  <Feather name="arrow-right" size={24} color="#4259FA" />
                </TouchableOpacity>
              </View>

              <View style={styles.weekRow}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (d, i) => (
                    <View key={i} style={styles.weekDay}>
                      <Text style={styles.weekText}>{d}</Text>
                    </View>
                  ),
                )}
              </View>

              <View style={styles.calendarGrid}>
                {calendarDays.map((item, index) => {
                  if (item.empty) {
                    return <View key={index} style={styles.dayCircleEmpty} />;
                  }

                  let color = "#D1D5DB";

                  if (item.status === "present") color = "#4CAF50";
                  if (item.status === "absent") color = "#EF4444";
                  if (item.status === "late") color = "#FBBF24";

                  return (
                    <View
                      key={index}
                      style={[styles.dayCircle, { backgroundColor: color }]}
                    >
                      <Text style={styles.dayText}>{item.day}</Text>
                    </View>
                  );
                })}
              </View>

              <View style={styles.divider} />

              <View style={styles.legend}>
                <View style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: "#4CAF50" }]} />
                  <Text style={styles.legendText}>Present</Text>
                </View>

                <View style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: "#EF4444" }]} />
                  <Text style={styles.legendText}>Absent</Text>
                </View>

                <View style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: "#FBBF24" }]} />
                  <Text style={styles.legendText}>Late</Text>
                </View>
              </View>
            </View>
          </>
        )}

        {/* MARKS TAB */}

        {activeTab === "marks" && (
          <>
            <View style={styles.statsCard}>
              <View style={styles.statsHeader}>
                <View>
                  <Text style={styles.statsLabel}>Statistics</Text>
                  <Text style={styles.semesterTitle}>Semester 01</Text>
                </View>

                <View style={{ position: "relative" }}>
                  <TouchableOpacity
                    style={styles.semButton}
                    onPress={() => setShowDropdown(!showDropdown)}
                  >
                    <Text style={styles.semButtonText}>{semester}</Text>

                    <Feather
                      name={showDropdown ? "chevron-up" : "chevron-down"}
                      size={16}
                      color="#4A63F3"
                    />
                  </TouchableOpacity>

                  {showDropdown && (
                    <View style={styles.dropdownBox}>
                      {["Sem 01", "Sem 02", "Sem 03", "Sem 04"].map((item) => (
                        <TouchableOpacity
                          key={item}
                          style={styles.dropdownItem}
                          onPress={() => {
                            setSemester(item);
                            setShowDropdown(false);
                          }}
                        >
                          <Text style={styles.dropdownText}>{item}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.circleContainer}>
                <CircularProgress percentage={88} value="8.8" label="CGPA" />

                <Text style={styles.cgpaText}>C.G.P.A</Text>
                <Text style={styles.creditText}>Credits Earned : 23 / 24</Text>
              </View>
            </View>
            <Text style={styles.section}>Subject Marks</Text>

            {subjects.map((item, index) => (
              <View key={index} style={styles.subjectCard}>
                <View style={styles.rowBetween}>
                  <View>
                    <Text style={styles.subjectName}>{item.name}</Text>
                    <Text style={{ fontSize: 12, color: "#8A8FA3" }}>
                      Semester 01 | Int:8 Ext:60
                    </Text>
                  </View>

                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.marks}>{item.marks}/100</Text>
                    <Text style={{ color: "#22C55E", fontSize: 12 }}>Pass</Text>
                  </View>
                </View>
              </View>
            ))}

            {/* CURRENT BACKLOGS */}

            <Text style={styles.section}>Current Backlogs</Text>

            <View style={styles.subjectCard}>
              <View style={styles.rowBetween}>
                <View>
                  <Text style={styles.subjectName}>No Backlogs</Text>
                  <Text style={{ fontSize: 12, color: "#8A8FA3" }}>
                    All subjects cleared
                  </Text>
                </View>

                <View>
                  <Text style={styles.marks}>00 / 07</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      {/* Drawer Menu */}
      <DrawerMenu
        drawerOpen={drawerOpen}
        closeDrawer={closeDrawer}
        drawerAnim={drawerAnim}
        router={router}
      />
    </SafeAreaView>
  );
}
{
  /* styles */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF1F7",
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 15,
  },

  back: {
    color: "#4A63F3",
    marginTop: 6,
  },

  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#E9EBF3",
    borderRadius: 20,
    padding: 5,
    marginTop: 15,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 15,
  },

  activeTab: {
    backgroundColor: "#4A63F3",
  },

  tabText: {
    color: "#8A8FA3",
  },

  activeText: {
    color: "#fff",
    fontWeight: "600",
  },

  statsCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
  },

  statsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statsLabel: {
    fontSize: 13,
    color: "#9AA0B4",
  },

  semesterTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#E6E9F2",
    marginVertical: 15,
  },

  semButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF1FF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },

  semButtonText: {
    color: "#4A63F3",
    marginRight: 5,
  },

  dropdownBox: {
    position: "absolute",
    top: 55,
    right: 0,
    width: 130,
    backgroundColor: "#EEF1FF",
    borderRadius: 18,
  },

  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 18,
  },

  dropdownText: {
    color: "#4A63F3",
  },

  circleContainer: {
    alignItems: "center",
    marginVertical: hp("2%"),
    paddingRight: 93,
  },

  circleText: {
    position: "absolute",
    alignItems: "center",
    top: "40%",
  },

  percent: {
    fontSize: 24,
    fontWeight: "700",
  },

  circleLabel: {
    color: "#6B7280",
  },

  overallText: {
    color: "#4A63F3",
  },

  section: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 15,
  },

  subjectCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  subjectName: {
    fontWeight: "500",
  },

  marks: {
    fontWeight: "600",
  },

  progressBar: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginTop: 8,
  },

  progressFill: {
    height: 6,
    backgroundColor: "#4A63F3",
    borderRadius: 4,
  },

  calendarCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
  },

  subjectButton: {
    backgroundColor: "#4A63F3",
    borderRadius: 30,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  subjectButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  month: {
    fontWeight: "600",
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  weekDay: {
    width: wp("10%"),
    backgroundColor: "#EEF1F7",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },

  weekText: {
    color: "#7B8190",
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
    marginTop: 10,
  },

  dayCircle: {
    width: wp("11%"),
    height: hp("10%"),
    aspectRatio: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  dayCircleEmpty: {
    width: wp("11%"),
    aspectRatio: 1,
  },

  dayText: {
    fontWeight: "600",
  },

  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  legendText: {
    color: "#6B7280",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  cgpaText: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },

  creditText: {
    textAlign: "center",
    color: "#7B8190",
  },
});
