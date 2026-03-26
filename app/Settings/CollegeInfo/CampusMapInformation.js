import { MaterialCommunityIcons } from "@expo/vector-icons";
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

// Shared Global Components
import DrawerMenu from "../../components/DrawerMenu";
import Header from "../../components/Header";

export default function CampusMapInfo() {
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

                {/* Shared Global Header */}
                <Header openDrawer={openDrawer} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.pageTitle}>Campus Map Info</Text>

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

                        {/* Legend Section */}
                        <View style={styles.innerBlueCard}>
                            <Text style={styles.infoTitle}>Map Legend</Text>
                            <View style={styles.listContainer}>
                                <Text style={styles.listItem}>• Academic Blocks</Text>
                                <Text style={styles.listItem}>• Library</Text>
                                <Text style={styles.listItem}>• Laboratories</Text>
                                <Text style={styles.listItem}>• Canteen</Text>
                                <Text style={styles.listItem}>• Sports Area</Text>
                            </View>
                        </View>

                        {/* Accuracy Section */}
                        <View style={styles.innerBlueCard}>
                            <Text style={styles.infoTitle}>Accuracy</Text>
                            <Text style={styles.infoSubText}>
                                Indoor locations show building-level accuracy. Outdoor locations show area-level accuracy.
                            </Text>
                        </View>

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
        paddingHorizontal: wp('3%'),
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
    infoTitle: {
        fontSize: wp('4.5%'),
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 8
    },
    infoSubText: {
        fontSize: wp('3.6%'),
        color: '#94A3B8',
        lineHeight: 22,
    },
    listContainer: {
        marginTop: 5,
    },
    listItem: {
        fontSize: wp('3.8%'),
        color: '#94A3B8',
        lineHeight: 26,
    },
});