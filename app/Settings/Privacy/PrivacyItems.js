export const PrivacyItems = [
  { 
    title: "Data Sharing Consent", 
    subText: "Allows sharing location data with linked parents.",
    hasSwitch: true,
    defaultVal: false 
  },
  { 
    title: "Location Usage Information", 
    subText: "How and when your location data is used.",
    route: "Settings/Privacy/LocationUsageInformation"
  },
  { 
    title: "Visibility Rules", 
    subText: "Location visible during college hours.",
     route: "Settings/Privacy/VisibilityRules"
  },
  { 
    title: "Privacy Policy & Terms", 
    subText: "Read our privacy policy and terms.",
    route: "Settings/Privacy/PrivacyPolicyTerms"
  },
];
export default function DataOnly() { return null; }