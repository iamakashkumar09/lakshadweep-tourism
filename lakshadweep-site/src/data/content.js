export const TRANSLATIONS = {
  en: {
    nav: {
      plan: "Plan Trip",
      islands: "Islands",
      travel: "Travel Info",
      stay: "Stays",
      book: "Book Now",
      dashboard: "My Trips",
      login: "Log In",
      home: "Home",
      search_placeholder: "Search paradise..."
    },
    hero: {
      tag: "#VisitLakshadweep",
      title: "Discover the Coral Paradise",
      subtitle: "Experience India's most pristine archipelago. Turquoise lagoons, coral reefs, and untouched beaches await.",
      cta_plan: "Start Planning",
      cta_permits: "Permit Info"
    },
    sections: {
      plan_subtitle: "Curated Packages",
      plan_title: "Popular Itineraries",
      plan_desc: "Choose from our best-selling packages designed for every type of traveler.",
      islands_subtitle: "Destinations",
      islands_title: "Explore the Islands",
      islands_desc: "From the bustling capital to uninhabited sandbanks.",
      permits_subtitle: "Important",
      permits_title: "Entry Permits",
      permits_desc: "Lakshadweep is a restricted area. All visitors need a permit to enter.",
      travel_subtitle: "Getting Here",
      travel_title: "How to Reach",
      travel_desc: "Flights and ships operate from Kochi, Kerala.",
      footer_desc: "The official guide for tourism in Lakshadweep."
    },
    search: {
      placeholder: "Search for Agatti, Scuba, Ferries...",
      no_results: "No results found.",
      quick_links: "Popular Searches",
      results_for: "Results for"
    }
  },
  hi: {
    nav: {
      plan: "यात्रा योजना",
      islands: "द्वीप",
      travel: "यात्रा जानकारी",
      stay: "ठहरें",
      book: "बुक करें",
      dashboard: "मेरी यात्राएं",
      login: "लॉग इन",
      home: "होम",
      search_placeholder: "खोजें..."
    },
    hero: {
      tag: "#VisitLakshadweep",
      title: "कोरल स्वर्ग की खोज करें",
      subtitle: "भारत के सबसे प्राचीन द्वीपसमूह का अनुभव करें। फिरोजा लैगून और अछूते समुद्र तट आपका इंतजार कर रहे हैं।",
      cta_plan: "योजना बनाएं",
      cta_permits: "परमिट जानकारी"
    },
    sections: {
      plan_subtitle: "पैकेज",
      plan_title: "लोकप्रिय यात्रा कार्यक्रम",
      plan_desc: "हर प्रकार के यात्री के लिए डिज़ाइन किए गए हमारे सबसे अधिक बिकने वाले पैकेजों में से चुनें।",
      islands_subtitle: "गंतव्य",
      islands_title: "द्वीपों का अन्वेषण करें",
      islands_desc: "हलचल वाली राजधानी से लेकर निर्जन रेतीले तटों तक।",
      permits_subtitle: "महत्वपूर्ण",
      permits_title: "प्रवेश परमिट",
      permits_desc: "लक्षद्वीप एक प्रतिबंधित क्षेत्र है। सभी आगंतुकों को प्रवेश करने के लिए परमिट की आवश्यकता होती है।",
      travel_subtitle: "यहाँ कैसे पहुँचें",
      travel_title: "कैसे पहुंचें",
      travel_desc: "कोच्चि, केरल से उड़ानें और जहाज संचालित होते हैं।",
      footer_desc: "लक्षद्वीप में पर्यटन के लिए आधिकारिक गाइड।"
    },
    search: {
      placeholder: "अगाती, स्कूबा, फेरी खोजें...",
      no_results: "कोई परिणाम नहीं मिला।",
      quick_links: "लोकप्रिय खोजें",
      results_for: "परिणाम"
    }
  }
};

export const ISLANDS_DATA = [
  {
    id: 1,
    name: "Kavaratti",
    name_hi: "कवरत्ती",
    tag: "Capital",
    image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=1000&auto=format&fit=crop",
    desc: "The administrative capital featuring beautiful mosques and marine life.",
    desc_hi: "सुंदर मस्जिदों और समुद्री जीवन की विशेषता वाली प्रशासनिक राजधानी।",
    long_desc: "Kavaratti is the most developed island and the administrative capital of Lakshadweep. It is famous for its 52 mosques, the most beautiful being the Ujra Mosque. The island has a calm lagoon ideal for water sports, swimming, and basking on warm sandy beaches. The Marine Aquarium here is a major attraction, showcasing a vast collection of marine specimens.",
    highlights: ["Ujra Mosque", "Marine Aquarium", "Glass Bottom Boats", "Water Sports"],
    rating: 4.8,
    price: 15000
  },
  {
    id: 2,
    name: "Agatti",
    name_hi: "अगाती",
    tag: "Airport",
    image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1000&auto=format&fit=crop",
    desc: "Gateway to the islands with a stunning turquoise lagoon.",
    desc_hi: "शानदार फिरोजा लैगून के साथ द्वीपों का प्रवेश द्वार।",
    long_desc: "Agatti is the gateway to the archipelago, hosting the only airport. The island is known for its breathtakingly beautiful lagoon, one of the largest in Lakshadweep. The coral growth and multi-colored coral fishes abound in its lagoons. Fishing is the most important industry of Agatti which is perhaps one of the few islands where surplus fish is processed.",
    highlights: ["Golden Jubilee Museum", "Lagoon Fishing", "Cycling", "Kayaking"],
    rating: 4.9,
    price: 18000
  },
  {
    id: 3,
    name: "Bangaram",
    name_hi: "बंगाराम",
    tag: "Resort",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1000&auto=format&fit=crop",
    desc: "Uninhabited island famous for phosphorescent plankton.",
    desc_hi: "फॉस्फोरसेंट प्लवक के लिए प्रसिद्ध निर्जन द्वीप।",
    long_desc: "Bangaram is an uninhabited island that is open to international tourists. It is teardrop-shaped and enclosed by a coral reef. The island is known for its phosphorescent plankton that washes ashore at night, giving the beach a bluish glow. It is a haven for those seeking solitude and absolute peace.",
    highlights: ["Bioluminescence", "Shipwreck Diving", "Private Beach", "Snorkeling"],
    rating: 5.0,
    price: 25000
  },
  {
    id: 4,
    name: "Minicoy",
    name_hi: "मिनिकॉय",
    tag: "Culture",
    image: "https://images.unsplash.com/photo-1514282401047-d77a7149faf9?q=80&w=1000&auto=format&fit=crop",
    desc: "Southernmost island with strong Maldivian cultural influences.",
    desc_hi: "मजबूत मालदीव सांस्कृतिक प्रभावों वाला सबसे दक्षिणी द्वीप।",
    long_desc: "Minicoy is geographically isolated from the other islands and has a culture very different from the northern group. The culture, language (Mahl), and lifestyle are very similar to the Maldives. It has a cluster of 10 villages, which are known as 'Athiris'. The lighthouse built in 1885 by the British is a major attraction.",
    highlights: ["Lighthouse", "Tuna Canning Factory", "Traditional Lava Dance", "Village Walk"],
    rating: 4.7,
    price: 20000
  },
  {
    id: 5,
    name: "Kalpeni",
    name_hi: "कल्पेनी",
    tag: "Coral",
    image: "https://images.unsplash.com/photo-1589979481223-deb89306920f?q=80&w=1000&auto=format&fit=crop",
    desc: "Features a huge shallow lagoon and three satellite islets.",
    desc_hi: "एक विशाल उथले लैगून और तीन उपग्रह टापुओं की सुविधा है।",
    long_desc: "Kalpeni is known for its three satellite islands: Cheriyam, Tilakkam, and Pitti. A huge storm bank of coral debris along the eastern and southeastern shorelines is a unique feature. The lagoon here is huge and shallow, making it perfect for water sports like reef walking and sailing.",
    highlights: ["Coral Debris Bank", "Reef Walking", "Sailing", "Folk Arts"],
    rating: 4.6,
    price: 16000
  }
];

export const PACKAGES_DATA = [
  { id: 'p1', title: "Weekend Bliss", title_hi: "वीकेंड आनंद", days: "3 Days", route: "Kochi → Agatti → Bangaram", desc: "Quick getaway to the most accessible islands.", desc_hi: "सबसे सुलभ द्वीपों के लिए त्वरित पलायन।", price: 25000 },
  { id: 'p2', title: "Island Hopper", title_hi: "आइलैंड हूपर", days: "5 Days", route: "Agatti · Bangaram · Thinnakara", desc: "Experience the uninhabited islands and pristine beaches.", desc_hi: "निर्जन द्वीपों और प्राचीन समुद्र तटों का अनुभव करें।", price: 40000 },
  { id: 'p3', title: "Complete Lakshadweep", title_hi: "पूर्ण लक्षद्वीप", days: "7 Days", route: "Kavaratti · Kalpeni · Minicoy", desc: "Deep dive into the culture and remote atolls.", desc_hi: "संस्कृति और दूरस्थ एटोल में गहरा गोता लगाएँ।", price: 60000 }
];