import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Header from "../../components/Header";
import DrawerMenu from "../../components/DrawerMenu";

export default function AccountDetailsScreen() {

    const insets = useSafeAreaInsets(); // ✅ iOS FIX

    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overall");

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

            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <ScrollView
                        style={styles.container}
                        contentContainerStyle={{ paddingTop: 0 }}
                    >

                        {/* Header */}
                        <Header openDrawer={openDrawer} />

                        <Text style={styles.title}>Account Details</Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.back}>
                                <Text style={styles.back}>
                                    ← Back to Dashboard
                                </Text>
                            </Text>
                        </TouchableOpacity>



                        {/* SUCCESS ICON */}
                        <View style={styles.successIconContainer}>
                            <Image
                                source={require("../../../assets/images/SuccessIcon.png")}
                                style={styles.successIcon}
                                resizeMode="contain"
                            />
                        </View>

                        {/* TEXT */}
                        <View style={{ alignItems: "center", marginTop: 10, height: 80, marginBottom: 10 }}>
                            <Text style={styles.title}>Payment Success!</Text>
                            <Text style={styles.sub}>Your payment was successful.</Text>
                        </View>

                        {/* DETAILS CARD */}
                        <View style={styles.detailCard}>

                            <View style={styles.row}>
                                <Text style={styles.label}>Amount</Text>
                                <Text style={styles.value}>₹80,000</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Status</Text>
                                <View style={styles.paidBadge}>
                                    <Text style={styles.paidText}>Success</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Transaction ID</Text>
                                <Text style={styles.value}>QWERTYUIOPASD</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Sender</Text>
                                <Text style={styles.value}>Faith Adeyemi</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Receiver</Text>
                                <Text style={styles.value}>Joy Amadi</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Payment Method</Text>
                                <Text style={styles.value}>Bank Transfer</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Payment Time</Text>
                                <Text style={styles.value}>May 27, 2025, 15:26:10</Text>
                            </View>

                        </View>

                        {/* BUTTONS */}
                        <TouchableOpacity style={styles.outlineBtn}>
                            <Text style={styles.outlineText}>Share Receipt</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.primaryBtn}>
                            <Text style={styles.primaryText}>Download Receipt</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            </SafeAreaView>

            <DrawerMenu
                drawerOpen={drawerOpen}
                closeDrawer={closeDrawer}
                drawerAnim={drawerAnim}
                router={router}
            />

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#eaeff9",
        padding: wp("4%"),
    },

    tabs: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: hp("2%"),
        backgroundColor: "#E8ECF5",
        borderRadius: wp("3.5%"),
        padding: wp("1.5%"),
    },

    tab: {
        width: "48%",   // ✅ FIXED
        paddingVertical: hp("1.6%"),
        alignItems: "center",
        borderRadius: wp("3%"),
    },

    title: {
        fontSize: wp("5.5%"),
        fontWeight: "bold",
        marginBottom: hp("1%"),
    },

    back: {
        color: "#4A63F5",
        marginVertical: 0,
        fontSize: wp("4%"),
    },

    activeTab: {
        backgroundColor: "#4A63F5"
    },

    activeText: {
        color: "#fff"
    },

    feeCard: {
        backgroundColor: "#fff",
        padding: wp("3.5%"),
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
        marginTop: hp("0.5%"),
    },

    statusText: {
        fontSize: wp("3%"),
        fontWeight: "600"
    },

    dueBadge: {
        backgroundColor: "#FFD6D6"
    },

    paidBadge: {
        backgroundColor: "#D1FAE5",
        paddingHorizontal: wp("3%"),
        paddingVertical: hp("0.5%"),
        borderRadius: wp("10%"),
    },

    paidText: {
        color: "#16A34A",
        fontSize: wp("3%"),
        fontWeight: "600"
    },

    dueText: {
        color: "#DC2626"
    },

    sub: {
        color: "#888",
        fontSize: wp("3.2%"),
    },

    amount: {
        fontWeight: "bold",
        fontSize: wp("4%"),
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
        marginTop: hp("0.5%"),
    },

    cardWrapper: {
        alignItems: "center",
        marginTop: hp("2%"),
    },

    card: {
        width: wp("75%"),
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

    cardShadow: {
        position: "absolute",
        bottom: -hp("2%"),
        width: wp("60%"),
        height: hp("5%"),
        borderRadius: wp("50%"),
        backgroundColor: "rgba(161, 179, 243, 0.35)"
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
        marginLeft: wp("1.5%"),
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
    },

    successIconContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp("5%"),
    },

    detailCard: {
        backgroundColor: "#fff",
        borderRadius: wp("5%"),
        padding: wp("5%"),
        marginTop: hp("2%"),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 3
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: hp("1.5%"),
    },

    label: {
        color: "#888",
        fontSize: wp("3.3%"),
    },

    value: {
        fontWeight: "500",
        fontSize: wp("3.8%"),
    },

    outlineBtn: {
        borderWidth: 1.5,
        borderColor: "#4A63F5",
        paddingVertical: hp("2%"),
        borderRadius: wp("4%"),
        alignItems: "center",
        marginTop: hp("3%"),
        marginLeft: hp("5%"),
        width: "74%",   // ✅ FIXED
    },

    outlineText: {
        color: "#4A63F5",
        fontWeight: "600",
        fontSize: wp("4%"),
    },

    primaryBtn: {
        backgroundColor: "#4A63F5",
        paddingVertical: hp("2%"),
        borderRadius: wp("4%"),
        alignItems: "center",
        marginTop: hp("1.5%"),
        marginLeft: hp("5%"),
        width: "75%",   // ✅ FIXED
    },

    primaryText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: wp("4%"),
    },

});