import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Animated,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text, // Replaced TouchableOpacity
    View
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Shared Global Components
import DrawerMenu from "../../components/DrawerMenu";
import Header from "../../components/Header";

export default function AnnouncementsScreen() {
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
    <View style={{ flex: 1, backgroundColor: '#F3F5FF' }}>
        <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />
      
      <Header openDrawer={openDrawer} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Announcements</Text>

        {/* Back Navigation Row with Pressable */}
        <Pressable 
          style={({ pressed }) => [styles.backRow, { opacity: pressed ? 0.6 : 1 }]} 
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={wp('6%')} color="#4A6FFF" />
          <Text style={styles.backText}>Back to Settings</Text>
        </Pressable>

        {/* Main Outer White Card */}
        <View style={styles.outerWhiteCard}>
          
          <View style={styles.innerBlueCard}>
            <View style={styles.titleRow}>
               <Text style={styles.infoTitle}>Latest Announcements</Text>
            </View>
            
            <View style={styles.listContainer}>
                <Text style={styles.listItem}>• Semester exams schedule updated</Text>
                <Text style={styles.listItem}>• Campus will remain closed on Friday</Text>
                <Text style={styles.listItem}>• New safety guidelines issued</Text>
            </View>

            <View style={styles.footerDivider} />
            
            <View style={styles.footerRow}>
               <Text style={styles.boldFooter}>
                 Announcements are published by the college administration.
               </Text>
            </View>
          </View>

        </View>
      </ScrollView>

      <DrawerMenu 
        drawerOpen={drawerOpen} 
        closeDrawer={closeDrawer} 
        drawerAnim={drawerAnim} 
        router={router} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingHorizontal: wp('5%'), paddingBottom: hp('5%') },
  pageTitle: { 
    fontSize: wp('7.5%'), 
    fontWeight: "700", 
    color: "#1A1A1A", 
    marginTop: hp('2%') 
  },
  backRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: hp('2.5%') 
  },
  backText: { 
    color: '#4A6FFF', 
    marginLeft: 10, 
    fontSize: wp('4.2%'), 
    fontWeight: '600' 
  },
  outerWhiteCard: {
    backgroundColor: '#FFF',
    borderRadius: wp('8%'),
    padding: wp('4%'),
    marginTop: hp('1%'),
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 3,
  },
  innerBlueCard: {
    backgroundColor: '#EEF2FF', 
    borderRadius: wp('5.5%'),
    padding: wp('5%'),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
    gap: 8
  },
  infoTitle: { 
    fontSize: wp('4.8%'), 
    fontWeight: '700', 
    color: '#1E293B',
  },
  listContainer: {
    paddingLeft: wp('1%'),
    marginBottom: hp('2%')
  },
  listItem: {
    fontSize: wp('3.8%'),
    color: '#64748B', 
    lineHeight: wp('5.8%'),
    marginBottom: hp('1%'),
    fontWeight: '500'
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#D1DBFF',
    marginBottom: hp('1.5%')
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6
  },
  boldFooter: {
    flex: 1,
    color: '#1E293B',
    fontSize: wp('3.4%'),
    fontWeight: '600',
    lineHeight: wp('4.5%')
  }
});