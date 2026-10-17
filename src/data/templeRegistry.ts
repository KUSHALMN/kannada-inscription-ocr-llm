export interface TempleHeritageSite {
  id: string;
  name: string;
  kannadaName: string;
  dynasty: string;
  century: string;
  location: {
    village: string;
    taluk: string;
    district: string;
    state: string;
  };
  architecturalStyle: string;
  patronRuler: string;
  primaryDeityOrTheme: string;
  inscriptionHighlights: string[];
  imageUrl: string;
  galleryImages: string[];
  unescoStatus?: string;
  epigraphCount: number;
  description: string;
  kannadaDescription: string;
  sampleInscriptionId: string;
}

export const KARNATAKA_TEMPLE_HERITAGE: TempleHeritageSite[] = [
  {
    id: 'belur-chennakeshava',
    name: 'Belur Chennakeshava Temple',
    kannadaName: 'ಬೇಲೂರು ಚೆನ್ನಕೇಶವ ದೇವಾಲಯ',
    dynasty: 'Hoysala Empire',
    century: '12th Century CE (1117 CE)',
    location: {
      village: 'Belur',
      taluk: 'Belur',
      district: 'Hassan',
      state: 'Karnataka'
    },
    architecturalStyle: 'Hoysala Ekakuta (Chloritic Schist / Soapstone)',
    patronRuler: 'King Vishnuvardhana (Bittideva)',
    primaryDeityOrTheme: 'Lord Vijayanarayana / Chennakeshava',
    inscriptionHighlights: [
      'Consecration charter commemorating the conquest of Talakadu (1117 CE)',
      'Sculptor signature epigraphs of Dasoja of Balligavi and Mallitamma',
      'Ornate Hoysala Old Kannada inscriptions on star-shaped basement plinths'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010f443b745?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Chennakeshava_Temple%2C_Belur.jpg/1280px-Chennakeshava_Temple%2C_Belur.jpg',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=1200'
    ],
    unescoStatus: 'UNESCO World Heritage Site (Sacred Ensembles of the Hoysalas)',
    epigraphCount: 118,
    description: 'Commissioned by King Vishnuvardhana in 1117 CE on the banks of the Yagachi river to mark his decisive victory over the Cholas at Talakadu. The temple walls contain hundreds of exquisite Old Kannada inscriptions engraved on soft soapstone with calligraphic mastery.',
    kannadaDescription: 'ತಲಕಾಡು ವಿಜಯದ ಸವಿನೆನಪಿಗಾಗಿ ಹೊಯ್ಸಳ ದೊರೆ ವಿಷ್ಣುವರ್ಧನನು ಕ್ರಿ.ಶ. 1117ರಲ್ಲಿ ಯಗಚಿ ನದಿಯ ದಂಡೆಯ ಮೇಲೆ ನಿರ್ಮಿಸಿದ ಸುಪ್ರಸಿದ್ಧ ಕಲಾ ದೇವಾಲಯ. ಇಲ್ಲಿನ ನಕ್ಷತ್ರಾಕಾರದ ಜಗುಲಿಯ ಮೇಲೆ ಕಡೆದಿರುವ ಹಳೆಗನ್ನಡ ಶಾಸನಗಳು ಅಪ್ರತಿಮ ಸಾಹಿತ್ಯಿಕ ಮೌಲ್ಯವನ್ನು ಹೊಂದಿವೆ.',
    sampleInscriptionId: 'ins-belur-004'
  },
  {
    id: 'halebidu-hoysaleswara',
    name: 'Halebidu Hoysaleswara Temple',
    kannadaName: 'ಹಳೇಬೀಡು ಹೊಯ್ಸಳೇಶ್ವರ ದೇವಾಲಯ',
    dynasty: 'Hoysala Empire',
    century: '12th Century CE (1121 CE)',
    location: {
      village: 'Halebidu (Dwarasamudra)',
      taluk: 'Belur',
      district: 'Hassan',
      state: 'Karnataka'
    },
    architecturalStyle: 'Hoysala Dvikuta (Twin Sanctum, Chloritic Schist)',
    patronRuler: 'King Vishnuvardhana & Ketamalla',
    primaryDeityOrTheme: 'Lord Hoysaleswara & Shantaleswara (Shiva)',
    inscriptionHighlights: [
      'Foundation inscriptions recording grants by royal merchants and guild members',
      'Master carver labels: Kedaroja, Mallitamma, and Haripa',
      'Elaborate poetic epigraphs in Kanda and Vritta metres praising artists'
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Hoysaleswara_temple_in_Halebidu.jpg/1280px-Hoysaleswara_temple_in_Halebidu.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1599732497206-8b9d031cce16?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200'
    ],
    unescoStatus: 'UNESCO World Heritage Site (Sacred Ensembles of the Hoysalas)',
    epigraphCount: 94,
    description: 'The crowning jewel of Hoysala stone craft, featuring 35,000 intricately carved soapstone figures and detailed Old Kannada records identifying royal donors, architect guilds, and heroic defenders of Dwarasamudra.',
    kannadaDescription: 'ಹೊಯ್ಸಳ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿಯಾಗಿದ್ದ ದ್ವಾರಸಮುದ್ರದಲ್ಲಿ ನಿರ್ಮಿತವಾದ ಅವಳಿ ದೇವಾಲಯ. ಇಲ್ಲಿನ ಗೋಡೆಗಳಲ್ಲಿ 35,000ಕ್ಕೂ ಹೆಚ್ಚು ಶಿಲ್ಪಕಲಾ ಕೃತಿಗಳಿದ್ದು, ಅಸಂಖ್ಯಾತ ಹಳೆಗನ್ನಡ ಶಿಲಾಶಾಸನಗಳು ಇಲ್ಲಿನ ಇತಿಹಾಸವನ್ನು ಬಿಂಬಿಸುತ್ತವೆ.',
    sampleInscriptionId: 'ins-belur-004'
  },
  {
    id: 'hampi-virupaksha-vittala',
    name: 'Hampi Vittala & Virupaksha Temples',
    kannadaName: 'ಹಂಪಿ ವಿರೂಪಾಕ್ಷ ಮತ್ತು ವಿಜಯವಿಠ್ಠಲ ದೇವಾಲಯ',
    dynasty: 'Vijayanagara Empire',
    century: '14th – 16th Century CE',
    location: {
      village: 'Hampi',
      taluk: 'Hospet',
      district: 'Vijayanagara',
      state: 'Karnataka'
    },
    architecturalStyle: 'Vijayanagara Dravida (Dressed Granite)',
    patronRuler: 'Emperor Krishnadevaraya & Achyutaraya',
    primaryDeityOrTheme: 'Lord Virupaksha (Pampa Devi) & Lord Vittala',
    inscriptionHighlights: [
      'Krishnadevaraya coronation centenary slab (1509 CE) in Virupaksha temple',
      'Bilingual Kannada and Telugu copper plate charters and granite pillars',
      'Endowments for the iconic Stone Chariot (ಗರುಡ ರಥ) and musical hall'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stone_Chariot_Hampi.jpg/1280px-Stone_Chariot_Hampi.jpg',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200'
    ],
    unescoStatus: 'UNESCO World Heritage Site (Group of Monuments at Hampi)',
    epigraphCount: 520,
    description: 'The monumental epicenter of the Vijayanagara Empire along the Tungabhadra River. Features hundreds of granite inscriptions detailing royal coronations, international trade in Arabian horses, and endowments to temple academies.',
    kannadaDescription: 'ತುಂಗಭದ್ರಾ ನದಿಯ ತೀರದಲ್ಲಿ ಮೆರೆದ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ವಿಶ್ವವಿಖ್ಯಾತ ರಾಜಧಾನಿ. ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯನ ಪಟ್ಟಾಭಿಷೇಕದ ಶಾಸನಗಳು, ಕಲ್ಲಿನ ರಥ ಮತ್ತು ಸಂಗೀತ ಮಂಟಪದ ಮೇಲಿನ ಗ್ರಾನೈಟ್ ಶಾಸನಗಳು ಇಲ್ಲಿನ ಹೆಗ್ಗುರುತು.',
    sampleInscriptionId: 'ins-hampi-007'
  },
  {
    id: 'badami-cave-temples',
    name: 'Badami Cave Temples & Cliff Shrines',
    kannadaName: 'ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯಗಳು ಮತ್ತು ಕಪ್ಪೆ ಅರಭಟ್ಟ ಶಾಸನ',
    dynasty: 'Early Chalukyas of Vatapi',
    century: '6th – 8th Century CE',
    location: {
      village: 'Badami (Vatapi)',
      taluk: 'Badami',
      district: 'Bagalkote',
      state: 'Karnataka'
    },
    architecturalStyle: 'Rock-Cut Cave Architecture (Sandstone)',
    patronRuler: 'King Pulakeshin I, Mangalesha, & Kirtivarman I',
    primaryDeityOrTheme: 'Nataraja, Vishnu Trivikrama, & Jain Tirthankaras',
    inscriptionHighlights: [
      'Kappe Arabhatta inscription (c. 700 CE) – earliest known Kannada Tripadi meter poem',
      'Mangalesha rock edict of 578 CE recording consecration of Vaishnava Cave 3',
      'Oldest cliffside epigraphical benchmarks in Karnataka in Chalukyan script'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1628082697850-d4fb7976e1a4?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Badami_cave_temple_1_front.jpg/1280px-Badami_cave_temple_1_front.jpg',
      'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&q=80&w=1200'
    ],
    unescoStatus: 'Tentative UNESCO World Heritage Site',
    epigraphCount: 85,
    description: 'Chiseled into the dramatic red sandstone cliffs overlooking Agastya Lake, Badami preserves foundational Chalukyan inscriptions, including the famous poetic moral philosophy of Kappe Arabhatta composed in three-line Tripadi verse.',
    kannadaDescription: 'ಅಗಸ್ತ್ಯ ತೀರ್ಥದ ಸುತ್ತಲೂ ಹರಡಿರುವ ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಬಂಡೆಗಳನ್ನು ಕೊರೆದು ನಿರ್ಮಿಸಿದ ಭವ್ಯ ಗುಹೆಗಳು. ಇಲ್ಲಿನ ಬಂಡೆಯ ಮೇಲೆ ಕೆತ್ತಲಾದ ಕಪ್ಪೆ ಅರಭಟ್ಟನ ತ್ರಿಪದಿ ಶಾಸನವು ಕನ್ನಡ ಛಂದಸ್ಸಿನ ಮೊಟ್ಟಮೊದಲ ಕಾವ್ಯಮಯ ಉಲ್ಲೇಖವಾಗಿದೆ.',
    sampleInscriptionId: 'ins-badami-003'
  },
  {
    id: 'pattadakal-monuments',
    name: 'Pattadakal UNESCO Temple Complex',
    kannadaName: 'ಪಟ್ಟದಕಲ್ಲು ದೇವಾಲಯಗಳ ಸಂಕೀರ್ಣ',
    dynasty: 'Badami Chalukyas',
    century: '7th – 8th Century CE',
    location: {
      village: 'Pattadakal (Kisuvolal)',
      taluk: 'Badami',
      district: 'Bagalkote',
      state: 'Karnataka'
    },
    architecturalStyle: 'Vesara / Synthesis of Nagara & Dravida',
    patronRuler: 'Emperor Vikramaditya II & Queen Lokamahadevi',
    primaryDeityOrTheme: 'Lord Virupaksha & Mallikarjuna',
    inscriptionHighlights: [
      'Lokamahadevi conquest inscription celebrating the capture of Kanchipuram',
      'Architect recognition inscription honoring master builder Gundan Anivaritachari',
      'Bilingual Old Kannada and Sanskrit royal Prashastis'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pattadakal_temple_complex.jpg/1280px-Pattadakal_temple_complex.jpg'
    ],
    unescoStatus: 'UNESCO World Heritage Site (1987)',
    epigraphCount: 42,
    description: 'The sacred royal coronation grounds of the Chalukyan dynasty where northern Nagara and southern Dravida architectural traditions merged. Inscriptions here uniquely bestow imperial titles upon court architects and masons.',
    kannadaDescription: 'ಚಾಲುಕ್ಯ ಚಕ್ರವರ್ತಿಗಳ ಪಟ್ಟಾಭಿಷೇಕ ಸ್ಥಳ. ಇಲ್ಲಿನ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯದಲ್ಲಿರುವ ಶಾಸನಗಳಲ್ಲಿ ಕಂಚಿಯ ಪಲ್ಲವರನ್ನು ಗೆದ್ದ ವಿಜಯೋತ್ಸವ ಮತ್ತು ದೇವಾಲಯವನ್ನು ನಿರ್ಮಿಸಿದ ಮುಖ್ಯ ವಾಸ್ತುಶಿಲ್ಪಿ ಗುಂಡನ್ ಅನಿವಾರಿತಾಚಾರಿಗೆ ನೀಡಿದ ಗೌರವ ದಾಖಲಾಗಿದೆ.',
    sampleInscriptionId: 'ins-badami-003'
  },
  {
    id: 'aihole-meguti-durga',
    name: 'Aihole Meguti Hill & Durga Temple',
    kannadaName: 'ಐಹೊಳೆ ದುರ್ಗಾ ದೇವಾಲಯ ಮತ್ತು ರವಿಕೀರ್ತಿ ಪ್ರಶಸ್ತಿ',
    dynasty: 'Badami Chalukyas',
    century: '5th – 8th Century CE (634 CE)',
    location: {
      village: 'Aihole (Aryapura)',
      taluk: 'Hunagund',
      district: 'Bagalkote',
      state: 'Karnataka'
    },
    architecturalStyle: 'Apsidal Gajaprashtha & Early Structural Stone',
    patronRuler: 'Emperor Pulakeshin II & Court Poet Ravikirti',
    primaryDeityOrTheme: 'Durga, Surya, and Meguti Jinalaya',
    inscriptionHighlights: [
      'Famous Aihole Prashasti (634 CE) by Ravikirti in Old Kannada script',
      'Historical record of Pulakeshin II defeating Emperor Harsha on Narmada River',
      'Earliest epigraphical cross-dating linking the Mahabharata war and Saka era'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Durga_Temple_Aihole.jpg/1280px-Durga_Temple_Aihole.jpg'
    ],
    unescoStatus: 'Tentative UNESCO World Heritage Site',
    epigraphCount: 130,
    description: 'Renowned as the laboratory of Indian temple architecture with over 120 stone temples. On the eastern wall of the Meguti temple sits the world-famous 634 CE inscription recording the military conquests of Pulakeshin II across the subcontinent.',
    kannadaDescription: 'ಭಾರತೀಯ ವಾಸ್ತುಶಿಲ್ಪದ ತೊಟ್ಟಿಲು ಎಂದು ಕರೆಯಲಾಗುವ ಐಹೊಳೆಯ ಮೇಗುತಿ ಬೆಟ್ಟದ ಮೇಲಿರುವ ಜೈನ ಮಂದಿರದ ಶಾಸನವು (ಕ್ರಿ.ಶ. ೬೩೪) ಉತ್ತರ ಭಾರತದ ಹರ್ಷವರ್ಧನನನ್ನು ನರ್ಮದಾ ನದಿಯ ತೀರದಲ್ಲಿ ಸೋಲಿಸಿದ ಇಮ್ಮಡಿ ಪುಲಕೇಶಿಯ ಸಾಹಸವನ್ನು ವರ್ಣಿಸುತ್ತದೆ.',
    sampleInscriptionId: 'ins-aihole-005'
  },
  {
    id: 'halmidi-heritage-stele',
    name: 'Halmidi Kadamba Stele & Temple',
    kannadaName: 'ಹಲ್ಮಿಡಿ ವೀರಗಲ್ಲು ಮತ್ತು ಮಲ್ಲಿಕಾರ್ಜುನ ಮಂದಿರ',
    dynasty: 'Kadambas of Banavasi',
    century: 'c. 450 CE (5th Century CE)',
    location: {
      village: 'Halmidi',
      taluk: 'Belur',
      district: 'Hassan',
      state: 'Karnataka'
    },
    architecturalStyle: 'Early Kadamba Sandstone Stele Pillar',
    patronRuler: 'King Kakusthavarma',
    primaryDeityOrTheme: 'Heroic Commemoration (Balgachu Viragallu)',
    inscriptionHighlights: [
      'First officially verified stone epigraph in Classical Kannada language',
      'Kadamba box-headed script (ಪೇಟಿಕಾ-ಶೀರ್ಷ ಲಿಪಿ)',
      '16 lines recording a battle honor grant by commanders Mrigesha and Nagendra'
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Halmidi_inscription.jpg/800px-Halmidi_inscription.jpg',
    galleryImages: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Madhukeshwara_temple%2C_Banavasi.jpg/1280px-Madhukeshwara_temple%2C_Banavasi.jpg'
    ],
    epigraphCount: 6,
    description: 'The monumental cradle of the Kannada language. Discovered in 1936 by Dr. M. H. Krishna embedded in the village temple wall, this sandstone pillar proved that Kannada was an advanced administrative and literary tongue by the mid-5th century CE.',
    kannadaDescription: 'ಕನ್ನಡ ಭಾಷೆಯ ಉಗಮ ಮತ್ತು ಅಸ್ಮಿತೆಯ ಹೆಮ್ಮೆಯ ಪ್ರತೀಕ. ಕ್ರಿ.ಶ. ೪೫೦ರ ಕಾಲದ ಈ ಶಿಲಾಶಾಸನವು ಕದಂಬ ರಾಜ ಕಾಕುಸ್ಥವರ್ಮನ ಕಾಲದ ವೀರಯೋಧ ವಿಜಯರಸನಿಗೆ ನೀಡಲಾದ ಬಾಳ್ಗಚ್ಚು ಭೂದಾನವನ್ನು ಹಳೆಗನ್ನಡದಲ್ಲಿ ಸಾರುತ್ತದೆ.',
    sampleInscriptionId: 'ins-halmidi-001'
  },
  {
    id: 'shravanabelagola-gommata',
    name: 'Shravanabelagola Vindhyagiri Hill',
    kannadaName: 'ಶ್ರವಣಬೆಳಗೊಳ ವಿಂಧ್ಯಗಿರಿ ಗೊಮ್ಮಟೇಶ್ವರ ಶಾಸನಗಳು',
    dynasty: 'Western Ganga Dynasty & Hoysalas',
    century: '10th – 14th Century CE (981 CE)',
    location: {
      village: 'Shravanabelagola',
      taluk: 'Channarayapatna',
      district: 'Hassan',
      state: 'Karnataka'
    },
    architecturalStyle: 'Monolithic Granite Colossus (57 feet)',
    patronRuler: 'Chavundaraya (Minister of Ganga King Rachamalla IV)',
    primaryDeityOrTheme: 'Lord Bahubali (Gommateshwara)',
    inscriptionHighlights: [
      'Chavundaraya consecration inscription in Halegannada: "ಶ್ರೀ ಚಾವುಂಡರಾಜಂ ಮಾಡಿಸಿದಂ"',
      'Trilingual inscriptions in Old Kannada, Tamil, and early Marathi at Bahubali feet',
      'Over 800 Sallekhana memorial Nishidhi stone epigraphs across Chandragiri Hill'
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Gommateshwara_Statue%2C_Shravanabelagola.jpg/1280px-Gommateshwara_Statue%2C_Shravanabelagola.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1600100397608-f010f443b745?auto=format&fit=crop&q=80&w=1200'
    ],
    epigraphCount: 840,
    description: 'Home to the magnificent 57-foot granite monolith of Bahubali consecrated in 981 CE. The rocky slopes of Vindhyagiri and Chandragiri hills bear hundreds of poetic Kannada inscriptions tracing a millennium of Jain ascetic philosophy and statecraft.',
    kannadaDescription: 'ಕ್ರಿ.ಶ. ೯೮೧ರಲ್ಲಿ ಗಂಗರ ಮಹಾಮಂತ್ರಿ ಚಾವುಂಡರಾಯನಿಂದ ಪ್ರತಿಷ್ಠಾಪಿಸಲ್ಪಟ್ಟ ೫೭ ಅಡಿ ಎತ್ತರದ ಭವ್ಯ ಬಾಹುಬಲಿ ವಿಗ್ರಹ. ಪಾದಗಳ ಬಳಿ ಇರುವ "ಶ್ರೀ ಚಾವುಂಡರಾಜಂ ಮಾಡಿಸಿದಂ" ಎಂಬ ಹಳೆಗನ್ನಡ ಶಾಸನವು ಜಾಗತಿಕ ಇತಿಹಾಸದಲ್ಲಿ ಚಿರಪರಿಚಿತವಾಗಿದೆ.',
    sampleInscriptionId: 'ins-belur-004'
  }
];
