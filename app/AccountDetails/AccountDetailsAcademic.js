import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Header from "../components/Header";
import DrawerMenu from "../components/DrawerMenu";

export default function AccountDetailsScreen() {

    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overall");

    // Drawer Menu State
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

    const overallFees = [
        {
            title: "Tuition fee",
            sub: "(2025-26)",
            amount: "₹7,000",
            status: "Paid",
            date: "17 Sep 2023",
            time: "10:34 AM",
        },
        {
            title: "Hostel Fee",
            sub: "(A345)",
            amount: "₹12,000",
            status: "Due",
            date: "17 Sep 2023",
            time: "By 10:34 AM",
        },
        {
            title: "Transport fee",
            sub: "(Monthly)",
            amount: "₹4,000",
            status: "Paid",
            date: "17 Sep 2023",
            time: "10:34 AM",
        },
        {
            title: "Supplementary Fee",
            sub: "Exam (Backlog)",
            amount: "₹3,000",
            status: "Due",
            date: "17 Sep 2023",
            time: "By 10:34 AM",
        },
        {
            title: "Certificate fee",
            sub: "Semester 01",
            amount: "₹4,000",
            status: "Paid",
            date: "17 Sep 2023",
            time: "10:34 AM",
        },
        {
            title: "Regular fee",
            sub: "Semester 01",
            amount: "₹80,000",
            status: "Paid",
            date: "17 Sep 2023",
            time: "10:34 AM",
        },
    ];

    const historyFees = [
        { title: "Regular fee", sub: "Semester 01", amount: "₹80,000", date: "17 Sep 2023" },
        { title: "Transport fee", sub: "Monthly", amount: "₹4,000", date: "17 Sep 2023" },
        { title: "Certificate fee", sub: "Semester 01", amount: "₹4,000", date: "17 Sep 2023" },
        { title: "Tuition fee", sub: "Semester 01", amount: "₹80,000", date: "17 Sep 2023" },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: "#eaeff9" }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#eaeff9" }}>
                <View style={{ flex: 1 }}>
                    <ScrollView
                        style={styles.container}
                        contentContainerStyle={{ paddingTop: 0 }}
                    >

                        {/* Header */}
                        <Header openDrawer={openDrawer} />

                        <Text style={styles.title}>Account Details</Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.back}>← Back to Dashboard</Text>
                        </TouchableOpacity>

                        <View style={styles.cardWrapper}>

                            <View style={styles.cardGlow} />

                            <BlurView intensity={60} tint="light" style={styles.cardShadow} />
                            <LinearGradient
                                colors={["#B9B7F3", "#9AA4F5", "#8FA7FF"]}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                style={styles.card}
                            >

                                <View style={styles.topRow}>
                                    <Text style={styles.student}>Student ID: R2012567</Text>

                                    <Image
                                        source={require("../../assets/images/NFC_icon.png")}
                                        style={styles.nfc}
                                    />
                                </View>

                                <View style={styles.chipContainer}>
                                    <Image
                                        source={require("../../assets/images/card_chip_icon.png")}
                                        style={styles.chip}
                                    />

                                    <View style={styles.eyeRow}>
                                        <Feather name="eye" size={16} color="#fff" />
                                        <Image
                                            source={require("../../assets/images/balance_on_card_hidden.png")}
                                            style={styles.maskImage}
                                        />
                                    </View>
                                </View>

                                <Image
                                    source={require("../../assets/images/Visa_logo.png")}
                                    style={styles.visa}
                                />

                                <Text style={styles.name}>Evan Yates</Text>
                                <Text style={styles.total}>Total Due: ₹17,000</Text>

                            </LinearGradient>
                        </View>

                        {/* tabs */}

                        <View style={styles.tabsOuter}>   {/* Layer 1 */}

                            <View style={styles.tabsInner}>   {/* Layer 2 */}

                                <View style={styles.tabs}>   {/* Layer 3 (your existing code) */}

                                    <TouchableOpacity
                                        style={[styles.tab, activeTab === "overall" && styles.activeTab]}
                                        onPress={() => setActiveTab("overall")}
                                    >
                                        <Text style={[styles.tabText, activeTab === "overall" && styles.activeText]}>
                                            Over All Fee
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.tab, activeTab === "history" && styles.activeTab]}
                                        onPress={() => setActiveTab("history")}
                                    >
                                        <Text style={[styles.tabText, activeTab === "history" && styles.activeText]}>
                                            History
                                        </Text>
                                    </TouchableOpacity>

                                </View>

                            </View>

                        </View>

                        {/* OVERALL LIST */}
                        {activeTab === "overall" &&
                            overallFees.map((item, index) => (
                                <View key={index} style={styles.feeCard}>

                                    {/* LEFT ICON */}
                                    <View style={styles.iconBox}>
                                        <Image
                                            source={require("../../assets/images/transaction_types_icons.png")}
                                            style={{ width: 22, height: 40 }}
                                        />
                                    </View>

                                    {/* CENTER TEXT */}
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.feeTitle}>{item.title}</Text>
                                        {item.sub && <Text style={styles.sub}>{item.sub}</Text>}

                                        <Text
                                            style={[
                                                styles.sub,
                                                item.status === "Due" && styles.dueDate
                                            ]}
                                        >
                                            Due Date
                                        </Text>

                                        <Text style={styles.sub}>Time</Text>
                                    </View>

                                    {/* RIGHT SIDE */}
                                    <View style={{ alignItems: "flex-end" }}>
                                        <Text style={styles.amount}>{item.amount}</Text>

                                        <View
                                            style={[
                                                styles.statusBadge,
                                                item.status === "Paid"
                                                    ? styles.paidBadge
                                                    : styles.dueBadge
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.statusText,
                                                    item.status === "Paid"
                                                        ? styles.paidText
                                                        : styles.dueText
                                                ]}
                                            >
                                                {item.status}
                                            </Text>
                                        </View>

                                        <Text
                                            style={[
                                                styles.sub,
                                                item.status === "Due" && styles.dueDate
                                            ]}
                                        >
                                            {item.date}
                                        </Text>

                                        <Text style={styles.sub}>{item.time}</Text>
                                    </View>

                                </View>
                            ))
                        }

                        {/* HISTORY LIST */}
                        {activeTab === "history" &&
                            historyFees.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.feeCard}
                                    onPress={() => router.push("/AccountDetails/AccountdetailsExam")}
                                >

                                    {/* LEFT ICON */}
                                    <View style={styles.iconBox}>
                                        <Image
                                            source={require("../../assets/images/transaction_types_icons.png")}
                                            style={{ width: 22, height: 40 }}
                                        />
                                    </View>

                                    {/* CENTER TEXT */}
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.feeTitle}>{item.title}</Text>
                                        <Text style={styles.sub}>{item.sub}</Text>

                                        <Text style={styles.sub}>Due Date</Text>
                                        <Text style={styles.sub}>ID:23453453322</Text>
                                    </View>

                                    {/* RIGHT SIDE */}
                                    <View style={{ alignItems: "flex-end" }}>
                                        <Text style={styles.amount}>{item.amount}</Text>

                                        {/* ALWAYS PAID IN HISTORY */}
                                        <View style={styles.paidBadge}>
                                            <Text style={styles.paidText}>Paid</Text>
                                        </View>

                                        <Text style={styles.sub}>{item.date}</Text>

                                        <Text style={styles.transaction}>
                                            View Transaction
                                        </Text>
                                    </View>

                                </TouchableOpacity>
                            ))
                        }

                    </ScrollView>

                    <DrawerMenu
                        drawerOpen={drawerOpen}
                        closeDrawer={closeDrawer}
                        drawerAnim={drawerAnim}
                        router={router}
                    />
                </View>
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#eaeff9",
        padding: wp("4%"),
    },

    tabsOuter: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
        marginBottom: 20,

        // shadow (iOS + Android)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },

    tabsInner: {
        backgroundColor: "#ebeef3",
        borderRadius: 16,
        padding: 10,
    },

    tabs: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        borderRadius: 14,
    },

    tab: {
        width: "45%",
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: 12,
        backgroundColor: "white"
    },

    activeTab: {
        backgroundColor: "#4A63F5",

        // subtle shadow like Figma
        shadowColor: "#4A63F5",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 3,
    },
    tabText: {
        color: "#6F7685",
        fontSize: wp("3.8%"),
        fontWeight: "500"
    },

    activeText: {
        color: "#fff",
        fontWeight: "600"
    },
    title: {
        fontSize: wp("5.5%"),
        fontWeight: "bold",
        marginTop: 0
    },

    back: {
        color: "#4A63F5",
        marginVertical: hp("1%"),
        fontSize: wp("4%")
    },

    activeTab: {
        backgroundColor: "#4A63F5"
    },

    activeText: {
        color: "#fff"
    },

    // OVERALL CARDS
    feeCard: {
        backgroundColor: "#fff",
        padding: wp("2.5%"),
        borderRadius: wp("4%"),
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp("1.8%"),

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,

        elevation: 3,
    },

    statusBadge: {
        paddingHorizontal: wp("3%"),
        borderRadius: wp("2%"),
        marginTop: hp("0.5%")
    },

    statusText: {
        fontSize: wp("3%"),
        fontWeight: "600"
    },

    paidBadge: {
        backgroundColor: "#CFF7E3",
        borderRadius: wp("2%"),
        marginTop: hp("0.5%"),
        paddingHorizontal: wp("3%"),
    },

    dueBadge: {
        backgroundColor: "#FFD6D6",
        borderRadius: wp("2%"),

    },

    paidText: {
        color: "#16A34A",
        fontSize: wp("3%"),
        fontWeight: "600",
        padding: wp("0.5%")
    },

    dueText: {
        color: "#DC2626",
        padding: wp("0.5%")
    },
    dueDate: {
        color: "#DC2626"
    },
    sub: {
        color: "#888",
        fontSize: wp("3.2%")
    },

    amount: {
        fontWeight: "bold",
        fontSize: wp("4%")
    },

    iconBox: {
        width: wp("12%"),
        height: hp("6%"),
        backgroundColor: "#DDE4FF",
        borderRadius: wp("2.5%"),
        alignItems: "center",
        justifyContent: "center",
        marginRight: wp("3%"),
        marginBottom: hp("2%"),
    },

    transaction: {
        color: "#888",
        fontSize: wp("3%"),
        marginTop: hp("0.5%")
    },

    // CARD
    cardWrapper: {
        alignItems: "center",
        marginTop: hp("2%"),
    },

    card: {
        width: wp("87%"),
        height: hp("24%"),
        borderRadius: wp("5%"),
        padding: wp("5%"),
        justifyContent: "space-between",
    },

    student: {
        color: "#fff",
        fontSize: wp("3.5%"),
        opacity: 0.85,
    },

    name: {
        color: "#fff",
        fontSize: wp("4.5%"),
        fontWeight: "600"
    },

    total: {
        color: "#fff",
        fontSize: wp("3.8%")
    },
    cardGlow: {
        position: "absolute",
        width: wp("87%"),
        height: hp("10%"),
        bottom: -hp("2%"),
        borderRadius: wp("50%"),
        backgroundColor: "#8FA7FF",
        opacity: 0.20,
        zIndex: -1,
        marginBottom: 11.5
    },

    cardShadow: {
        width: wp("75%"),
        height: hp("0%"),
        borderRadius: wp("5%"),
        padding: wp("0%"),
        justifyContent: "space-between",

        // 🔥 iOS soft shadow (like Figma)
        shadowColor: "#8FA7FF",
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.25,
        shadowRadius: 20,

        // Android
        elevation: 10,
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    chipContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    chip: {
        width: wp("10%"),
        height: hp("5%"),
        resizeMode: "contain"
    },

    eyeRow: {
        flexDirection: "row",
        alignItems: "center"
    },

    maskImage: {
        width: wp("18%"),
        height: hp("2.5%"),
        resizeMode: "contain",
        marginLeft: wp("1.5%")
    },

    visa: {
        position: "absolute",
        bottom: hp("2%"),
        right: wp("4%"),
        width: wp("18%"),
        height: hp("4%"),
        resizeMode: "contain"
    },

    nfc: {
        width: wp("5%"),
        height: wp("5%"),
        tintColor: "#fff"
    }
});