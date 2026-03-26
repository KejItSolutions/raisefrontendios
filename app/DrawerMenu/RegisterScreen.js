import { useEffect, useRef, useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/Feather';

export default function RegistrationScreen() {

  const router = useRouter();

  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [studentPhone, setStudentPhone] = useState("");

  const [parentName, setParentName] = useState("");
  const [relationship, setRelationship] = useState("father");
  const [parentPhone, setParentPhone] = useState("");

  const [otpStudent, setOtpStudent] = useState(['','','','']);
  const [otpParent, setOtpParent] = useState(['','','','']);

  const [timer,setTimer] = useState(20);

  const [infoMessage, setInfoMessage] = useState("");
  const [messageColor, setMessageColor] = useState("red");

  const [showRelationDropdown, setShowRelationDropdown] = useState(false);

  const studentRefs = useRef([]);
  const parentRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(t => t - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const updateOtp = (value, index, type) => {
    setInfoMessage("");

    if (type === 'student') {
      let arr = [...otpStudent];
      arr[index] = value;
      setOtpStudent(arr);

      if (value && index < 3) {
        studentRefs.current[index + 1]?.focus();
      }
    } else {
      let arr = [...otpParent];
      arr[index] = value;
      setOtpParent(arr);

      if (value && index < 3) {
        parentRefs.current[index + 1]?.focus();
      }
    }
  }

  const handleRegistration = () => {
    const sOtp = otpStudent.join("");
    const pOtp = otpParent.join("");

    if (sOtp === "1234" && pOtp === "1234") {
      setMessageColor("green");
      setInfoMessage("Registration Successful!");
      setTimeout(() => {
        router.push("/Document");
      }, 800);
    } else {
      setMessageColor("red");
      setInfoMessage("Invalid OTPs. Use 1234");
    }
  }

  const renderOtp = (type)=>{
    const data = type==='student'?otpStudent:otpParent
    const refs = type === 'student' ? studentRefs : parentRefs;

    return(
      <View style={styles.otpContainer}>
        {data.map((item,index)=>(
          <TextInput
            key={index}
            ref={(el) => (refs.current[index] = el)}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            value={item}
            onChangeText={(val) => updateOtp(val, index, type)}
          />
        ))}
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>

          {/* HEADER */}
          <View style={styles.header}>
            <Image
              source={require("../../assets/images/Logo.png")}
              style={styles.logo}
            />
            <Text style={styles.classroom}>Classroom</Text>
          </View>

          {/* CARD */}
          <View style={styles.card}>

            <Text style={styles.title}>Registration</Text>
            <Text style={styles.subtitle}>Secure your details</Text>

            <Text style={styles.label}>Student ID</Text>
            <TextInput style={styles.input} value={studentId} onChangeText={setStudentId}/>

            <Text style={styles.label}>Student Name</Text>
            <TextInput style={styles.input} value={studentName} onChangeText={setStudentName}/>

            <Text style={styles.label}>Email ID</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail}/>

            <Text style={styles.label}>Birthday Date</Text>
            <View style={styles.inputIcon}>
              <TextInput style={{flex:1}} value={birthday} onChangeText={setBirthday}/>
              <Icon name="calendar" size={20}/>
            </View>

            {/* STUDENT PHONE */}
            <Text style={styles.label}>Student Phone Number</Text>

            <View style={styles.phoneRow}>
              <TouchableOpacity style={styles.countryBox}>
                <Text style={styles.countryText}>+91</Text>
                <Icon name="chevron-down" size={16} color="#555" />
              </TouchableOpacity>

              <TextInput
                style={styles.phoneInput}
                value={studentPhone}
                onChangeText={setStudentPhone}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.otpHeader}>
              <Text style={styles.label}>Code from SMS</Text>
              <Text style={styles.resend}>
                00:{timer < 10 ? `0${timer}` : timer} Resend OTP
              </Text>
            </View>

            {renderOtp('student')}

            <Text style={styles.sectionTitle}>Parent/Guardian Details</Text>

            <Text style={styles.label}>Parent Name</Text>
            <TextInput style={styles.input} value={parentName} onChangeText={setParentName}/>

            {/* RELATION DROPDOWN */}
            <Text style={styles.label}>Relationship</Text>

            <View>
              <TouchableOpacity
                style={styles.dropdownBox}
                onPress={() => setShowRelationDropdown(!showRelationDropdown)}
              >
                <Text style={styles.dropdownText}>
                  {relationship.charAt(0).toUpperCase() + relationship.slice(1)}
                </Text>
                <Icon name={showRelationDropdown ? "chevron-up" : "chevron-down"} size={18}/>
              </TouchableOpacity>

              {showRelationDropdown && (
                <View style={styles.dropdownList}>
                  {["father", "mother", "guardian"].map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setRelationship(item);
                        setShowRelationDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* PARENT PHONE */}
            <Text style={styles.label}>Parent Phone Number</Text>

            <View style={styles.phoneRow}>
              <TouchableOpacity style={styles.countryBox}>
                <Text style={styles.countryText}>+91</Text>
                <Icon name="chevron-down" size={16} color="#555" />
              </TouchableOpacity>

              <TextInput
                style={styles.phoneInput}
                value={parentPhone}
                onChangeText={setParentPhone}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.otpHeader}>
              <Text style={styles.label}>Code from SMS</Text>
            </View>

            {renderOtp('parent')}

            {infoMessage ? (
              <Text style={[styles.infoText, { color: messageColor }]}>
                {infoMessage}
              </Text>
            ) : null}

            <TouchableOpacity onPress={handleRegistration}>
              <LinearGradient colors={['#4c63ff','#3a4bd8']} style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
                <Icon name="arrow-right" color="#fff" size={20}/>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

safe:{ flex:1, backgroundColor:'#e7e9f5' },

header:{
  alignItems:'center',
  flexDirection:'row',
  justifyContent:'center',
  marginTop:20
},

logo:{ width:45, height:45, marginRight:10 },

classroom:{ color:'#4c63ff', fontSize:18, fontWeight:'600' },

card:{
  backgroundColor:'#fff',
  margin:20,
  borderRadius:25,
  padding:20
},

title:{ fontSize:22, fontWeight:'700', textAlign:'center' },
subtitle:{ textAlign:'center', color:'#777', marginBottom:20 },

label:{ marginTop:15, color:'#555' },

input:{
  borderWidth:1,
  borderColor:'#d6d9e0',
  borderRadius:12,
  padding:12,
  marginTop:5
},

inputIcon:{
  flexDirection:'row',
  alignItems:'center',
  borderWidth:1,
  borderColor:'#d6d9e0',
  borderRadius:12,
  paddingHorizontal:12,
  marginTop:5
},

phoneRow:{
  flexDirection:'row',
  alignItems:'center',
  marginTop:5
},

countryBox:{
  width:100,
  height:50,
  borderWidth:1.5,
  borderColor:'#4c63ff',
  borderRadius:14,
  marginRight:10,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'#fff',
  paddingHorizontal:10
},

countryText:{
  fontSize:16,
  flex:1,
  textAlign:'center'
},

phoneInput:{
  flex:1,
  height:50,
  borderWidth:1.5,
  borderColor:'#4c63ff',
  borderRadius:14,
  paddingHorizontal:15
},

otpHeader:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginTop:10
},

resend:{ color:'green' },

otpContainer:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginTop:10
},

otpBox:{
  width:55,
  height:50,
  borderWidth:1,
  borderColor:'#d6d9e0',
  borderRadius:12,
  textAlign:'center'
},

sectionTitle:{ marginTop:25, fontWeight:'700', fontSize:18 },

dropdownBox:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  borderWidth:1,
  borderColor:'#d6d9e0',
  borderRadius:14,
  paddingHorizontal:15,
  height:50,
  marginTop:5,
  backgroundColor:'#fff'
},

dropdownText:{ fontSize:15, color:'#555' },

dropdownList:{
  backgroundColor:'#fff',
  borderWidth:1,
  borderColor:'#d6d9e0',
  borderRadius:14,
  marginTop:5
},

dropdownItem:{
  padding:15,
  borderBottomWidth:0.5,
  borderBottomColor:'#eee'
},

dropdownItemText:{ fontSize:15, color:'#555' },

button:{
  marginTop:30,
  padding:15,
  borderRadius:12,
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center'
},

buttonText:{ color:'#fff', marginRight:10 },

infoText:{ textAlign:'center', marginTop:15 }

});