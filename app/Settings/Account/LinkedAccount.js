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

export default function LinkedAccountScreen() {
  const router = useRouter();
  
  // State for inputs
  const [studentName, setStudentName] = useState("Evan Yates");
  const [studentPhone, setStudentPhone] = useState("8957486924");
  const [parentPhone, setParentPhone] = useState("7845967482");

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
        <Text style={styles.pageTitle}>Linked Account</Text>

        {/* Back Button with Pressable */}
        <Pressable 
          style={({ pressed }) => [styles.backRow, { opacity: pressed ? 0.6 : 1 }]} 
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={wp('6%')} color="#4A6FFF" />
          <Text style={styles.backText}>Back to Settings</Text>
        </Pressable>

        <View style={styles.outerWhiteCard}>
          <Text style={styles.cardTitle}>Account Details</Text>

          {/* Student Name */}
          <Text style={styles.inputLabel}>Student Name</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              value={studentName}
              editable={false} 
              color="#1E293B"
            />
          </View>

          {/* Student Phone */}
          <Text style={styles.inputLabel}>Student Phone</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              value={studentPhone}
              onChangeText={setStudentPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#94A3B8"
            />
          </View>
          <Pressable style={styles.editLink}>
            <Text style={styles.editText}>Edit Number?</Text>
          </Pressable>

          {/* Parent's Phone */}
          <Text style={styles.inputLabel}>Parent's Phone</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              value={parentPhone}
              onChangeText={setParentPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#94A3B8"
            />
          </View>
          <Pressable style={styles.editLink}>
            <Text style={styles.editText}>Edit Number?</Text>
          </Pressable>

          {/* Save Button */}
          <Pressable 
            style={({ pressed }) => [
                styles.saveButton, 
                { opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }
            ]} 
            onPress={() => {
                if (Platform.OS === 'web') document.activeElement?.blur();
                router.back();
            }}
          >
            <Text style={styles.saveText}>Save Changes</Text>
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
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 3,
    marginBottom: hp('3%')
  },
  cardTitle: { fontSize: wp('5%'), fontWeight: '700', color: '#1E293B', marginBottom: hp('2.5%') },
  inputLabel: { fontSize: wp('3.8%'), color: '#64748B', marginBottom: hp('1%'), fontWeight: '600' },
  textInputWrapper: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: wp('4%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: Platform.OS === 'ios' ? hp('1.5%') : hp('1%'),
    marginBottom: hp('0.5%')
  },
  textInput: { fontSize: wp('4%'), color: '#1E293B', fontWeight: '500' },
  editLink: { alignSelf: 'flex-end', marginTop: hp('0.5%'), marginBottom: hp('2%') },
  editText: { color: '#4A6FFF', fontSize: wp('3.2%'), fontWeight: '600' },
  saveButton: {
    backgroundColor: '#4A6FFF',
    borderRadius: wp('5%'),
    paddingVertical: hp('2%'),
    alignItems: 'center',
    marginTop: hp('2%'),
    shadowColor: "#4A6FFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    width: wp('70%'), 
    alignSelf: 'center'
  },
  saveText: { color: '#FFF', fontSize: wp('4.5%'), fontWeight: '700' }
});