import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Animated,
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";

// Shared Global Components
import DrawerMenu from "../../components/DrawerMenu";
import Header from "../../components/Header";

export default function EmergencyContacts() {
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

    const makeCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const contacts = [
        { name: "College Security", phone: "+91 9XXXXXXXXX", note: "Available 24/7", icon: "shield-check" },
        { name: "Admin Office", phone: "+91 9XXXXXXXXX", note: "Working hours only", icon: "office-building" },
        { name: "Medical Assistance", phone: "+91 9XXXXXXXXX", note: "Tap on a number to make a call.", icon: "ambulance" },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F5FF' }}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />

                {/* Shared Global Header */}
                <Header openDrawer={openDrawer} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.pageTitle}>Emergency Contacts</Text>

                    {/* Back Navigation Row */}
                    <TouchableOpacity
                        style={styles.backRow}
                        onPress={() => router.back()}
                    >
                        <MaterialCommunityIcons name="arrow-left" size={24} color="#4A6FFF" />
                        <Text style={styles.backText}>Back to Settings</Text>
                    </TouchableOpacity>

                    {/* Main Outer White Card */}
                    <View style={styles.outerWhiteCard}>
                        {contacts.map((contact, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.innerBlueCard}
                                onPress={() => makeCall(contact.phone)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.cardHeader}>
                                    <Text style={styles.infoTitle}>{contact.name}</Text>
                                </View>

                                <Text style={styles.phoneText}>{contact.phone}</Text>
                                <Text style={styles.infoSubText}>{contact.note}</Text>
                            </TouchableOpacity>
                        ))}

                    </View>
                </ScrollView>

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
        paddingHorizontal: wp('4%'),   // 🔥 THIS FIXES HEADER ALIGNMENT
    },
    scrollContent: {
        paddingHorizontal: wp('2%'),
        paddingBottom: hp('5%'),
        paddingTop: hp('0%')   // ✅ ADD THIS
    },
    pageTitle: {
        fontSize: wp('7.2%'),
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
        marginLeft: 10,
        fontSize: wp('4.2%'),
        fontWeight: '500'
    },
    outerWhiteCard: {
        backgroundColor: '#FFF',
        borderRadius: 35,
        padding: wp('4%'),
        marginTop: hp('1%'),
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 15,
        elevation: 2,
    },
    innerBlueCard: {
        backgroundColor: '#EEF2FF',
        borderRadius: 22,
        padding: 20,
        marginBottom: 15,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4
    },
    infoTitle: {
        fontSize: wp('4.5%'),
        fontWeight: '700',
        color: '#1E293B',
    },
    phoneText: {
        fontSize: wp('4%'),
        fontWeight: '600',
        color: '#94A3B8',
        marginBottom: 4
    },
    infoSubText: {
        fontSize: wp('3.6%'),
        color: '#1E293B',
        lineHeight: 20,
    },

});