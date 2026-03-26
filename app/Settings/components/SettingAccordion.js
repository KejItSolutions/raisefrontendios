import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Platform, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const SettingAccordion = ({ title, icon, items, type }) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [toggleValues, setToggleValues] = useState({});

  const handleToggle = (itemTitle) => {
    setToggleValues(prev => ({
      ...prev,
      [itemTitle]: !prev[itemTitle]
    }));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header} 
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons 
            name={icon} 
            size={wp('6%')} 
            color={expanded ? "#4A6FFF" : "#7D7D7D"} 
          />
          <Text style={[styles.title, expanded && styles.activeTitle]}>{title}</Text>
        </View>
        <MaterialCommunityIcons 
          name={expanded ? "chevron-up" : "chevron-down"} 
          size={wp('6%')} 
          color={expanded ? "#4A6FFF" : "#7D7D7D"} 
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.subItemsWrapper}>
          {items.map((item, index) => {
            const isToggledOn = toggleValues[item.title] ?? item.defaultVal;
            const cardBg = (type === "location") 
              ? (index < 2 ? "#EEF2FF" : "#F5F5F5") 
              : "#F0F4FF";

            return (
              <TouchableOpacity 
                key={index} 
                style={[styles.subItemCard, { backgroundColor: cardBg }]}
                activeOpacity={item.route ? 0.7 : 1} 
                onPress={() => {
                  if (item.route) {
                    router.push(item.route);
                  }
                }}
              >
                <View style={styles.textContainer}>
                  <Text style={[styles.subItemTitle, item.isDestructive && { color: 'red' }]}>
                    {item.title}
                  </Text>
                  <Text style={styles.subItemSubText}>{item.subText}</Text>
                </View>

                {item.status && (
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                )}

                            {item.hasSwitch && (
                <View style={styles.switchWrapper}>
                    <Switch
                    trackColor={{ false: "#CBD5E1", true: "#4259FA" }} 
                    thumbColor="#FFFFFF"
                    activeThumbColor="#FFFFFF" 
                    ios_backgroundColor="#CBD5E1"
                    onValueChange={() => handleToggle(item.title)}
                    value={isToggledOn}
                    style={Platform.select({
                        ios: { transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] },
                        default: { transform: [{ scaleX: 1 }, { scaleY: 1 }], cursor: 'pointer' }
                    })}
                    />
                </View>
                )}

                {item.route && !item.hasSwitch && (
                  <MaterialCommunityIcons name="chevron-right" size={wp('5%')} color="#94A3B8" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: hp('1%') },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('1%'),
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: wp('4.5%'), marginLeft: wp('4%'), color: '#7D7D7D', fontWeight: '500' },
  activeTitle: { color: '#4A6FFF', fontWeight: 'bold' },
  subItemsWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp('6%'),
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('1%'),
  },
  subItemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    padding: wp('4.5%'),
    borderRadius: wp('5%'),
    marginBottom: hp('1.5%'),
  },
  textContainer: {
    flex: 1, 
    flexShrink: 1, // Added this to prevent the text from pushing the switch
    marginRight: wp('3%'),
  },
  subItemTitle: { fontSize: wp('3.8%'), fontWeight: '700', color: '#1E293B' },
  subItemSubText: { fontSize: wp('3%'), color: '#94A3B8', marginTop: hp('0.5%'), lineHeight: wp('4%') },
  statusBadge: { backgroundColor: '#CBD5E1', paddingHorizontal: wp('3%'), paddingVertical: hp('0.5%'), borderRadius: wp('2%') },
  statusText: { fontSize: wp('3%'), color: '#64748B', fontWeight: '600' },
  switchWrapper: {
    // Ensuring a fixed area for the switch so iOS doesn't compress it
    width: 55, 
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  }
});

export default SettingAccordion;