export const PreferenceItems = [
  { 
    title: "language", 
    subText: "English",
  },
  { 
    title: "Theme", 
    subText: "Light",
  },
  { 
    title: "Map View", 
    subText: "Default",
  },
  { 
    title: "Low Data Mode", 
    subText: "Limits background updates to save data.",
    hasSwitch: true,
    defaultVal: false 
  },
];
export default function DataOnly() { return null; }