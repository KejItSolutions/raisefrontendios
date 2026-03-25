import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Platform
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

export default function Notifications({ visible, onClose }) {

    const [activeTab, setActiveTab] = useState("all");

    const router = useRouter();

    const notifications = [
        {
            id: 1,
            icon: "book-open-variant",
            color: "#4259FA",
            bg: "rgba(66,89,250,0.22)",
            title: "New Assignment Posted",
            desc: "Data Structures - Assignment 3 is now available",
            time: "6h ago",
            unread: true
        },
        {
            id: 2,
            icon: "calendar",
            color: "#C23EFF",
            bg: "rgba(194,62,255,0.22)",
            title: "Upcoming Sem Exam",
            desc: "Database Systems final exam scheduled for Dec 15",
            time: "5h ago",
            unread: true
        },
        {
            id: 3,
            icon: "alarm",
            color: "#FF5B2E",
            bg: "rgba(255,91,46,0.22)",
            title: "Fee Payment Reminder",
            desc: "Semester fee payment due by November 30",
            time: "12h ago",
            unread: true
        },
        {
            id: 4,
            icon: "medal-outline",
            color: "#F2B705",
            bg: "rgba(242,183,5,0.22)",
            title: "Scholarship Approved",
            desc: "Your Merit Scholarship application has been approved",
            time: "2days ago",
            unread: false
        },
        {
            id: 5,
            icon: "credit-card-outline",
            color: "#4DA6FF",
            bg: "rgba(77,166,255,0.22)",
            title: "Payment Confirmed",
            desc: "Your tuition fee payment of ₹45,000 has been received",
            time: "3days ago",
            unread: false
        }
    ];

    const filtered =
        activeTab === "all"
            ? notifications
            : notifications.filter(n => n.unread);

    return (

        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
        >

            {/* Overlay */}
            <View style={styles.overlay}>

                {/* Bottom Sheet */}
                <SafeAreaView style={styles.sheet}>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Notifications</Text>

                        <TouchableOpacity
                            onPress={() => {
                                requestAnimationFrame(() => {
                                    router.back();
                                });
                            }}
                        >
                            <Feather name="x" size={hp("3%")} color="#111" />
                        </TouchableOpacity>
                    </View>

                    {/* Tabs */}
                    <View style={styles.tabOuter}>
                        <View style={styles.tabCard}>
                            <View style={styles.tabContainer}>

                                <TouchableOpacity
                                    style={[
                                        styles.tabButton,
                                        activeTab === "all" && styles.activeTab
                                    ]}
                                    onPress={() => setActiveTab("all")}
                                >
                                    <Text style={[
                                        styles.tabText,
                                        activeTab === "all" && styles.activeText
                                    ]}>
                                        All(5)
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.tabButton,
                                        activeTab === "unread" && styles.activeTab
                                    ]}
                                    onPress={() => setActiveTab("unread")}
                                >
                                    <Text style={[
                                        styles.tabText,
                                        activeTab === "unread" && styles.activeText
                                    ]}>
                                        Unread(3)
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>

                    {/* Mark all read */}
                    <TouchableOpacity>
                        <Text style={styles.markRead}>Mark all as read</Text>
                    </TouchableOpacity>

                    {/* Notification List */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: hp("3%") }}
                    >

                        {filtered.map((item, index) => (

                            <View key={item.id} style={[
                                styles.card,
                                {
                                    backgroundColor: item.unread
                                        ? "#EEF0FF"
                                        : "#FFFFFF"
                                }
                            ]}>

                                <View style={[
                                    styles.iconBox,
                                    { backgroundColor: item.bg }
                                ]}>
                                    <MaterialCommunityIcons
                                        name={item.icon}
                                        size={hp("2.6%")}
                                        color={item.color}
                                    />
                                </View>

                                <View style={{ flex: 1 }}>

                                    <View style={styles.titleRow}>
                                        <Text style={styles.title}>{item.title}</Text>
                                        {item.unread && <View style={styles.dot} />}
                                    </View>

                                    <Text style={styles.desc}>{item.desc}</Text>
                                    <Text style={styles.time}>{item.time}</Text>

                                </View>

                                {/* 👇 ADD DIVIDER AFTER 3rd ITEM */}
                                {index === 2 && <View style={styles.sectionDivider} />}

                            </View>

                        ))}

                    </ScrollView>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Clear all */}
                    <TouchableOpacity style={styles.clearBtn}>
                        <Feather name="trash-2" size={hp("2%")} color="#FF3B30" />
                        <Text style={styles.clearText}>Clear All Notification</Text>
                    </TouchableOpacity>

                </SafeAreaView>

            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({

    sectionDivider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: hp("1.5%"),
        marginHorizontal: wp("3%"),
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "flex-end",
        alignItems: "center",
    },

    sheet: {
        width: "92%",
        height: hp("88%"),
        alignSelf: "center",

        backgroundColor: "#fff",
        borderRadius: 25,

        padding: wp("5%"),
        marginBottom: hp("4.5%"),
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    headerTitle: {
        fontSize: hp("2.6%"),
        fontWeight: "600",
        color: "#111",
    },

    tabOuter: {
        alignItems: "center",
        marginTop: hp("2%"),
    },

    tabCard: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 10,

        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },

    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#EEF0FF",
        borderRadius: 12,
        padding: 6,
        justifyContent: "space-between",
    },

    tabButton: {
        flex: 1,                 // ✅ equal width buttons
        paddingVertical: hp("1%"),
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "#fff",
        marginHorizontal: 7,     // ✅ THIS gives spacing like image
    },

    activeTab: {
        backgroundColor: "#4259FA",
    },

    tabText: {
        color: "#4259FA",
        fontWeight: "600",
    },

    activeText: {
        color: "#fff",
    },

    markRead: {
        textAlign: "center",
        color: "#4259FA",
        marginTop: hp("2%"),
        marginBottom: hp("2%"),
    },

    card: {
        flexDirection: "row",
        padding: wp("4%"),
        borderRadius: 14,
        marginBottom: hp("1.5%"),
    },

    iconBox: {
        width: wp("10%"),
        height: wp("10%"),
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: wp("3%"),
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    title: {
        fontWeight: "700",
        fontSize: hp("2%"),
    },

    desc: {
        fontSize: hp("1.7%"),
        color: "#555",
        marginTop: 2,
    },

    time: {
        fontSize: hp("1.5%"),
        color: "#888",
        marginTop: 4,
    },

    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#4259FA",
        marginLeft: 6,
    },

    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginTop: hp("1%"),
    },

    clearBtn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("2%"),
    },

    clearText: {
        color: "#FF3B30",
        marginLeft: 8,
        fontWeight: "600",
    },

});