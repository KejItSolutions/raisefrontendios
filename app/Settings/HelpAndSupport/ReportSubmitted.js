import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router"; // Added Stack
import { useRef, useState } from "react";
import {
    Animated,
    Image,
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

export default function SubmissionSuccessScreen() {
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

  const handleFinish = () => {
    // replace so they can't go "back" to the success screen
    router.replace("/Settings"); 
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F5FF' }}>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />
      
      <Header openDrawer={openDrawer} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Report a Problem Submitted</Text>

        {/* Header Back Link */}
        <Pressable 
          style={({ pressed }) => [styles.backRow, { opacity: pressed ? 0.6 : 1 }]} 
          onPress={handleFinish}
        >
          <MaterialCommunityIcons name="arrow-left" size={wp('6%')} color="#4A6FFF" />
          <Text style={styles.backText}>Back to Settings</Text>
        </Pressable>

        {/* Main Success Card */}
        <View style={styles.outerWhiteCard}>
          
          <View style={styles.imageWrapper}>
             <Image 
                source={require('../../../assets/images/Illustration.png')}
                style={styles.successImage}
                resizeMode="contain"
             />
          </View>

          <Text style={styles.successText}>Request Submitted Successfully!</Text>

          {/* Large Primary Action Button */}
          <Pressable 
            style={({ pressed }) => [
                styles.backButton, 
                { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }
            ]} 
            onPress={handleFinish}
          >
             <Text style={styles.buttonText}>Back to Settings</Text>
             <MaterialCommunityIcons name="arrow-right" size={wp('5.5%')} color="#FFF" />
          </Pressable>
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
    fontSize: wp('6.5%'), 
    fontWeight: "700", 
    color: "#1A1A1A", 
    marginTop: hp('2%'),
    lineHeight: wp('8.5%')
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
    fontWeight: '600' 
  },
  outerWhiteCard: {
    backgroundColor: '#FFF',
    borderRadius: wp('10%'),
    padding: wp('8%'),
    marginTop: hp('1%'),
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 3,
    minHeight: hp('55%'),
    justifyContent: 'center'
  },
  imageWrapper: {
    width: wp('65%'),
    height: hp('28%'),
    marginBottom: hp('4%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  successImage: {
    width: '100%',
    height: '100%',
  },
  successText: {
    fontSize: wp('5%'),
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: hp('5%'),
    paddingHorizontal: wp('5%')
  },
  backButton: {
    backgroundColor: '#4A6FFF',
    flexDirection: 'row', 
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('8%'),
    borderRadius: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('65%'),
    shadowColor: "#4A6FFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: wp('4.5%'),
    fontWeight: '700',
    marginRight: 10,
  }
});