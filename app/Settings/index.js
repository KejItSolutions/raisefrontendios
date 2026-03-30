import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Import shared components
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";
import SettingAccordion from "./components/SettingAccordion";

// Import Item Data
import { AccountItems } from "./Account/AccountItems";
import { CollegeInfoItems } from "./CollegeInfo/CollegeInfoItems";
import { HelpAndSupportItems } from "./HelpAndSupport/HelpAndSupportItems";
import { LocationItems } from "./Location/LocationItems";
import { NotificationItems } from "./Notifications/NotificationItems";
import { PreferenceItems } from "./Preferences/PreferenceItems";
import { PrivacyItems } from "./Privacy/PrivacyItems";

export default function SettingsAccordionScreen() {
  const router = useRouter();
  
  // Drawer logic - Standardized to -wp('75%') for better iOS/Web hiding
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(wp('-75%'))).current;

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(drawerAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnim, { 
      toValue: wp('-75%'), 
      duration: 250, 
      useNativeDriver: true 
    }).start(() => setDrawerOpen(false));
  };

  return (
    <SafeAreaProvider>
      {/* 1. Hides the "index" title at the top of the screen */}
      <Stack.Screen options={{ headerShown: false }} />
      
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="dark-content" />
        
        {/* Drawer Menu */}
        <DrawerMenu 
          drawerOpen={drawerOpen} 
          closeDrawer={closeDrawer} 
          drawerAnim={drawerAnim} 
          router={router} 
        />

        <LinearGradient colors={["#F0F3FF", "#E8ECFB"]} style={styles.container}>
          <Header openDrawer={openDrawer} />

          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.pageTitle}>Settings</Text>
            
            <View style={styles.whiteCard}>
              <SettingAccordion title="Account" icon="account-outline" items={AccountItems} />
              <SettingAccordion title="Notifications" icon="bell-outline" items={NotificationItems} />
              <SettingAccordion title="Location & Tracking" icon="map-marker-outline" items={LocationItems} type="location" />           
              <SettingAccordion title="Privacy & Permissions" icon="lock-outline" items={PrivacyItems} />
              <SettingAccordion title="App Preferences" icon="apps" items={PreferenceItems} />       
              <SettingAccordion title="College Info" icon="office-building-outline" items={CollegeInfoItems} />            
              <SettingAccordion title="Help & Support" icon="help-circle-outline" items={HelpAndSupportItems} />
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F3FF",
  },
  container: { 
    flex: 1, 
  },
  scrollContent: { 
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('5%') 
  },
  pageTitle: { 
    fontSize: wp('7%'), 
    fontWeight: "700", 
    color: "#1A1A1A", 
    marginTop: hp('1%'),
    marginBottom: hp('2%') 
  },
  whiteCard: {
    backgroundColor: '#FFF',
    borderRadius: wp('8%'),
    padding: wp('5%'),
    // iOS Shadow handling
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    // Android Elevation
    elevation: 4,
    marginBottom: hp('2%'),
  },
});