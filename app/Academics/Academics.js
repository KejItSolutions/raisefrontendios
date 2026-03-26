import { Animated, Dimensions } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Academics() {

    const router = useRouter();

    const [selectedDate, setSelectedDate] = useState("2020-09-18");
    const [activeTab, setActiveTab] = useState("timetable");
    const [drawerOpen, setDrawerOpen] = useState(false);

    // ✅ responsive drawer (instead of -300)
    const drawerWidth = SCREEN_WIDTH * 0.75;
    const drawerAnim = useState(new Animated.Value(-drawerWidth))[0];

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
            toValue: -drawerWidth,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setDrawerOpen(false));
    };

    const assignments = [
        {
            title: "Today’s assignment",
            subject: "Crypto currency",
            submit: "Today | 5:00 PM",
            duration: "4h"
        },
        {
            title: "Upcoming assignment",
            subject: "Data Structures",
            submit: "Tomorrow | 11:00 AM",
            duration: "6h"
        }
    ];

    return (

        // ✅ FIX 1: SafeArea for iOS
        <SafeAreaView style={{ flex: 1, backgroundColor: "#eaeff9" }}>

            <View style={{ flex: 1 }}>

                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: hp("5%") }} // ✅ remove bottom white space
                >

                    <Header openDrawer={openDrawer} />

                    <Text style={styles.title}>Academics</Text>

                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.back}>← Back</Text>
                    </TouchableOpacity>

                    {/* Tabs */}
                    <View style={styles.tabsOuter}>

                        <View style={styles.tabsInner}>

                            <TouchableOpacity
                                style={[
                                    styles.tab,
                                    activeTab === "timetable" && styles.activeTab
                                ]}
                                onPress={() => setActiveTab("timetable")}
                            >
                                <Text style={[
                                    styles.tabText,
                                    activeTab === "timetable" && styles.activeText
                                ]}>
                                    Time Table
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.tab,
                                    activeTab === "syllabus" && styles.activeTab
                                ]}
                                onPress={() => setActiveTab("syllabus")}
                            >
                                <Text style={[
                                    styles.tabText,
                                    activeTab === "syllabus" && styles.activeText
                                ]}>
                                    Syllabus
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.tab,
                                    activeTab === "exams" && styles.activeTab
                                ]}
                                onPress={() => setActiveTab("exams")}
                            >
                                <Text style={[
                                    styles.tabText,
                                    activeTab === "exams" && styles.activeText
                                ]}>
                                    Exams
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                    {/* ================= TIMETABLE ================= */}
                    {activeTab === "timetable" && (
                        <View style={styles.calendarCard}>

                            <Calendar
                                onDayPress={(day) => setSelectedDate(day.dateString)}
                                markedDates={{
                                    [selectedDate]: { selected: true, selectedColor: "#4A63F5" }
                                }}
                                theme={{
                                    todayTextColor: "#4A63F5",
                                    arrowColor: "#4A63F5",
                                }}
                                style={{
                                    borderRadius: 12
                                }}
                            />

                            <View style={styles.divider} />

                            <Text style={styles.dateTitle}>September 18, 2020</Text>
                            <Text style={styles.scheduleTitle}>Day’s Schedule</Text>

                            {/* Classes */}
                            {[
                                ["Data Structures", "Mrs Malathi", "9:00 to 10:00", "#C06CF3"],
                                ["Theory of Computation", "Mrs Helaria", "10:00 to 11:00", "#4A63F5"],
                                ["System Programming", "Mr Manjunath", "11:00 to 12:00", "#4A63F5"]
                            ].map((item, i) => (
                                <View key={i} style={styles.classCard}>
                                    <View style={[styles.bar, { backgroundColor: item[3] }]} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.className}>{item[0]}</Text>
                                        <Text style={styles.teacher}>{item[1]}</Text>
                                    </View>
                                    <Text style={styles.time}>{item[2]}</Text>
                                </View>
                            ))}

                        </View>
                    )}

                    {/* ================= SYLLABUS ================= */}
                    {activeTab === "syllabus" && (
                        <View>

                            <Text style={styles.sectionTitle}>Syllabus</Text>

                            {[
                                ["Data Structures", "C301 4 Credits"],
                                ["Theory of Computation", "C302 6 Credits"],
                                ["Cryptography", "C303 7 Credits"],
                                ["System Programming", "C304 9 Credits"],
                                ["Data Base Management", "C305 3 Credits"]
                            ].map((item, i) => (
                                <View key={i} style={styles.syllabusCard}>
                                    <View>
                                        <Text style={styles.subject}>{item[0]}</Text>
                                        <Text style={styles.subjectCode}>{item[1]}</Text>
                                    </View>
                                    <View style={styles.downloadIcon}>
                                        <Feather name="download" size={22} color="#22C55E" />
                                    </View>
                                </View>
                            ))}

                            {/* ================= ASSIGNMENTS ================= */}

                            <View style={styles.assignmentHeader}>
                                <Text style={styles.sectionTitle}>Assignments</Text>

                                <TouchableOpacity>
                                    <Text style={styles.viewAll}>View all →</Text>
                                </TouchableOpacity>
                            </View>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                                {assignments.map((item, index) => (
                                    <View key={index} style={styles.assignmentCard}>

                                        {/* Left colored bar */}
                                        <View style={styles.assignmentBar} />

                                        {/* Content */}
                                        <View style={{ flex: 1 }}>

                                            <Text style={styles.assignmentTitle}>{item.title}</Text>

                                            <Text style={styles.assignmentSubject}>{item.subject}</Text>

                                            <Text style={styles.submitText}>Submit by</Text>

                                            <Text style={styles.submitDate}>{item.submit}</Text>

                                        </View>

                                        {/* Right side */}
                                        <View style={{ alignItems: "flex-end" }}>

                                            <TouchableOpacity style={styles.viewBtn}>
                                                <Text style={{ color: "#fff" }}>View</Text>
                                            </TouchableOpacity>

                                            <View style={styles.timeBadge}>
                                                <Feather name="clock" size={14} color="#555" />
                                                <Text style={{ marginLeft: 5 }}>{item.duration}</Text>
                                            </View>

                                        </View>

                                    </View>
                                ))}

                            </ScrollView>

                        </View>
                    )}

                    {/* ================= EXAMS ================= */}
                    {activeTab === "exams" && (
                        <View style={styles.examCard}>

                            <View style={styles.examHeader}>
                                <Text style={styles.examHeaderText}>Subject</Text>
                                <Text style={styles.examHeaderText}>Date</Text>
                                <Text style={styles.examHeaderText}>Time</Text>
                            </View>

                            {[
                                ["Data Structure", "02 Sept 2026", "9:30 to 11:00"],
                                ["Theory Of Computation", "04 Sept 2026", "9:30 to 11:00"],
                                ["Cryptography", "07 Sept 2026", "9:30 to 11:00"],
                                ["System Programming", "12 Sept 2026", "9:30 to 11:00"],
                                ["DBMS", "15 Sept 2026", "9:30 to 11:00"]
                            ].map((item, i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.examRow,
                                        { backgroundColor: i % 2 === 0 ? "#ffffff" : "#F3F4F6" } // 👈 alternating colors
                                    ]}
                                >
                                    <Text style={styles.examSubject}>{item[0]}</Text>
                                    <Text style={styles.examDate}>{item[1]}</Text>
                                    <Text style={styles.examTime}>{item[2]}</Text>
                                </View>
                            ))}

                        </View>
                    )}

                </ScrollView>

                <DrawerMenu
                    drawerOpen={drawerOpen}
                    closeDrawer={closeDrawer}
                    drawerAnim={drawerAnim}
                />

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#eaeff9",
        paddingHorizontal: wp("4%"),
        paddingTop: Platform.OS === "ios" ? hp("1%") : 0,
    },

    title: {
        fontSize: wp("5.5%"),
        fontWeight: "bold",
    },

    back: {
        color: "#4A63F5",
        marginVertical: hp("1%"),
        fontSize: wp("3.5%"),
    },

    tabsOuter: {
        backgroundColor: "#F8FAFF",   // outer white layer
        padding: 12,
        borderRadius: 22,
        marginVertical: 15,

        // shadow for iOS
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },

        // shadow for Android
        elevation: 3,
    },

    tabsInner: {
        flexDirection: "row",
        backgroundColor: "#E9EDFF",   // inner light layer
        borderRadius: 18,
        padding: 10,
    },

    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 14,
    },

    activeTab: {
        backgroundColor: "#4A63F5",

        // floating effect
        shadowColor: "#4A63F5",
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },

    tabText: {
        color: "#4A63F5",
        fontWeight: "500",
    },

    activeText: {
        color: "#fff",
        fontWeight: "600",
    },
    calendarCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: wp("4%"),
    },

    divider: {
        height: 0.5,
        backgroundColor: "#E5E7EB",
        marginVertical: hp("1%"),
    },

    dateTitle: {
        marginTop: hp("2%"),
        fontWeight: "600",
        fontSize: wp("4%"),
    },

    scheduleTitle: {
        marginTop: hp("0.5%"),
        marginBottom: hp("1%"),
        color: "#555",
        fontSize: wp("3.5%"),
    },

    classCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EEF1FF",
        borderRadius: 12,
        padding: wp("3%"),
        marginBottom: hp("1%"),
    },

    bar: {
        width: 4,
        height: hp("5%"),
        borderRadius: 2,
        marginRight: wp("2%"),
    },

    className: {
        fontWeight: "600",
        fontSize: wp("3.8%"),
    },

    teacher: {
        color: "#777",
        fontSize: wp("3%"),
        marginTop: 10
    },

    time: {
        fontSize: wp("3%"),
        color: "#444",
    },

    sectionTitle: {
        fontSize: wp("5%"),
        fontWeight: "600",
        marginVertical: hp("2%"),
    },

    syllabusCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: wp("4%"),
        borderRadius: 14,
        marginBottom: hp("1.5%"),
    },

    subject: {
        fontWeight: "600",
        fontSize: wp("4%"),
    },

    subjectCode: {
        color: "#777",
        fontSize: wp("3%"),
        marginTop: 3,
    },

    downloadIcon: {
        width: wp("10%"),
        height: wp("10%"),
        backgroundColor: "#DCFCE7",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },


    viewAll: {
        color: "#4A63F5",
        fontSize: wp("3.5%"),
    },

    assignmentBar: {
        width: 4,
        height: hp("7%"),
        backgroundColor: "#ff93f1",
        borderRadius: 2,
        marginRight: wp("2%"),
    },

    assignmentTitle: {
        fontWeight: "600",
        fontSize: wp("3.5%"),
    },

    assignmentSubject: {
        fontSize: wp("4%"),
        marginVertical: 3,
    },

    submitText: {
        color: "#777",
        fontSize: wp("3%"),
    },

    submitDate: {
        fontSize: wp("3%"),
    },

    viewBtn: {
        backgroundColor: "#4A63F5",
        paddingHorizontal: wp("4%"),
        paddingVertical: hp("0.7%"),
        borderRadius: 10,
        marginBottom: hp("1%"),
    },

    timeBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EEF1FF",
        paddingHorizontal: wp("3%"),
        paddingVertical: hp("0.5%"),
        borderRadius: 10,
    },

    examCard: {
        backgroundColor: "#fff",
        borderRadius: 18,
        overflow: "hidden",
        marginTop: hp("2%"),
    },

    examHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#4A63F5",
        paddingVertical: hp("2%"),
        paddingHorizontal: wp("5%"),
    },

    examHeaderText: {
        color: "#fff",
        fontWeight: "600",
        width: "33%",
        fontSize: wp("3.5%"),
    },

    examRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: hp("2%"),
        paddingHorizontal: wp("5%"),
        borderBottomWidth: 1,
        borderBottomColor: "#EEF1FF",
        backgroundColor: "#F8FAFF",
    },

    examSubject: {
        width: "33%",
        fontSize: wp("3%"),
    },

    examDate: {
        width: "33%",
        fontSize: wp("3%"),
    },

    examTime: {
        width: "33%",
        fontSize: wp("3%"),
    },
    assignmentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: -1,
        marginBottom: 10,
    },

    viewAll: {
        color: "#4A63F5",
        fontSize: 14,
        fontWeight: "500",
    },

    assignmentCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 22,
        marginRight: 14,
        width: wp("80%"),
        height: wp("30%"),
        alignItems: "center",

        // iOS shadow
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },

        // Android shadow
        elevation: 3,
    },

    assignmentBar: {
        width: 4,
        height: 90,
        backgroundColor: "#4A63F5", // 🔥 blue like your image
        borderRadius: 3,
        marginRight: 12,
    },

    assignmentTitle: {
        fontWeight: "700",
        fontSize: 16,
        color: "#1F2937",
    },

    assignmentSubject: {
        fontSize: 16,
        marginVertical: 4,
        color: "#111827",
    },

    submitText: {
        color: "#6B7280",
        fontSize: 12,
    },

    submitDate: {
        fontSize: 13,
        color: "#374151",
    },

    viewBtn: {
        backgroundColor: "#4A63F5",
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 12,
        marginBottom: 10,

        // iOS shadow
        shadowColor: "#4A63F5",
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },

        // Android
        elevation: 3,
    },

    timeBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EEF1FF",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },

});