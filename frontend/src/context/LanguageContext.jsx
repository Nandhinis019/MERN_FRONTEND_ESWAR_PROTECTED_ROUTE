import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Header
    deliverTo: 'Deliver to',
    searchPlaceholder: 'Search ZOVAi.in',
    hello: 'Hello',
    signIn: 'Sign in',
    accountLists: 'Account & Lists',
    returns: 'Returns',
    orders: '& Orders',
    cart: 'Cart',
    
    // Navigation
    all: 'All',
    electronics: 'Electronics',
    fashion: 'Fashion',
    homeKitchen: 'Home & Kitchen',
    books: 'Books',
    sports: 'Sports',
    sell: 'Sell',
    
    // Products
    allProducts: 'All Products',
    searchResults: 'Search results for',
    discountedProducts: 'Discounted Products',
    results: 'results',
    noProductsFound: 'No products found',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    view: 'View',
    delete: 'Delete',
    
    // Product Names
    iPhone17Pro: 'iPhone 17 Pro 256 GB',
    amazonEcho: 'Amazon Echo (4th Gen)',
    sonyCamera: 'Sony Alpha ILCE-6700M Mirrorless Camera',
    eilikRobot: 'Eilik Energize Lab Robot Toy',
    mensNecklace: 'Fashion Frill Men\'s Geometric Locket Necklace',
    womensDress: 'OM SAI Women\'s Button Front Shirt Dress',
    womensTop: 'Women\'s Full Sleeves Ruched Lycra Top',
    
    // Banner
    festivalSale: 'Great Indian Festival Sale!',
    saleDescription: 'Up to 80% off on Electronics, Fashion & More!'
  },
  
  ta: {
    // Header
    deliverTo: 'டெலிவரி செய்ய',
    searchPlaceholder: 'ZOVAi.in இல் தேடுங்கள்',
    hello: 'வணக்கம்',
    signIn: 'உள்நுழைய',
    accountLists: 'கணக்கு & பட்டியல்கள்',
    returns: 'திரும்பப்',
    orders: '& ஆர்டர்கள்',
    cart: 'கார்ட்',
    
    // Navigation
    all: 'அனைத்தும்',
    electronics: 'எலக்ட்ரானிக்ஸ்',
    fashion: 'ஃபேஷன்',
    homeKitchen: 'வீடு & சமையலறை',
    books: 'புத்தகங்கள்',
    sports: 'விளையாட்டு',
    sell: 'விற்க',
    
    // Products
    allProducts: 'அனைத்து தயாரிப்புகள்',
    searchResults: 'தேடல் முடிவுகள்',
    discountedProducts: 'தள்ளுபடி தயாரிப்புகள்',
    results: 'முடிவுகள்',
    noProductsFound: 'தயாரிப்புகள் கிடைக்கவில்லை',
    addToCart: 'கார்ட்டில் சேர்க்க',
    buyNow: 'இப்போது வாங்க',
    view: 'பார்க்க',
    delete: 'நீக்க',
    
    // Product Names
    iPhone17Pro: 'iPhone 17 Pro 256 GB',
    amazonEcho: 'Amazon Echo (4வது தலைமுறை)',
    sonyCamera: 'Sony Alpha ILCE-6700M மிரர்லெஸ் கேமரா',
    eilikRobot: 'Eilik Energize Lab ரோபோ பொம்மை',
    mensNecklace: 'ஃபேஷன் ஃப்ரில் ஆண்களுக்கான ஜியோமெட்ரிக் லாக்கெட் நெக்லேஸ்',
    womensDress: 'OM SAI பெண்களுக்கான பட்டன் ஃப்ரண்ட் ஷர்ட் டிரஸ்',
    womensTop: 'பெண்களுக்கான முழு கை ருச்ட் லைக்ரா டாப்',
    
    // Banner
    festivalSale: 'பெரிய இந்திய திருவிழா விற்பனை!',
    saleDescription: 'எலக்ட்ரானிக்ஸ், ஃபேஷன் மற்றும் பலவற்றில் 80% வரை தள்ளுபடி!'
  },
  
  hi: {
    // Header
    deliverTo: 'डिलीवर करें',
    searchPlaceholder: 'ZOVAi.in में खोजें',
    hello: 'नमस्ते',
    signIn: 'साइन इन करें',
    accountLists: 'खाता और सूचियां',
    returns: 'रिटर्न',
    orders: 'और ऑर्डर',
    cart: 'कार्ट',
    
    // Navigation
    all: 'सभी',
    electronics: 'इलेक्ट्रॉनिक्स',
    fashion: 'फैशन',
    homeKitchen: 'घर और रसोई',
    books: 'किताबें',
    sports: 'खेल',
    sell: 'बेचें',
    
    // Products
    allProducts: 'सभी उत्पाद',
    searchResults: 'खोज परिणाम',
    discountedProducts: 'छूट वाले उत्पाद',
    results: 'परिणाम',
    noProductsFound: 'कोई उत्पाद नहीं मिला',
    addToCart: 'कार्ट में जोड़ें',
    buyNow: 'अभी खरीदें',
    view: 'देखें',
    delete: 'हटाएं',
    
    // Product Names
    iPhone17Pro: 'iPhone 17 Pro 256 GB',
    amazonEcho: 'Amazon Echo (4वीं पीढ़ी)',
    sonyCamera: 'Sony Alpha ILCE-6700M मिररलेस कैमरा',
    eilikRobot: 'Eilik Energize Lab रोबोट खिलौना',
    mensNecklace: 'फैशन फ्रिल पुरुषों का ज्यामितीय लॉकेट नेकलेस',
    womensDress: 'OM SAI महिलाओं की बटन फ्रंट शर्ट ड्रेस',
    womensTop: 'महिलाओं का फुल स्लीव्स रुच्ड लाइक्रा टॉप',
    
    // Banner
    festivalSale: 'महान भारतीय त्योहार बिक्री!',
    saleDescription: 'इलेक्ट्रॉनिक्स, फैशन और अधिक पर 80% तक की छूट!'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
    }
  };

  const t = (key) => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};