import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Animated,
    Image,
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

export default function ProfileDetailsScreen() {
  const router = useRouter();
  
  // Form State
  const [studentID, setStudentID] = useState("R2012567");
  const [name, setName] = useState("Evan Yates");
  const [email, setEmail] = useState("evanyates@gmail.com");
  const [birthday, setBirthday] = useState("May 19, 1996");

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
        
        {/* Back Navigation Row */}
        <Pressable 
          style={({ pressed }) => [styles.backRow, { opacity: pressed ? 0.6 : 1 }]} 
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={wp('6%')} color="#4A6FFF" />
          <Text style={styles.backText}>Back to Settings</Text>
        </Pressable>

        <View style={styles.outerWhiteCard}>
          <Text style={styles.cardTitle}>Profile details</Text>

          {/* Avatar Section */}
          <View style={styles.avatarContainer}>
            <View style={styles.imageBorder}>
               <Image 
                source={{ uri: 'https://i.pravatar.cc/300?img=12' }} 
                style={styles.profilePic}
               />
            </View>
          </View>

          {/* Picture Action Buttons */}
          <View style={styles.actionButtonsRow}>
            <Pressable style={({ pressed }) => [styles.deleteBtn, { opacity: pressed ? 0.8 : 1 }]}>
              <Text style={styles.btnText}>Delete Picture</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.editBtn, { opacity: pressed ? 0.8 : 1 }]}>
              <Text style={styles.btnText}>Edit Picture</Text>
            </Pressable>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            <Text style={styles.inputLabel}>Student ID</Text>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.textInput} value={studentID} onChangeText={setStudentID} />
            </View>

            <Text style={styles.inputLabel}>Student Name</Text>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.textInput} value={name} onChangeText={setName} />
            </View>

            <Text style={styles.inputLabel}>Email ID</Text>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.textInput} value={email} onChangeText={setEmail} keyboardType="email-address" />
            </View>

            <Text style={styles.inputLabel}>Birthday Date</Text>
            <View style={[styles.inputWrapper, styles.dateWrapper]}>
              <TextInput style={styles.textInput} value={birthday} onChangeText={setBirthday} />
              <MaterialCommunityIcons name="calendar-month-outline" size={wp('5.5%')} color="#64748B" />
            </View>
          </View>
        </View>

        {/* Big Update Button */}
        <Pressable 
          style={({ pressed }) => [
            styles.updateButton, 
            { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] }
          ]} 
          onPress={() => {
            if (Platform.OS === 'web') document.activeElement?.blur();
            console.log("Profile Updated");
          }}
        >
            <Text style={styles.updateText}>Update</Text>
        </Pressable>
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
  backRow: { flexDirection: 'row', alignItems: 'center', marginVertical: hp('2%'), marginTop: hp('1%') },
  backText: { color: '#4A6FFF', marginLeft: 10, fontSize: wp('4.2%'), fontWeight: '600' },
  
  outerWhiteCard: {
    backgroundColor: '#FFF',
    borderRadius: wp('8%'),
    padding: wp('6%'),
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 3,
  },
  cardTitle: { fontSize: wp('5.5%'), fontWeight: '700', color: '#1E293B', marginBottom: hp('2.5%') },
  
  avatarContainer: { marginBottom: hp('2%') },
  imageBorder: {
    padding: wp('1%'),
    borderRadius: wp('15%'),
    borderWidth: 2,
    borderColor: '#4A6FFF',
  },
  profilePic: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('12.5%'),
  },

  actionButtonsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: hp('3.5%') },
  deleteBtn: { backgroundColor: '#4A6FFF', paddingVertical: hp('1%'), paddingHorizontal: wp('5%'), borderRadius: wp('2.5%') },
  editBtn: { backgroundColor: '#4A6FFF', paddingVertical: hp('1%'), paddingHorizontal: wp('6%'), borderRadius: wp('2.5%') },
  btnText: { color: '#FFF', fontSize: wp('3.2%'), fontWeight: '700' },

  formSection: { width: '100%' },
  inputLabel: { fontSize: wp('3.8%'), color: '#64748B', marginBottom: hp('1%'), fontWeight: '600' },
  inputWrapper: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: wp('4%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: Platform.OS === 'ios' ? hp('1.5%') : hp('1%'),
    marginBottom: hp('2.5%'),
    width: '100%',
  },
  dateWrapper: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  textInput: { fontSize: wp('4%'), color: '#1E293B', fontWeight: '500', flex: 1 },

  updateButton: {
    backgroundColor: '#4A6FFF',
    borderRadius: wp('5%'),
    paddingVertical: hp('2%'),
    alignItems: 'center',
    marginTop: hp('3%'),
    shadowColor: "#4A6FFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    width: wp('45%'),
    alignSelf: 'center'
  },
  updateText: { color: '#FFF', fontSize: wp('4.5%'), fontWeight: '700' }
});