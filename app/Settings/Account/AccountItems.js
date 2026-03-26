export const AccountItems = [
  { 
    title: "Profile details", 
    subText: "View and manage your personal details such as name, photo, and college ID.",
    route: "/Settings/Account/ProfileDetails"
  },
  { 
    title: "Linked Account", 
    subText: "Shows the linked parent or student account connected to this profile.", 
    route: "/Settings/Account/LinkedAccount"
  },
  { 
    title: "Logout", 
    subText: "Securely sign out from this device.", 
    isDestructive: true 
  },
];
export default function DataOnly() { return null; }