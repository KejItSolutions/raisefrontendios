import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function CreateClubForm({ onsubmit }) {
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={styles.formCard}>
                <Text style={styles.inputLabel}>Club Name</Text>
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Enter club name" 
                    placeholderTextColor="#A0A0A0" 
                />

                <Text style={[styles.inputLabel, { marginTop: hp('2.5%') }]}>Description</Text>
                <TextInput
                    style={[styles.textInput, styles.textArea]}
                    placeholder="Tell us about the club..."
                    placeholderTextColor="#A0A0A0"
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                />

                <TouchableOpacity 
                    style={styles.submitBtn} 
                    onPress={onsubmit}
                    activeOpacity={0.8}
                >
                    <Text style={styles.submitBtnText}>Create Club</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    formCard: {
        backgroundColor: "#FFF",
        borderRadius: wp('8%'),
        padding: wp('6%'),
        marginTop: hp('1%'),
        // iOS Shadows
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        // Android Elevation
        elevation: 4,
    },
    inputLabel: {
        fontSize: wp('4.5%'),
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: hp('1%'),
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#E5E9F2",
        borderRadius: wp('4%'),
        paddingHorizontal: wp('4%'),
        height: hp('6.5%'),
        fontSize: wp('4%'),
        backgroundColor: "#FFF",
        color: "#1A1A1A",
    },
    textArea: {
        height: hp('20%'),
        paddingTop: hp('1.5%'),
        textAlignVertical: 'top', // Necessary for Android multiline
    },
    submitBtn: {
        backgroundColor: "#4A63F3",
        height: hp('7%'),
        borderRadius: wp('4%'),
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp('4%'),
        // Blue glow shadow for iOS
        shadowColor: "#4A63F3",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        // Android elevation
        elevation: 8,
    },
    submitBtnText: {
        color: "#FFF",
        fontSize: wp('4.5%'),
        fontWeight: "700",
    },
});