export const NotificationItems = [
  { 
    title: "Campus Entry Alert", 
    subText: "Notifies when the student enters the campus.",
    hasSwitch: true,
    defaultVal: false 
  },
  { 
    title: "Campus Exit Alert", 
    subText: "Notifies when the student leaves the campus.",
    hasSwitch: true,
    defaultVal: false 
  },
  { 
    title: "Location Disabled Alert", 
    subText: "Alerts when location services are turned off for a long time.",
    hasSwitch: true,
    defaultVal: true 
  },
  { 
    title: "Emergency Alert", 
    subText: "Sends immediate alerts during emergencies.",
    hasSwitch: true,
    defaultVal: true 
  },
  { 
    title: "Do Not Disturb", 
    subText: "Temporarily mute non-critical notifications.",
    hasSwitch: true,
    defaultVal: false 
  },
];

export default function Dummy() { return null; }