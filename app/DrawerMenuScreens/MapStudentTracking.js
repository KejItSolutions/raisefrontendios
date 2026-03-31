import { Feather, MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import Drawermenu from "../components/DrawerMenu";
import Header from "../components/Header";

export default function Maps() {

    const router = useRouter();
    const [activeTab, setActiveTab] = useState("tracking");
    const [chatOpen, setChatOpen] = useState(false);
    const [input, setInput] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerAnim = useRef(new Animated.Value(-300)).current;

    const [messages, setMessages] = useState([
        { text: "Leaving Campus now!", type: "received", time: "04:30 PM" },
    ]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessage = {
            text: input,
            type: "sent",
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        setMessages(prev => [...prev, newMessage]);
        setInput("");

        // Step 2: Auto flow like your UI
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                { text: "Okay!", type: "received", time: "Now" },
            ]);
        }, 1000);
    };

    let MapView = null;
    let Marker = null;

    if (Platform.OS !== "web") {
        const Maps = require("react-native-maps");
        MapView = Maps.default;
        Marker = Maps.Marker;
    }

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
            toValue: -wp('60%'),
            duration: 300,
            useNativeDriver: true,
        }).start(() => setDrawerOpen(false));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#EEF1F8" }}>
            <View style={styles.container}>

                {/* ✅ HEADER */}
                <Header openDrawer={openDrawer} />

                <Drawermenu
                    drawerOpen={drawerOpen}
                    closeDrawer={closeDrawer}
                    drawerAnim={drawerAnim}
                />

                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* TITLE */}
                    <Text style={styles.title}>Map</Text>

                    {/* BACK */}
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Feather name="arrow-left" size={20} color="#4A63F3" />
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>

                    {/* TOGGLE */}
                    <View style={styles.outerBox}>

                        <View style={styles.innerBox}>

                            {/* LEFT - Campus Navigation */}
                            <TouchableOpacity
                                style={[
                                    styles.inactiveBtn,
                                    activeTab === "navigation" && styles.activeBtn
                                ]}
                                onPress={() => router.push("/DrawerMenuScreens/MapsCampus")}
                            >
                                <Text
                                    style={
                                        activeTab === "navigation"
                                            ? styles.activeText
                                            : styles.inactiveText
                                    }
                                >
                                    Campus Navigation
                                </Text>
                            </TouchableOpacity>

                            {/* RIGHT - Student Tracking */}
                            <TouchableOpacity
                                style={[
                                    styles.inactiveBtn,
                                    activeTab === "tracking" && styles.activeBtn
                                ]}
                                onPress={() => setActiveTab("tracking")}
                            >
                                <Text
                                    style={
                                        activeTab === "tracking"
                                            ? styles.activeText
                                            : styles.inactiveText
                                    }
                                >
                                    Student tracking
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                    {activeTab === "tracking" && (

                        <>
                            {/* BUTTONS */}
                            <View style={styles.topBtns}>

                                <TouchableOpacity style={styles.smallBtn}>
                                    <Text style={styles.smallBtnText}>🔄 Switch to dark</Text>
                                </TouchableOpacity>

                                <View style={styles.liveSignal}>
                                    <View style={styles.dot} />
                                    <Text style={styles.liveText}>Live Signal</Text>
                                </View>

                            </View>

                            {/* MAP */}
                            <View style={styles.mapContainer}>
                                {Platform.OS === "web" ? (
                                    <WebView
                                        style={{ flex: 1 }}
                                        source={{
                                            uri: "https://www.google.com/maps?q=17.385,78.4867&z=15&output=embed",
                                        }}
                                    />
                                ) : (
                                    MapView && (
                                        <MapView
                                            style={{ flex: 1 }}
                                            initialRegion={{
                                                latitude: 17.385,
                                                longitude: 78.4867,
                                                latitudeDelta: 0.05,
                                                longitudeDelta: 0.05,
                                            }}
                                        >
                                            <Marker coordinate={{ latitude: 17.385, longitude: 78.4867 }} />
                                        </MapView>
                                    )
                                )}
                            </View>

                            {/* STUDENT CARD */}

                            <View style={styles.card}>

                                {/* TOP */}
                                <View style={styles.cardTop}>
                                    <View style={styles.avatarWrapper}>
                                        <Image
                                            source={{ uri: "https://i.pravatar.cc/100" }}
                                            style={styles.avatar}
                                        />
                                    </View>

                                    <View>
                                        <Text style={styles.name}>Evan Yates</Text>
                                        <Text style={styles.id}>R2012567</Text>
                                        <Text style={styles.active}>● Active Now</Text>
                                    </View>
                                </View>

                                <View style={styles.divider} />

                                {/* BOTTOM */}
                                <View style={styles.cardBottom}>

                                    <View style={styles.zoneBox}>
                                        <Text style={styles.zoneTitle}>Current Zone</Text>
                                        <View style={styles.zoneRow}>
                                            <Ionicons name="location-outline" size={18} color="#4A63F3" />
                                            <Text style={styles.zoneText}>Main Building (Building A)</Text>
                                        </View>                        </View>

                                    <TouchableOpacity
                                        style={styles.chatBtn}
                                        onPress={() => setChatOpen(true)}
                                    >
                                        <Text style={styles.chatText}>💬 Chat</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>


                            {/* LOCATION HISTORY */}
                            <View style={styles.historyCard}>

                                {/* Header */}
                                <View style={styles.historyHeader}>
                                    <MaterialIcons name="history" size={22} color="#4A63F3" />
                                    <Text style={styles.historyTitle}>Location History</Text>
                                </View>

                                {/* Timeline */}
                                <View style={styles.timelineContainer}>

                                    {/* Vertical Line */}
                                    <View style={styles.verticalLine} />

                                    {[
                                        { coord: "89.1, 78.3", time: "10:50" },
                                        { coord: "87.4, 82.3", time: "10:40" },
                                        { coord: "71.3, 81.3", time: "10:20" },
                                        { coord: "71.0, 85.0", time: "09:50" },
                                        { coord: "69.1, 78.3", time: "09:35" },
                                        { coord: "67.6, 57.8", time: "09:10" },
                                    ].map((item, index) => (

                                        <View key={index} style={styles.timelineRow}>

                                            {/* Circle */}
                                            <View style={styles.timelineCircle} />

                                            {/* Content */}
                                            <View style={styles.timelineContent}>
                                                <Text style={styles.coordText}>
                                                    Coordinates: {item.coord}
                                                </Text>

                                                <View style={styles.timeRow}>
                                                    <Feather name="clock" size={14} color="#9CA3AF" />
                                                    <Text style={styles.timeText}>{item.time}</Text>

                                                    <Text style={styles.dotBlue}>•</Text>

                                                    <Text style={styles.moving}>Moving</Text>
                                                </View>
                                            </View>

                                        </View>
                                    ))}

                                    {/* Start */}
                                    <View style={styles.startRow}>
                                        <View style={styles.startDot} />
                                        <Text style={styles.start}>Start of tracking session</Text>
                                    </View>

                                </View>
                            </View>

                            {/* SHARE BUTTON */}
                            <TouchableOpacity style={styles.shareBtn}>
                                <Feather name="share-2" size={20} color="#4A63F3" />
                                <Text style={styles.shareText}>Share Live Link</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {chatOpen && (
                        <View style={styles.overlay}>

                            {/* Background click */}
                            <TouchableOpacity
                                style={styles.overlayBg}
                                onPress={() => setChatOpen(false)}
                            />

                            {/* Chat Box */}
                            <View style={styles.chatModal}>

                                {/* 🔵 HEADER */}
                                <View style={styles.chatHeader}>
                                    <View style={styles.headerLeft}>
                                        <Image
                                            source={{ uri: "https://i.pravatar.cc/100" }}
                                            style={styles.chatAvatar}
                                        />

                                        <View>
                                            <Text style={styles.chatName}>Evan Yates</Text>

                                            <View style={styles.onlineRow}>
                                                <View style={styles.onlineDot} />
                                                <Text style={styles.onlineText}>Online</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <TouchableOpacity onPress={() => setChatOpen(false)}>
                                        <Text style={styles.closeBtn}>✕</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* 🔵 MESSAGE */}
                                <View style={styles.chatBody}>

                                    {messages.map((msg, index) => (

                                        <View key={index} style={{ marginBottom: hp("1.5%") }}>

                                            {/* MESSAGE ROW */}
                                            <View
                                                style={[
                                                    styles.messageRow,
                                                    msg.type === "sent"
                                                        ? { justifyContent: "flex-end" }
                                                        : { justifyContent: "flex-start" }
                                                ]}
                                            >

                                                <View
                                                    style={[
                                                        styles.messageBubble,
                                                        msg.type === "sent"
                                                            ? styles.sentBubble
                                                            : styles.receivedBubble
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.messageText,
                                                            msg.type === "sent" && { color: "#fff" }
                                                        ]}
                                                    >
                                                        {msg.text}
                                                    </Text>
                                                </View>

                                            </View>

                                            {/* ✅ TIME (separate but aligned) */}
                                            <Text
                                                style={[
                                                    styles.timeStamp,
                                                    msg.type === "sent"
                                                        ? { alignSelf: "flex-end", marginRight: wp("3%") }
                                                        : { alignSelf: "flex-start", marginLeft: wp("3%") }
                                                ]}
                                            >
                                                {msg.time}
                                            </Text>

                                        </View>

                                    ))}

                                </View>

                                {/* 🔵 SUGGESTIONS */}
                                <View style={styles.suggestionContainer}>

                                    <View style={styles.suggestionRow}>
                                        <TouchableOpacity style={styles.suggestionBtn}>
                                            <Text style={styles.suggestionText}>Where are you?</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.suggestionBtn}>
                                            <Text style={styles.suggestionText}>Are you safe?</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.suggestionBtn}>
                                            <Text style={styles.suggestionText}>Call me</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                                {/* 🔵 INPUT */}
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder="Type a message..."
                                        placeholderTextColor="#9CA3AF"
                                        style={styles.inputPlaceholder}
                                        value={input}                //  connect state
                                        onChangeText={setInput}      // update state
                                    />

                                    <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                                        <Feather name="send" size={18} color="#fff" />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    )}

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#EEF1F8",
        paddingHorizontal: wp('4%'),
    },

    title: {
        fontSize: hp('2.6%'),
        fontWeight: "700",
        marginBottom: hp('0.5%'),
    },

    backBtn: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },

    backText: {
        marginLeft: wp('1%'),
        color: "#4A63F3",
        fontSize: hp('2%'),
    },

    outerBox: {
        backgroundColor: "#F8F9FC",
        padding: wp('2%'),
        borderRadius: wp('4%'),
        marginBottom: hp('2%'),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },

    innerBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#E9ECF5",
        padding: wp('1.5%'),
        borderRadius: wp('3%'),
    },

    inactiveBtn: {
        backgroundColor: "#fff",
        paddingVertical: hp('1.2%'),
        paddingHorizontal: wp('4%'),
        borderRadius: wp('3%'),
        marginStart: 20

    },

    activeBtn: {
        backgroundColor: "#4A63F3",
        paddingVertical: hp('1.2%'),
        paddingHorizontal: wp('4%'),
        borderRadius: wp('3%'),
        marginEnd: 20

    },
    inactiveText: {
        color: "#4A63F3",
        fontWeight: "500",
    },

    activeText: {
        color: "#fff",
        fontWeight: "600",
    },
    topBtns: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        gap: wp('3%'),
        marginBottom: hp('2%'),
    },

    smallBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: hp('1.2%'),
        paddingHorizontal: wp('4%'),
        borderRadius: wp('3%'),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },

    smallBtnText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
    },

    liveSignal: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#A5D6B4",
        paddingVertical: hp('1.2%'),
        paddingHorizontal: wp('4%'),
        borderRadius: wp('3%'),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },

    dot: {
        width: 8,
        height: 8,
        backgroundColor: "#00C853",
        borderRadius: 4,
        marginRight: 6,
    },

    liveText: {
        color: "#0B8F3C",
        fontWeight: "600",
    },

    mapContainer: {
        height: hp('45%'),
        borderRadius: wp('4%'),
        overflow: "hidden",
        marginBottom: hp('2%'),
    },

    map: {
        flex: 1,
    },


    card: {
        backgroundColor: "#fff",
        padding: wp('2%'),
        borderRadius: wp('5%'),
        marginBottom: hp('2%'),
    },

    cardTop: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatarWrapper: {
        borderWidth: 2,
        borderColor: "#4A63F3",
        borderRadius: wp('8%'),
        padding: wp('1%'),
        marginRight: wp('3%'),
    },

    avatar: {
        width: wp('12%'),
        height: wp('12%'),
        borderRadius: wp('6%'),
    },

    name: {
        fontSize: hp('2%'),
        fontWeight: "700",
        marginTop: hp('0.5%')
    },

    id: {
        color: "#8A8F9C",
        fontSize: hp('1.8%'),
        marginTop: hp(" 1%")

    },

    active: {
        color: "#00C853",
        fontSize: hp('1.6%'),
        marginTop: hp('0.3%'),
    },

    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: hp('1.5%'),
    },

    cardBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    zoneBox: {
        backgroundColor: "#EEF1FF",
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('4%'),
        borderRadius: wp('4%'),
        width: wp('55%'),
    },

    zoneTitle: {
        color: "#555",
        fontSize: hp('1.7%'),
        marginBottom: hp('0.5%'),
    },
    zoneRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: wp('1%'), // spacing between icon & text
    },

    zoneText: {
        color: "#4A63F3",
        fontWeight: "500",
        fontSize: hp('1.5%'),
    },

    chatBtn: {
        backgroundColor: "#4A63F3",
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('5%'),
        borderRadius: wp('3%'),
        marginEnd: 20,

        shadowColor: "#4A63F3",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },

    chatText: {
        color: "#fff",
        fontWeight: "600",
    },

    historyCard: {
        backgroundColor: "#fff",
        paddingTop: hp("2%"),
        paddingBottom: hp("2%"),
        paddingHorizontal: wp("5%"),
        borderRadius: wp("5%"),
        marginBottom: hp("2%"),
    },

    historyHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp("2%"),
    },

    historyTitle: {
        color: "#4A63F3",
        fontWeight: "600",
        fontSize: hp("2.2%"),
        marginLeft: wp("2%"),
    },

    timelineContainer: {
        position: "relative",
        paddingLeft: wp("4%"),
    },

    verticalLine: {
        position: "absolute",
        left: wp("2.5%"),
        top: hp("1%"),
        bottom: hp("0%"),   // 🔥 increase this (important)
        borderLeftWidth: 2,
        borderStyle: "dashed",
        borderColor: "#4A63F3",
    },

    timelineRow: {
        flexDirection: "row",
        marginBottom: hp("2.2%"),
        position: "relative",
    },

    timelineCircle: {
        width: wp("4%"),
        height: wp("4%"),
        borderRadius: wp("2%"),
        borderWidth: 2,
        borderColor: "#4A63F3",
        backgroundColor: "#fff",
        position: "absolute",

        left: wp("-3.3%"),   // center minus radius
        top: hp("0.3%"),
    },

    timelineContent: {
        marginLeft: wp("7%"),         // reduced from 8%
    },
    coordText: {
        fontWeight: "600",
        fontSize: hp("2%"),
        color: "#111827",
    },

    timeRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp("0.4%"),
    },

    timeText: {
        color: "#9CA3AF",
        fontSize: hp("1.8%"),
        marginLeft: wp("1%"),
    },

    dotBlue: {
        color: "#4A63F3",
        fontSize: hp("3%"),
        marginLeft: wp("2%"),
        marginRight: wp("2%"),
    },

    moving: {
        color: "#4A63F3",
        fontSize: hp("1.8%"),
        fontWeight: "500",
    },

    startRow: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        marginTop: hp("0.5%"),
    },

    startDot: {
        width: wp("4%"),
        height: wp("4%"),
        borderRadius: wp("2%"),
        backgroundColor: "#D1D5DB",
        position: "absolute",

        left: wp("-3.3%"),
    },

    start: {
        marginLeft: wp("6%"),
        color: "#9CA3AF",
        fontStyle: "italic",
        fontSize: hp("1.8%"),
    },
    shareBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "#F5F6FA",   // light grey like design
        paddingVertical: hp("2%"),
        borderRadius: wp("6%"),       // pill shape

        marginBottom: hp("4%"),

        // shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },

    shareText: {
        color: "#4A63F3",
        fontSize: hp("2%"),
        fontWeight: "400",
        marginLeft: wp("2%"),
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 750,
        justifyContent: "center",
        alignItems: "center",
    },

    overlayBg: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.2)",
    },

    chatModal: {
        width: wp("92%"),
        height: hp("65%"),
        backgroundColor: "#EEF1F8",
        borderRadius: wp("5%"),
        overflow: "hidden",
    },

    /* HEADER */
    chatHeader: {
        backgroundColor: "#4A63F3",
        padding: hp("2%"),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    chatAvatar: {
        width: wp("10%"),
        height: wp("10%"),
        borderRadius: wp("5%"),
        marginRight: wp("3%"),
    },

    chatName: {
        color: "#fff",
        fontSize: hp("2%"),
        fontWeight: "600",
    },

    onlineRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },

    onlineDot: {
        width: 6,
        height: 6,
        backgroundColor: "#00C853",
        borderRadius: 3,
        marginRight: 5,
    },

    onlineText: {
        color: "#C7D2FE",
        fontSize: hp("1.5%"),
    },

    closeBtn: {
        color: "#fff",
        fontSize: hp("2.5%"),
    },

    /* BODY */
    messageRow: {
        flexDirection: "row",
        marginBottom: hp("1.5%"),
    },

    messageBubble: {
        paddingVertical: hp("1.2%"),
        paddingHorizontal: wp("4%"),
        borderRadius: wp("4%"),
        maxWidth: "75%",
        marginTop: 15

    },
    timeStamp: {
        color: "#9CA3AF",
        fontSize: hp("1.5%"),
        marginTop: hp("-1%"),
    },

    /* LEFT MESSAGE */
    receivedBubble: {
        backgroundColor: "#fcfcfc",
        borderTopLeftRadius: 0,
    },

    /* RIGHT MESSAGE */
    sentBubble: {
        backgroundColor: "#4A63F3",
        borderTopRightRadius: 0,
    },

    messageText: {
        fontSize: hp("1.9%"),
        color: "#4A63F3",
    },
    /* SUGGESTIONS */
    suggestionContainer: {
        marginTop: hp("32%"),
        alignItems: "center",
    },

    suggestionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: wp("3%"),
    },

    suggestionBtn: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: "#4A63F3",
        paddingVertical: hp("1.2%"),
        borderRadius: wp("3%"),
        marginHorizontal: wp("0.5%"),
        alignItems: "center",
    },

    suggestionText: {
        color: "#4A63F3",
        fontSize: hp("1.7%"),
    },

    /* INPUT */
    inputContainer: {
        position: "absolute",
        bottom: hp("2%"),
        left: wp("3%"),
        right: wp("3%"),

        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: wp("6%"),
        paddingHorizontal: wp("4%"),
        paddingVertical: hp("1%"),
    },

    inputPlaceholder: {
        flex: 1,
        color: "#9CA3AF",
    },

    sendBtn: {
        backgroundColor: "#4A63F3",
        padding: 10,
        borderRadius: 20,
    },
});
