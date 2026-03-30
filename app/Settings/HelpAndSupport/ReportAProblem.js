import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Animated,
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

export default function ReportProblemScreen() {
  const router = useRouter();
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  
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
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />
      
      <Header openDrawer={openDrawer} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Report a Problem</Text>

        <Pressable 
          style={({ pressed }) => [styles.backRow, { opacity: pressed ? 0.6 : 1 }]} 
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={wp('6%')} color="#4A6FFF" />
          <Text style={styles.backText}>Back to Settings</Text>
        </Pressable>

        <View style={styles.outerWhiteCard}>
          
          {/* Issue Type Input */}
          <Text style={styles.inputLabel}>Issue type</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Unable to add documents."
              placeholderTextColor="#94A3B8"
              value={issue}
              onChangeText={setIssue}
            />
          </View>

          {/* Description Input */}
          <Text style={styles.inputLabel}>Description</Text>
          <View style={[styles.textInputWrapper, styles.textAreaWrapper]}>
            <TextInput
              style={styles.textInput}
              placeholder="Eg: Documents uploaded are not stored in the files."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={Platform.OS === 'ios' ? null : 6}
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
              blurOnSubmit={true}
            />
          </View>

          {/* Screenshot Upload Box */}
          <Pressable 
            style={({ pressed }) => [styles.uploadBox, { opacity: pressed ? 0.8 : 1 }]} 
            onPress={() => console.log("Open Image Picker")}
          >
            <View style={styles.uploadLeft}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="paperclip" size={wp('5.5%')} color="#4A6FFF" />
              </View>
              <View style={styles.uploadTextContainer}>
                <Text style={styles.uploadTitle}>Screenshot Upload</Text>
                <Text style={styles.uploadSubText}>Upto 10 MB PNG</Text>
              </View>
            </View>
            <MaterialCommunityIcons name="dots-vertical" size={wp('6%')} color="#1E293B" />
          </Pressable>

          {/* Submit Button */}
          <Pressable 
            style={({ pressed }) => [
                styles.submitButton, 
                { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }
            ]} 
            onPress={() => {
                if (Platform.OS === 'web') document.activeElement?.blur();
                router.replace("/Settings/HelpAndSupport/ReportSubmitted");
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
  inputLabel: { fontSize: wp('3.8%'), color: '#64748B', marginBottom: hp('1%'), fontWeight: '600' },
  textInputWrapper: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: wp('4%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: Platform.OS === 'ios' ? hp('1.5%') : hp('1%'),
    marginBottom: hp('2.5%'),
  },
  textAreaWrapper: { minHeight: hp('18%') },
  textInput: { fontSize: wp('4%'), color: '#1E293B', fontWeight: '500' },
  
  uploadBox: {
    backgroundColor: '#EEF2FF', // Soft Blue/Lavender Tint
    borderRadius: wp('5%'),
    padding: wp('4%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D1DBFF',
    marginBottom: hp('4%'),
  },
  uploadLeft: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: {
    backgroundColor: '#FFF',
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: wp('3.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1
  },
  uploadTitle: { fontSize: wp('4%'), fontWeight: '700', color: '#1E293B' },
  uploadSubText: { fontSize: wp('3.2%'), color: '#64748B', marginTop: 2, fontWeight: '500' },

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