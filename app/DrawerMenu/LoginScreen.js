import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const [country, setCountry] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [timer, setTimer] = useState(30);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [infoMessage, setInfoMessage] = useState("");
  const [messageColor, setMessageColor] = useState("red");

  const inputs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const verifyOtp = () => {
    const enteredOtp = otp.join("");
    const TEST_MOBILE = "9391215620";
    const TEST_OTP = "1234";

    if (mobile === TEST_MOBILE && enteredOtp === TEST_OTP) {
      setMessageColor("green");
      setInfoMessage("Success! Logging you in...");
      setTimeout(() => {
        router.push("/StudentProfile");
      }, 500);
    } else if (mobile === "" || enteredOtp.length < 4) {
      setMessageColor("red");
      setInfoMessage("Please enter phone and 4-digit OTP.");
    } else {
      setMessageColor("red");
      setInfoMessage("Invalid credentials. Try 9876543210 / 1234");
    }
  };

  const resendOtp = () => {
    setTimer(30);
    setOtp(["", "", "", ""]);
    setInfoMessage("OTP has been resent!");
    setMessageColor("blue");
    inputs.current[0].focus();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/Logo.png")}
              style={styles.logo}
            />
            <Text style={styles.logoText}>Classroom</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.title}>Log In</Text>

            <Text style={styles.label}>Register Phone Number</Text>

            <View style={styles.phoneRow}>
              <View style={styles.countryBox}>
                <Picker
                  selectedValue={country}
                  onValueChange={(v) => setCountry(v)}
                  style={styles.pickerIOS}
                >
                  <Picker.Item label="+91" value="+91" />
                  <Picker.Item label="+1" value="+1" />
                </Picker>
              </View>

              <TextInput
                style={styles.phoneInput}
                placeholder="9876543210"
                keyboardType="phone-pad"
                value={mobile}
                textAlignVertical="center"
                onChangeText={(text) => {
                  setMobile(text);
                  setInfoMessage("");
                }}
              />
            </View>

            <View style={styles.otpHeader}>
              <Text style={styles.label}>Code from SMS</Text>
              <TouchableOpacity onPress={timer === 0 ? resendOtp : null}>
                <Text
                  style={[
                    styles.resend,
                    { color: timer > 0 ? "#aaa" : "green" },
                  ]}
                >
                  {timer > 0
                    ? `00:${timer < 10 ? `0${timer}` : timer} Resend`
                    : "Resend OTP"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputs.current[index] = ref)}
                  style={styles.otpBox}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={digit}
                  onChangeText={(v) => {
                    handleOtpChange(v, index);
                    setInfoMessage("");
                  }}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
            </View>

            {infoMessage ? (
              <Text style={[styles.infoText, { color: messageColor }]}>
                {infoMessage}
              </Text>
            ) : null}

            <TouchableOpacity style={styles.loginButton} onPress={verifyOtp}>
              <Text style={styles.loginText}>Log In →</Text>
            </TouchableOpacity>

            <Text style={styles.footer}>
              New Student?{" "}
              <Text
                style={styles.create}
                onPress={() => router.push("/RegisterScreen")}
              >
                Create Account
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e7e9f5",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  logo: {
    width: 45,
    height: 45,
    resizeMode: "contain",
    marginRight: 10,
  },

  logoText: {
    fontSize: 22,
    color: "#4c63ff",
    fontWeight: "600",
  },

  card: {
    width: "90%",
    backgroundColor: "#f7f7fb",
    padding: 25,
    borderRadius: 25,
  },

  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },

  label: {
    color: "#6b6b6b",
    marginBottom: 8,
  },

  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  countryBox: {
    width: 90, // slightly reduced
    height: 50,
    borderWidth: 1,
    borderColor: "#4c63ff",
    borderRadius: 12,
    marginRight: 10,
    overflow: "hidden",
    justifyContent: "center",
  },

  pickerIOS: {
    height: 50,
    width: "100%",
  },

  phoneInput: {
    width: "65%", // ✅ reduced width
    borderWidth: 1,
    borderColor: "#4c63ff",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
    justifyContent: "center",
  },

  otpHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  resend: {
    fontWeight: "500",
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  otpBox: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: "#d5d5d5",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#fff",
  },

  infoText: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 14,
    fontWeight: "500",
  },

  loginButton: {
    backgroundColor: "#4c63ff",
    padding: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  loginText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  footer: {
    textAlign: "center",
    marginTop: 20,
    color: "#555",
  },

  create: {
    color: "#4c63ff",
    fontWeight: "bold",
  },
});