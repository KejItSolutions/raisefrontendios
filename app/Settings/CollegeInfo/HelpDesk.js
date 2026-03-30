import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Animated,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";

// shared global components
import DrawerMenu from "../../components/DrawerMenu";
import Header from "../../components/Header";

export default function HelpDesk() {
    const router = useRouter();

    // --- Drawer Logic ---
    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerAnim = useRef(new Animated.Value(-wp('60%'))).current;

    const openDrawer = () => {
        setDrawerOpen(true);
        Animated.timing(drawerAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    };

    const closeDrawer = () => {
        Animated.timing(drawerAnim, {
            toValue: -wp('60%'),
            duration: 250,
            useNativeDriver: true
        }).start(() => setDrawerOpen(false));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F5FF' }}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <LinearGradient colors={["#F0F3FF", "#E8ECFB"]} style={styles.container}>

                    {/* Shared Global Header */}
                    <Header openDrawer={openDrawer} />

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        <Text style={styles.pageTitle}>Help Desk</Text>

                        {/* Back Navigation Row */}
                        <TouchableOpacity
                            style={styles.backRow}
                            onPress={() => router.back()}
                        >
                            <MaterialCommunityIcons name="arrow-left" size={22} color="#4A6FFF" />
                            <Text style={styles.backText}>Back to Settings</Text>
                        </TouchableOpacity>

                        {/* Main Content Card */}
                        <View style={styles.whiteCard}>

                            {/* Info Box 1 */}
                            <View style={styles.infoBox}>
                                <Text style={styles.infoTitle}>College Help Desk</Text>
                                <Text style={styles.infoSubText}>
                                    For technical or campus-related assistance, contact the help desk.
                                </Text>
                            </View>

                            {/* Info Box 2 */}
                            <View style={styles.infoBox}>
                                <Text style={styles.infoTitle}>Working Hours:</Text>
                                <Text style={styles.infoSubText}>Monday – Friday, 9:00 AM to 5:00 PM</Text>
                            </View>

                            <Text style={styles.footerNote}>
                                You can raise a request or contact support directly from this screen.
                            </Text>
                        </View>
                    </ScrollView>
                </LinearGradient>

                {/* Shared Global Drawer */}
                <DrawerMenu
                    drawerOpen={drawerOpen}
                    closeDrawer={closeDrawer}
                    drawerAnim={drawerAnim}
                    router={router}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F5FF',
        paddingHorizontal: wp('2%'),   // 🔥 THIS FIXES HEADER ALIGNMENT
    },
    scrollContent: {
        paddingHorizontal: wp('1.5%'),
        paddingBottom: hp('5%'),
        paddingTop: hp('0%')   // ✅ ADD THIS
    },
    pageTitle: {
        fontSize: wp('7.5%'),
        fontWeight: "700",
        color: "#1A1A1A",
        marginTop: hp('2%')
    },
    backRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp('2%')
    },
    backText: {
        color: '#4A6FFF',
        marginLeft: 8,
        fontSize: wp('4%'),
        fontWeight: '600'
    },
    whiteCard: {
        backgroundColor: '#FFF',
        borderRadius: 25,
        padding: 20,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        alignItems: 'center' // Centers the footer text
    },
    infoBox: {
        backgroundColor: '#F0F4FF', // Matches your accordion sub-items
        padding: 20,
        borderRadius: 20,
        marginBottom: 15,
        width: '100%'
    },
    infoTitle: {
        fontSize: wp('4.5%'),
        fontWeight: '700',
        color: '#1A1A1A'
    },
    infoSubText: {
        fontSize: wp('3.5%'),
        color: '#7D7D7D',
        marginTop: 6,
        lineHeight: 20
    },
    footerNote: {
        textAlign: 'left',
        color: '#4B5563',
        fontSize: wp('3.5%'),
        marginTop: 10,
        paddingHorizontal: 10,
        lineHeight: 20
    }
});