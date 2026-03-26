import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import { Calendar } from "react-native-calendars";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";


export default function LeaveRequestScreen() {

  const [leaveType, setLeaveType] = useState("Sick Leave");
  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState("");

  const leaveTypes = ["Casual", "Sick Leave", "Academic"];
  const [successVisible, setSuccessVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [activeInput, setActiveInput] = useState("start");

  /* NEW STATE ADDED */
  const [calendarMode, setCalendarMode] = useState("days");

  const [file, setFile] = useState(null);

  const leaveHistory = [
    {
      type: "Sick Leave",
      reason: "Viral Fever and cold.",
      date: "Feb 25, 2025",
      color: "#4C6EF5"
    },
    {
      type: "Academic Leave",
      reason: "Attend Inter college Fest.",
      date: "Mar 15, 2025",
      color: "#7C3AED"
    },
    {
      type: "Casual Leave",
      reason: "Attend Sister’s Wedding.",
      date: "Apr 10, 2025",
      color: "#C084FC"
    }
  ];

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      copyToCacheDirectory: true
    });

    if (result.assets) {
      setFile(result.assets[0].name);
    }
  };

  return (

    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.topBar}>
        <View style={styles.header}>

        <Image
        source={require("../../assets/images/Logo.png")}
         style={styles.logo}
        />

        {/* <Text style={styles.classroom}>Classroom</Text> */}

      </View>

        <View style={styles.rightIcons}>
          <Icon name="bell" size={22} color="#1F2937" />

          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />

          <Icon name="more-vertical" size={22} color="#1F2937" />
        </View>
      </View>

      {/* TITLE */}
      <Text style={styles.title}>Leave Request</Text>

      <TouchableOpacity>
        <Text style={styles.back}>← Back to Dashboard</Text>
      </TouchableOpacity>

      {/* APPLY CARD */}
      <View style={styles.card}>

        <Text style={styles.cardTitle}>Apply for leave</Text>
        <Text style={styles.cardSubtitle}>Give your details</Text>

     {/* LEAVE TYPE */}
        <Text style={styles.label}>Leave Type</Text>

        <TouchableOpacity
          style={styles.dropdown}
          
          onPress={() => setModalVisible(true)}
        >
          <Text>{leaveType}</Text>
          <Icon name="chevron-down" size={30} />
        </TouchableOpacity>

        {/* DATE */}
        <Text style={styles.label}>Leave period</Text>

        <View style={styles.dateRow}>

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => {
              setActiveInput("start");
              setCalendarVisible(true);
            }}
          >
            <Text>{startDate.toDateString()}</Text>
            <Icon name="calendar" size={18} />
          </TouchableOpacity>

          <Text style={{ marginHorizontal: 10 }}>To</Text>

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => {
              setActiveInput("end");
              setCalendarVisible(true);
            }}
          >
            <Text>{endDate.toDateString()}</Text>
            <Icon name="calendar" size={18} />
          </TouchableOpacity>

        </View>

        {/* REASON */}
        <Text style={styles.label}>Reason for Leave</Text>

        <TextInput
          placeholder="Eg: Viral Fever and cold."
          style={styles.input}
          value={reason}
          onChangeText={setReason}
        />

        {/* FILE */}
        <Text style={styles.label}>
          Upload additional document (optional)
        </Text>

        <TouchableOpacity style={styles.fileBox} onPress={pickFile}>
          <Icon name="paperclip" size={20} color="#6D5BD0" />

          <View style={{ marginLeft: 15}}>
            <Text style={{ fontWeight: "600" }}>
              {file ? file : "Choose File"}
            </Text>

            <Text style={{ color: "#9CA3AF", fontSize: 12 }}>
              Upto 10 MB PNG
            </Text>
          </View>

          <Icon
            name="more-vertical"
            size={20}
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>
      </View>
       {/* BUTTON */}
        <TouchableOpacity
         style={styles.button}
         onPress={() => setSuccessVisible(true)}
         >
           <Text style={styles.buttonText}>Send Request</Text>
        </TouchableOpacity>
      {/* HISTORY */}
      <Text style={styles.historyTitle}>Leave History</Text>

      {leaveHistory.map((item, index) => (
        <View key={index} style={styles.historyCard}>

          <View
            style={[styles.historyBar, { backgroundColor: "#ECEFF7", }]}
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.historyType}>{item.type}</Text>
            <Text style={styles.historyReason}>{item.reason}</Text>
            <Text style={styles.historyDate}>
              Requested on {item.date}
            </Text>
          </View>

          <TouchableOpacity
           style={styles.viewBtn}
           onPress={() => {
               setSelectedLeave(item);
              setHistoryModalVisible(true);
            }}
>
              <Text style={{ color: "white" }}>View</Text>
                </TouchableOpacity>
        </View>
      ))}

      {/* LEAVE TYPE MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">

        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Request</Text>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="x" size={24} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubTitle}>Request Type</Text>

            {leaveTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                style={styles.radioRow}
                onPress={() => {
                  setLeaveType(type);
                  setModalVisible(false);
                }}
              >

                <View style={styles.radioOuter}>
                  {leaveType === type && <View style={styles.radioInner} />}
                </View>

                <Text style={styles.radioText}>{type}</Text>

              </TouchableOpacity>
            ))}

          </View>
        </View>

      </Modal>

      {/* CALENDAR MODAL */}

      <Modal visible={calendarVisible} transparent animationType="slide">

        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            {/* DAYS / WEEKS TOGGLE */}
            <View style={styles.toggleContainer}>

              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  calendarMode === "days" && styles.toggleActive
                ]}
                onPress={() => setCalendarMode("days")}
              >
                <Text
                  style={[
                    styles.toggleText,
                    calendarMode === "days" && styles.toggleTextActive
                  ]}
                >
                  Days
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  calendarMode === "weeks" && styles.toggleActive
                ]}
                onPress={() => setCalendarMode("weeks")}
              >
                <Text
                  style={[
                    styles.toggleText,
                    calendarMode === "weeks" && styles.toggleTextActive
                  ]}
                >
                  Weeks
                </Text>
              </TouchableOpacity>

            </View>

            <Calendar
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
              }}

              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: "#4C6EF5"
                }
              }}

              theme={{
                todayTextColor: "#4C6EF5",
                arrowColor: "#4C6EF5"
              }}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if(!selectedDate) return; // iOS fix

                const date = new Date(selectedDate);

                if (activeInput === "start") {
                  setStartDate(date);
                } else {
                  setEndDate(date);
                }

                setCalendarVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>

          </View>
        </View>

      </Modal>
      <Modal visible={historyModalVisible} transparent animationType="fade">

           <View style={styles.historyModalOverlay}>

<View style={styles.historyModalCard}>

<Text style={styles.historyModalTitle}>
{selectedLeave?.type}
</Text>

<View style={styles.historyMessageBox}>

<Text style={styles.historyMessageText}>
Respected Ma’am/Sir,
</Text>

<Text style={styles.historyMessageText}>
I would like to inform you that I am suffering from {selectedLeave?.reason}
so I will be taking leave today. Thank you for your understanding.
</Text>

</View>

<View style={styles.historyDateBox}>

<Text style={styles.historyDateLabel}>
Requested on
</Text>

<Text style={styles.historyDateValue}>
{selectedLeave?.date}
</Text>

</View>

<TouchableOpacity
style={styles.historyBackButton}
onPress={() => setHistoryModalVisible(false)}
>
<Text style={styles.historyBackText}>
Back ←
</Text>
</TouchableOpacity>

</View>

       </View>

     </Modal>
     <Modal visible={successVisible} transparent animationType="slide">

<View style={{
flex:1,
backgroundColor:"rgba(0,0,0,0.4)",
justifyContent:"center",
alignItems:"center"
}}>

<View style={{
width:"90%",
backgroundColor:"rgb(241, 243, 248)",
borderRadius:30,
padding:25,
alignItems:"center"
}}>

<Image
 source={require("../../assets/images/Illustration.png")}
 style={{
 width:280,
 height:220,
 resizeMode:"contain",
 marginBottom:10
 }}
/>

<Text style={{
fontSize:22,
fontWeight:"700",
marginBottom:25,
textAlign:"center"
}}>
Request Submitted Successfully!
</Text>

<TouchableOpacity
style={{
backgroundColor:"#0d37de",
paddingVertical:14,
paddingHorizontal:40,
borderRadius:25
}}
onPress={() => setSuccessVisible(false)}
>
<Text style={{color:"white",fontWeight:"700",fontSize:16}}>
Back ←
</Text>
</TouchableOpacity>

</View>

</View>

</Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

container: {
flex: 1,
backgroundColor: "#ECEFF7",
padding: wp('4%')
},

topBar: {
backgroundColor: "white",
borderRadius: wp('8%'),
padding: hp('1.5%'),
flexDirection: "row",
justifyContent: "space-between",
marginBottom: hp('1%')
},

rightIcons: {
flexDirection: "row",
alignItems: "center"
},

avatar: {
width: wp('8%'),
height: wp('8%'),
borderRadius: wp('4%'),
marginHorizontal: wp('2%')
},

title: {
fontSize: wp('6%'),
fontWeight: "700"
},

back: {
color: "#05057d",
marginVertical: hp('1%')
},

card: {
backgroundColor: "white",
borderRadius: wp('6%'),
padding: hp('2.5%'),
marginBottom: hp('2%')
},

cardTitle: {
fontSize: wp('5%'),
fontWeight: "700",
textAlign: "center"
},

cardSubtitle: {
textAlign: "center",
color: "#6B7280",
marginBottom: hp('2%')
},

label: {
marginTop: hp('2%'),
marginBottom: hp('0.8%'),
fontWeight: "600"
},

dropdown: {
borderWidth: 1,
borderColor: "#E5E7EB",
borderRadius: wp('3%'),
padding: hp('1.5%'),
flexDirection: "row",
justifyContent: "space-between"
},

dateRow: {
flexDirection: "row",
alignItems: "center"
},

dateInput: {
flexDirection: "row",
borderWidth: 1,
borderColor: "#E5E7EB",
borderRadius: wp('3%'),
padding: hp('1.5%'),
justifyContent: "space-between",
flex: 1
},

input: {
borderWidth: 1,
borderColor: "#E5E7EB",
borderRadius: wp('3%'),
padding: hp('1.5%')
},

fileBox: {
flexDirection: "row",
borderWidth: 1,
borderColor: "#E5E7EB",
borderRadius: wp('3%'),
padding: hp('1.5%'),
alignItems: "center"
},

button: {
width: wp('60%'),
height: hp('7%'),
backgroundColor: "blue",
justifyContent: "center",
alignItems: "center",
borderRadius: wp('3%'),
alignSelf: "center"
},

buttonText: {
color: "white",
fontWeight: "700",
fontSize: wp('4%')
},

historyTitle: {
fontSize: wp('5%'),
fontWeight: "700",
marginBottom: hp('1%'),
marginTop: hp('1%')
},

historyCard: {
flexDirection: "row",
backgroundColor: "white",
padding: hp('2%'),
borderRadius: wp('4%'),
marginBottom: hp('1.5%'),
alignItems: "center"
},

historyBar: {
width: wp('1%'),
height: "100%",
borderRadius: wp('1%'),
marginRight: wp('3%')
},

historyType: {
fontWeight: "700"
},

historyReason: {
color: "#374151"
},

historyDate: {
color: "#9CA3AF",
fontSize: wp('3%')
},

viewBtn: {
backgroundColor: "#4C6EF5",
paddingVertical: hp('0.8%'),
paddingHorizontal: wp('4%'),
borderRadius: wp('3%')
},

modalOverlay: {
flex: 1,
backgroundColor: "rgba(0,0,0,0.4)",
justifyContent: "center",
alignItems: "center"
},

modalContainer: {
backgroundColor: "white",
borderRadius: wp('8%'),
padding: hp('3%'),
width: wp('90%')
},

modalHeader: {
flexDirection: "row",
justifyContent: "space-between",
alignItems: "center"
},

modalTitle: {
fontSize: wp('5%'),
fontWeight: "700"
},

modalSubTitle: {
marginTop: hp('2%'),
color: "#6B7280",
fontSize: wp('4%')
},

radioRow: {
flexDirection: "row",
alignItems: "center",
marginTop: hp('2%')
},

radioOuter: {
width: wp('6%'),
height: wp('6%'),
borderRadius: wp('3%'),
borderWidth: 2,
borderColor: "#4C6EF5",
alignItems: "center",
justifyContent: "center",
marginRight: wp('3%')
},

radioInner: {
width: wp('3%'),
height: wp('3%'),
borderRadius: wp('1.5%'),
backgroundColor: "#4C6EF5"
},

radioText: {
fontSize: wp('4%')
},

toggleContainer: {
flexDirection: "row",
backgroundColor: "#E5E7EB",
borderRadius: wp('6%'),
padding: hp('0.5%'),
marginBottom: hp('2%')
},

toggleButton: {
flex: 1,
paddingVertical: hp('1%'),
alignItems: "center",
borderRadius: wp('5%')
},

toggleActive: {
backgroundColor: "#4C6EF5"
},

toggleText: {
fontWeight: "600",
color: "#374151"
},

toggleTextActive: {
color: "white"
},

historyModalOverlay:{
flex:1,
backgroundColor:"rgba(0,0,0,0.4)",
justifyContent:"center",
alignItems:"center"
},

historyModalCard:{
width: wp('90%'),
backgroundColor:"#F3F4F6",
borderRadius: wp('8%'),
padding: hp('3%'),
alignItems:"center"
},

historyModalTitle:{
fontSize: wp('5%'),
fontWeight:"700",
marginBottom: hp('2%')
},

historyMessageBox:{
backgroundColor:"#E5E7EB",
borderRadius: wp('5%'),
padding: hp('2%'),
marginBottom: hp('2%')
},

historyMessageText:{
textAlign:"center",
fontSize: wp('4%'),
marginBottom: hp('1%')
},

historyDateBox:{
backgroundColor:"#E5E7EB",
borderRadius: wp('5%'),
padding: hp('2%'),
width:"100%",
alignItems:"center",
marginBottom: hp('2%')
},

historyDateLabel:{
color:"#6B7280"
},

historyDateValue:{
fontSize: wp('4.5%'),
marginTop: hp('0.5%')
},

historyBackButton:{
backgroundColor:"#4C6EF5",
paddingVertical: hp('1.8%'),
paddingHorizontal: wp('10%'),
borderRadius: wp('6%'),
historyBackText:{
color:"white",
fontWeight:"700"
}
}
});