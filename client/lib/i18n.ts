export type Locale = "en" | "hi";

const dictionaries: Record<Locale, Record<string, string>> = {
  en: {
    app_name: "CivicConnect Jharkhand",
    home: "Home",
    report: "Report",
    community: "Community",
    profile: "Profile",
    report_issue: "Report Issue",
    submit_issue: "Submit Issue",
    description: "Short description",
    category: "Category",
    optional_photo: "Photo (optional)",
    choose_file: "Choose file",
    location: "Location",
    select_on_map: "Select on map",
    urgency: "Mark as urgent",
    anonymous: "Report anonymously",
    my_issues: "My Issues",
    status_pending: "Pending",
    status_inprogress: "In-progress",
    status_resolved: "Resolved",
    categories: "Categories",
    pothole: "Pothole",
    garbage: "Garbage",
    streetlight: "Streetlight",
    water: "Water",
    drainage: "Drainage",
    encroachment: "Encroachment",
    language: "Language",
    english: "English",
    hindi: "Hindi",
    welcome_title: "Report civic issues quickly",
    welcome_sub:
      "Simple, fast reporting for Jharkhand with map location and one-tap status tracking.",
    view_map: "View Map",
    rewards: "Rewards",
    surveys: "Surveys",
    achievements: "Achievements",
    official_notice: "Official Notices",
  },
  hi: {
    app_name: "सिविककनेक्ट झारखंड",
    home: "होम",
    report: "रिपोर्ट",
    community: "समुदाय",
    profile: "प्रोफ़ाइल",
    report_issue: "समस्या दर्ज करें",
    submit_issue: "समस्या सबमिट करें",
    description: "संक्षिप्त विवरण",
    category: "श्रेणी",
    optional_photo: "फ़ोटो (ऐच्छिक)",
    choose_file: "फ़ाइल चुनें",
    location: "स्थान",
    select_on_map: "मानचित्र पर चुनें",
    urgency: "तत्काल चिह्नित करें",
    anonymous: "गुमनाम रिपोर्ट करें",
    my_issues: "मेरी समस्याएँ",
    status_pending: "लंबित",
    status_inprogress: "प्रगति पर",
    status_resolved: "सुलझा",
    categories: "श्रेणियाँ",
    pothole: "गड्ढा",
    garbage: "कूड़ा",
    streetlight: "स्ट्रीट लाइट",
    water: "पानी",
    drainage: "जल निकासी",
    encroachment: "अतिक्रमण",
    language: "भाषा",
    english: "अंग्रेज़ी",
    hindi: "हिंदी",
    welcome_title: "नागरिक समस्याएँ तुरंत दर्ज करें",
    welcome_sub:
      "झारखंड के लिए सरल, तेज़ रिपोर्टिंग — मानचित्र ���्थान और एक-टैप ट्रैकिंग सहित।",
    view_map: "मानचित्र देखें",
  },
};

export function getInitialLocale(): Locale {
  const saved = localStorage.getItem("locale");
  if (saved === "en" || saved === "hi") return saved;
  return "en";
}

export function tFor(locale: Locale) {
  return (key: keyof (typeof dictionaries)["en"]) =>
    dictionaries[locale][key] ?? key;
}

export function allStrings(locale: Locale) {
  return dictionaries[locale];
}
