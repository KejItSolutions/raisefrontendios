import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Animated,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Shared Global Components
import DrawerMenu from "../../components/DrawerMenu";
import Header from "../../components/Header";

export default function AppInfoScreen() {
  const router = useRouter();
  
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

  const appDetails = [
    { question: "App Version", answer: "v1.0.0" },
    { question: "Latest Updated", answer: "January 2026" },
    { question: "Developed For", answer: "Kej It Solutions" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F5FF' }}>
        <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />
      
      <Header openDrawer={openDrawer} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>App Information</Text>

        <Pressable 
          style={({ pressed }) => [styles.backRow, { opacity: pressed ? 0.6 : 1 }]} 
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={wp('6%')} color="#4A6FFF" />
          <Text style={styles.backText}>Back to Settings</Text>
        </Pressable>

        <View style={styles.outerWhiteCard}>
          {appDetails.map((item, index) => (
            <View key={index} style={styles.innerBlueCard}>
              <Text style={styles.infoTitle}>{item.question}</Text>
              <Text style={styles.infoSubText}>{item.answer}</Text>
            </View>
          ))}
          
          <Text style={styles.copyrightText}>
            © 2026 Kej It Solutions. All rights reserved.
          </Text>
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
    padding: wp('5%'),
    marginTop: hp('1%'),
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 3,
  },
  innerBlueCard: {
    backgroundColor: '#EEF2FF', 
    borderRadius: wp('4%'),
    padding: wp('4.5%'),
    marginBottom: hp('1.5%'),
  },
  infoTitle: { 
    fontSize: wp('4.2%'), 
    fontWeight: '700', 
    color: '#1E293B',
    marginBottom: hp('0.5%')
  },
  infoSubText: { 
    fontSize: wp('3.8%'), 
    color: '#64748B', 
    fontWeight: '500'
  },
  copyrightText: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: wp('3%'),
    marginTop: hp('2%'),
    fontWeight: '500'
  }
});