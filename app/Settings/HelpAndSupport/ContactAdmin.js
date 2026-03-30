import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router"; // Added Stack
import { useRef, useState } from "react";
import {
    Animated,
    Linking,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput, // Replaced TouchableOpacity
    View
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Shared Global Components
import DrawerMenu from "../../components/DrawerMenu";
import Header from "../../components/Header";

export default function ContactAdminScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  
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

  const handleCall = () => Linking.openURL('tel:+919XXXXXXXXX');
  const handleEmail = () => Linking.openURL('mailto:abc@gmail.com');

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F5FF' }}>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />
      
      <Header openDrawer={openDrawer} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Contact Admin</Text>

        <Pressable 
          style={({ pressed }) => [styles.backRow, { opacity: pressed ? 0.6 : 1 }]} 
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={wp('6%')} color="#4A6FFF" />
          <Text style={styles.backText}>Back to Settings</Text>
        </Pressable>

        <View style={styles.outerWhiteCard}>
          
          {/* Call Box */}
          <Pressable 
            style={({ pressed }) => [styles.innerBlueCard, { opacity: pressed ? 0.8 : 1 }]} 
            onPress={handleCall}
          >
            <Text style={styles.infoTitle}>Call</Text>
            <Text style={styles.infoSubText}>+91 9XXXXXXXXX</Text>
          </Pressable>

          {/* Email Box */}
          <Pressable 
            style={({ pressed }) => [styles.innerBlueCard, { opacity: pressed ? 0.8 : 1 }]} 
            onPress={handleEmail}
          >
            <Text style={styles.infoTitle}>Email</Text>
            <Text style={styles.infoSubText}>abc@gmail.com</Text>
          </Pressable>

          {/* Message Input Section */}
          <Text style={styles.inputLabel}>Message</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Eg: Can I know when I will be able to pay my second semester due?"
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={Platform.OS === 'ios' ? null : 6} // iOS handles multiline better without fixed lines
              value={message}
              onChangeText={setMessage}
              textAlignVertical="top"
              blurOnSubmit={true}
            />
          </View>

          {/* Submit Button */}
          <Pressable 
            style={({ pressed }) => [
                styles.submitButton, 
                { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }
            ]} 
            onPress={() => {
                if (Platform.OS === 'web') document.activeElement?.blur();
                console.log("Message submitted:", message);
            }}
          >
            <Text style={styles.submitText}>Submit</Text>
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
  pageTitle: { fontSize: wp('7.5%'), fontWeight: "700", color: "#1A1A1A", marginTop: hp('2%') },
  backRow: { flexDirection: 'row', alignItems: 'center', marginVertical: hp('2.5%') },
  backText: { color: '#4A6FFF', marginLeft: 10, fontSize: wp('4.2%'), fontWeight: '600' },
  outerWhiteCard: {
    backgroundColor: '#FFF',
    borderRadius: wp('8%'),
    padding: wp('6%'),
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 3,
  },
  innerBlueCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: wp('5%'),
    padding: wp('5%'),
    marginBottom: hp('1.5%'),
  },
  infoTitle: { fontSize: wp('4.2%'), fontWeight: '700', color: '#1E293B', marginBottom: 4 },
  infoSubText: { fontSize: wp('3.8%'), color: '#64748B', fontWeight: '500' },
  inputLabel: { fontSize: wp('3.8%'), color: '#64748B', marginTop: hp('1.5%'), marginBottom: hp('1%'), fontWeight: '600' },
  inputContainer: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: wp('5%'),
    padding: wp('4%'),
    minHeight: hp('18%'),
    marginBottom: hp('3%'),
  },
  textInput: { fontSize: wp('4%'), color: '#1E293B', lineHeight: wp('5.5%'), fontWeight: '500' },
  submitButton: {
    backgroundColor: '#4A6FFF',
    borderRadius: wp('5%'),
    paddingVertical: hp('2%'),
    alignItems: 'center',
    shadowColor: "#4A6FFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  submitText: { color: '#FFF', fontSize: wp('4.8%'), fontWeight: '700' }
});