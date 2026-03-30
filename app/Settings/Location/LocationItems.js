export const LocationItems = [
  { 
    title: "Location Permission", 
    subText: "Allows the app to access your location.",
    status: "Enabled" // This will show the gray badge
  },
  { 
    title: "Tracking Status", 
    subText: "Live location sharing is active.",
    hasSwitch: true,
    defaultVal: true 
  },
  { 
    title: "Campus Tracking", 
    subText: "Automatically detects campus entry and exit.",
  },
  { 
    title: "Indoor Location", 
    subText: "Uses campus Wi-Fi for indoor detection.\nStatus: Connected",
  },
  { 
    title: "Last Known Location", 
    subText: "Library Block • 2:10 PM",
  },
];
export default function DataOnly() { return null; }