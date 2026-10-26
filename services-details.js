const SERVICES_DATA = {
  'professional-cleaning': {
    slug: 'professional-cleaning',
    title: 'Professional Cleaning',
    eyebrow: 'PREVENTIVE DENTAL CARE',
    heroTitle: 'A Cleaner Smile Starts With the Right Care.',
    heroDescription: 'Professional dental cleaning helps remove plaque and tartar that regular brushing may miss. Your dental professional can also provide guidance tailored to your oral hygiene needs.',
    heroImage: 'assets/images/service_cleaning.jpg',
    overviewTitle: 'Gentle Hygiene Designed for Long-Term Oral Health.',
    overviewParagraphs: [
      'Over time, mineralized plaque and bacterial biofilm build up in areas of the mouth that are difficult to reach with standard brushing and flossing alone. Left untreated, this tartar can irritate gum tissues and contribute to gingivitis and enamel demineralization.',
      'Our dental hygienists utilize modern ultrasonic scaling instruments alongside gentle airflow polishing to thoroughly cleanse tooth surfaces and subgingival margins. Every appointment concludes with personalized home hygiene recommendations and remineralizing fluoride polish.'
    ],
    overviewImage: 'assets/images/about_clinic_interior.jpg',
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
        title: 'Plaque & Tartar Removal',
        desc: 'Eliminates calcified deposits and bacterial biofilms from hard-to-reach tooth surfaces and between teeth.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
        title: 'Support for Gum Health',
        desc: 'Protects delicate gingival margins against inflammation, bleeding, and early-stage periodontal disease.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
        title: 'Personalized Oral Guidance',
        desc: 'Receive tailored coaching on flossing techniques, interdental brushes, and optimal toothpaste selection.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
        title: 'Early Concern Detection',
        desc: 'Enables our clinicians to identify microscopic cavity lesions or gum pocketing before discomfort arises.'
      }
    ],
    processSteps: [
      { num: '01', title: 'Initial Oral Assessment', desc: 'Visual examination of your gum tissue, plaque indices, and enamel conditions.' },
      { num: '02', title: 'Professional Cleaning', desc: 'Gentle ultrasonic scaling to dislodge tartar followed by fine hand instrumentation.' },
      { num: '03', title: 'Airflow Polishing', desc: 'Micro-fine powder stream removes exterior coffee, tea, and tobacco surface stains.' },
      { num: '04', title: 'Recommended Follow-Up', desc: 'Fluoride application and scheduling your ideal 6-month preventive recall.' }
    ],
    faqs: [
      {
        q: 'How often should I have professional dental cleaning?',
        a: 'For most healthy adults, dental professionals recommend a professional cleaning every six months. Patients with a history of gingivitis or orthodontic appliances may benefit from cleanings every three to four months.'
      },
      {
        q: 'Is a professional cleaning uncomfortable or painful?',
        a: 'Modern ultrasonic instruments use gentle vibrations and cooled water mist, minimizing discomfort. If you have sensitive root surfaces or dental anxiety, we offer topical numbing gels to ensure a calm visit.'
      },
      {
        q: 'How long does a typical appointment take?',
        a: 'A comprehensive hygiene cleaning and dental exam typically lasts between 45 to 60 minutes, allowing thorough care and personalized discussion.'
      },
      {
        q: 'What should I do immediately after my cleaning?',
        a: 'We recommend waiting 30 minutes before eating or drinking hot fluids if you received a topical fluoride treatment. Otherwise, you may resume normal activities immediately.'
      }
    ],
    ctaTitle: 'Give Your Smile the Care It Deserves.',
    ctaDescription: 'Schedule your gentle professional dental cleaning today and experience preventive wellness designed around your comfort.'
  },
  'dental-fillings': {
    slug: 'dental-fillings',
    title: 'Dental Fillings',
    eyebrow: 'RESTORATIVE DENTAL CARE',
    heroTitle: 'Restoring Strength With Natural Aesthetics.',
    heroDescription: 'Restore teeth affected by cavities or minor damage with an appropriate restorative treatment plan. Our tooth-colored composite resins blend seamlessly with your natural tooth shade.',
    heroImage: 'assets/images/service_fillings.jpg',
    overviewTitle: 'Restoring Your Tooth’s Natural Function & Beauty.',
    overviewParagraphs: [
      'When tooth enamel is compromised by bacterial decay or minor fracture, timely restorative treatment preserves structural integrity and prevents deep pulp infections.',
      'At Oralize, we utilize modern tooth-colored composite resins and ceramic inlays that bond directly to the tooth structure. These biocompatible restorations reinforce the remaining tooth walls while matching your natural enamel translucency.'
    ],
    overviewImage: 'assets/images/feature_dentist_tech.jpg',
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        title: 'Restoration of Tooth Structure',
        desc: 'Reinforces compromised tooth anatomy and halts the progression of bacterial decay.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
        title: 'Natural Enamel Aesthetics',
        desc: 'Custom shade-matching ensures the composite resin blends invisibly with adjacent teeth.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
        title: 'Support for Normal Chewing',
        desc: 'Restores the exact anatomical bite planes so you can chew comfortably without sensitivity.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>',
        title: 'Minimally Invasive Preparation',
        desc: 'Modern bonding techniques allow the dentist to preserve the maximum amount of healthy tooth structure.'
      }
    ],
    processSteps: [
      { num: '01', title: 'Dental Examination', desc: 'Digital x-rays and diagnostic transillumination identify the precise extent of decay.' },
      { num: '02', title: 'Gentle Preparation', desc: 'Careful removal of affected tooth structure under local anesthesia.' },
      { num: '03', title: 'Composite Placement', desc: 'Incremental resin application cured with specialized dental blue wavelength light.' },
      { num: '04', title: 'Bite Check & Polish', desc: 'Fine occlusal adjustments ensure your natural chewing balance is restored.' }
    ],
    faqs: [
      {
        q: 'How long do composite tooth-colored fillings last?',
        a: 'With good daily oral hygiene and regular dental checkups, modern composite fillings typically last 7 to 10 years or longer.'
      },
      {
        q: 'Will having a filling hurt?',
        a: 'No. The procedure is performed under gentle local anesthesia so you do not experience pain. Mild temperature sensitivity may occur for a few days afterward.'
      },
      {
        q: 'Can old silver amalgam fillings be replaced?',
        a: 'Yes, if old amalgam fillings have deteriorated or leak around the margins, your dentist can safely replace them with aesthetic tooth-colored composite resins.'
      },
      {
        q: 'Can I eat immediately after receiving a composite filling?',
        a: 'Because composite fillings are instantly cured with a dental curing light, you may eat once the numbness in your lips and cheeks has worn off.'
      }
    ],
    ctaTitle: 'Take the Next Step Toward a Healthier Tooth.',
    ctaDescription: 'Restore comfort and protect your tooth against further damage with an aesthetic composite filling.'
  },
  'braces-orthodontics': {
    slug: 'braces-orthodontics',
    title: 'Braces & Orthodontics',
    eyebrow: 'ORTHODONTIC CARE',
    heroTitle: 'A Harmonious Smile Built on Modern Alignment.',
    heroDescription: 'Explore orthodontic treatment options designed to improve dental alignment and bite function. From crystal-clear aligners to discreet ceramic brackets, we design smiles for life.',
    heroImage: 'assets/images/service_orthodontics.jpg',
    overviewTitle: 'Precision Orthodontics for Confident Alignment.',
    overviewParagraphs: [
      'Orthodontic treatment addresses more than just straight teeth—it aligns your upper and lower dental arches to optimize bite function, relieve jaw joint strain, and make daily oral hygiene easier.',
      'Our orthodontists use digital 3D intraoral scans to construct virtual step-by-step simulations. Patients can choose between virtually invisible clear aligners or low-profile ceramic braces tailored to their aesthetic preference.'
    ],
    overviewImage: 'assets/images/about_smile_stylish.jpg',
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
        title: 'Improved Dental Alignment',
        desc: 'Corrects crowding, unwanted gaps, rotations, and overlapping teeth for a symmetrical smile.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        title: 'Optimized Bite Function',
        desc: 'Harmonizes the relationship between upper and lower teeth, preventing uneven tooth wear.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
        title: '3D Virtual Treatment Roadmaps',
        desc: 'Visualize your final smile alignment before your very first aligner tray is fabricated.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/></svg>',
        title: 'Discreet Lifestyle Options',
        desc: 'Removable clear aligners let you eat normally and maintain immaculate brushing habits.'
      }
    ],
    processSteps: [
      { num: '01', title: 'Orthodontic Assessment', desc: 'Comprehensive facial photography, 3D digital bite scanning, and cephalometric analysis.' },
      { num: '02', title: 'Treatment Planning', desc: 'Custom digital roadmap calculating millimeter-precise tooth movements.' },
      { num: '03', title: 'Appliance Placement', desc: 'Fitting your custom clear aligners or precision ceramic brackets.' },
      { num: '04', title: 'Monitoring & Retention', desc: 'Periodic checkups every 6 to 8 weeks, followed by clear nighttime retainers.' }
    ],
    faqs: [
      {
        q: 'Am I a candidate for clear aligners or do I need traditional braces?',
        a: 'Clear aligners are effective for the majority of mild-to-moderate alignment cases. For complex skeletal bite discrepancies, our orthodontists will recommend the most predictable system.'
      },
      {
        q: 'How many hours a day must I wear clear aligners?',
        a: 'Clear aligners should be worn 20 to 22 hours per day, removing them only for meals, drinking hot beverages, and brushing.'
      },
      {
        q: 'How long does orthodontic treatment usually take?',
        a: 'Depending on individual complexity, adult orthodontic treatments typically range from 6 to 18 months.'
      },
      {
        q: 'Will I need a retainer after treatment?',
        a: 'Yes. Retainers are essential for stabilizing teeth in their new positions and preventing natural relapse over time.'
      }
    ],
    ctaTitle: 'Explore the Right Path to a Straighter Smile.',
    ctaDescription: 'Schedule your comprehensive 3D orthodontic consultation and preview your personalized smile transformation.'
  },
  'root-canal-treatment': {
    slug: 'root-canal-treatment',
    title: 'Root Canal Treatment',
    eyebrow: 'ENDODONTIC SPECIALTY',
    heroTitle: 'Relieving Discomfort. Preserving Your Natural Tooth.',
    heroDescription: 'Learn how modern root canal treatment may help manage infection or inflammation inside a tooth, saving your natural root and restoring lasting oral comfort.',
    heroImage: 'assets/images/feature_dentist_tech.jpg',
    overviewTitle: 'Microscopic Endodontic Care for Natural Tooth Preservation.',
    overviewParagraphs: [
      'Deep tooth decay, repeated dental procedures, or traumatic injury can cause inflammation or infection of the pulp tissue located deep within the root canals of a tooth.',
      'Our endodontic specialists utilize high-magnification operating microscopes and digital apex locators to gently clean, disinfect, and seal the microscopic root canal spaces, safeguarding your natural tooth root for decades to come.'
    ],
    overviewImage: 'assets/images/about_clinic_interior.jpg',
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
        title: 'Relief From Toothache',
        desc: 'Removes the inflamed nerve tissue, eliminating severe throbbing pain and temperature sensitivity.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        title: 'Natural Tooth Retention',
        desc: 'Preserving your biological tooth root is superior to extraction for maintaining jawbone balance.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
        title: 'Prevents Spread of Infection',
        desc: 'Disinfects the root canal system, preventing abscesses from spreading into the surrounding bone.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>',
        title: 'Restores Chewing Capacity',
        desc: 'A permanent crown restores normal bite pressure so you can chew comfortably without hesitation.'
      }
    ],
    processSteps: [
      { num: '01', title: 'Diagnosis & Imaging', desc: 'High-resolution digital periapical x-rays evaluate root canal anatomy and bone health.' },
      { num: '02', title: 'Painless Numbing', desc: 'Targeted local anesthesia ensures complete comfort during the procedure.' },
      { num: '03', title: 'Canal Disinfection', desc: 'Microscopic instruments debride and irrigate all internal root channels.' },
      { num: '04', title: 'Sealing & Restoration', desc: 'Biocompatible gutta-percha seals the canals, followed by a protective crown.' }
    ],
    faqs: [
      {
        q: 'Does a root canal procedure hurt?',
        a: 'With modern local anesthesia and rotary instrumentation, receiving a root canal is no more uncomfortable than having a standard dental filling placed.'
      },
      {
        q: 'How many appointments does a root canal take?',
        a: 'Most root canals can be completed in a single 60 to 90 minute visit. Severely infected teeth may require a second visit to ensure complete canal sterility.'
      },
      {
        q: 'Why do I need a crown after a root canal?',
        a: 'Teeth that have undergone root canal therapy become more brittle over time. A permanent dental crown protects the tooth against fractures under normal chewing pressure.'
      },
      {
        q: 'What is the alternative to a root canal?',
        a: 'The only clinical alternative is tooth extraction, which typically requires a bridge or dental implant to prevent shifting of adjacent teeth.'
      }
    ],
    ctaTitle: 'Get the Guidance You Need for Your Dental Health.',
    ctaDescription: 'Do not let tooth pain disrupt your life. Schedule a gentle endodontic consultation today.'
  },
  'dental-implants': {
    slug: 'dental-implants',
    title: 'Dental Implants',
    eyebrow: 'PERMANENT TOOTH RESTORATION',
    heroTitle: 'Permanent Tooth Replacement That Feels Like You.',
    heroDescription: 'Explore implant-based tooth replacement options and the assessment involved in treatment planning. Restore your smile, chewing function, and long-term jawbone vitality.',
    heroImage: 'assets/images/hero_dental_model.jpg',
    overviewTitle: 'The Gold Standard for Replacing Missing Teeth.',
    overviewParagraphs: [
      'Missing teeth can cause difficulty chewing, changes in speech, and gradual bone resorption in the jaw over time. A dental implant functions as a synthetic root that integrates naturally with your bone tissue.',
      'Our implant surgeons utilize guided 3D surgical planning to position medical-grade titanium or zirconia implants with sub-millimeter precision. Once integrated, a custom ceramic crown is securely placed, creating an imperceptible and permanent tooth replacement.'
    ],
    overviewImage: 'assets/images/feature_dentist_tech.jpg',
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        title: 'Preserves Jawbone Density',
        desc: 'Implants provide natural chewing stimulation to the bone, halting the bone loss associated with missing teeth.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
        title: 'Natural Chewing Strength',
        desc: 'Eat all your favorite foods with total confidence without the slipping or clicking of removable dentures.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>',
        title: 'Protects Neighboring Teeth',
        desc: 'Unlike traditional bridges, dental implants do not require grinding down healthy adjacent teeth.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
        title: 'Long-Term Durability',
        desc: 'With proper oral hygiene, dental implants have a clinical success rate exceeding 98% and can last a lifetime.'
      }
    ],
    processSteps: [
      { num: '01', title: 'Clinical Assessment', desc: 'Low-radiation 3D Cone Beam CT scan assesses bone density and nerve topography.' },
      { num: '02', title: 'Guided Placement', desc: 'Computer-guided surgical placement of the biocompatible implant fixture.' },
      { num: '03', title: 'Osseointegration', desc: 'A healing period of 8 to 12 weeks allows the implant to fuse solidly with bone.' },
      { num: '04', title: 'Permanent Crown', desc: 'Attaching the custom shaded ceramic crown designed for your facial geometry.' }
    ],
    faqs: [
      {
        q: 'Am I a candidate for dental implants if I have bone loss?',
        a: 'Many patients with reduced bone volume can still receive implants thanks to modern bone grafting and sinus elevation techniques performed in our operatory suites.'
      },
      {
        q: 'Is dental implant surgery painful?',
        a: 'The procedure is performed under profound local anesthesia. Most patients report that recovery involves less discomfort than a standard tooth extraction.'
      },
      {
        q: 'How long do dental implants last?',
        a: 'Dental implants are designed as permanent restorations. With regular hygiene cleanings and good home care, they frequently last a lifetime.'
      },
      {
        q: 'Can implants replace multiple missing teeth?',
        a: 'Yes. Dental implants can replace a single tooth, anchor a multi-unit bridge, or support a full-arch permanent prosthesis.'
      }
    ],
    ctaTitle: 'Explore Your Tooth-Replacement Options.',
    ctaDescription: 'Schedule a comprehensive implant consultation and discover how modern implantology can restore your smile permanently.'
  },
  'teeth-whitening': {
    slug: 'teeth-whitening',
    title: 'Teeth Whitening',
    eyebrow: 'AESTHETIC COSMETIC DENTISTRY',
    heroTitle: 'Reveal the Natural Radiance of Your Smile.',
    heroDescription: 'Learn about professional teeth whitening options and whether treatment may be suitable for your smile. Lift stubborn coffee, tea, and age stains safely and effectively.',
    heroImage: 'assets/images/about_smile_stylish.jpg',
    overviewTitle: 'Professional In-Office & Take-Home Whitening Systems.',
    overviewParagraphs: [
      'Over-the-counter whitening strips and abrasive charcoals can cause tooth sensitivity and uneven patchy results. Professional whitening performed under dental supervision delivers safe, even, and long-lasting brightness.',
      'At Oralize, we offer both light-activated in-office laser treatments that brighten teeth up to eight shades in under an hour, as well as customized laboratory-milled take-home whitening trays for gradual at-home maintenance.'
    ],
    overviewImage: 'assets/images/service_cleaning.jpg',
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
        title: 'Up to 8 Shades Brighter',
        desc: 'Advanced light-activated hydrogen peroxide formulas break down deep organic enamel pigments.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        title: 'Enamel-Safe Protocols',
        desc: 'Our pH-neutral formulas and desensitizing potassium nitrate minerals protect tooth enamel integrity.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
        title: 'Customized Shade Matching',
        desc: 'Tailor the exact level of brightness to compliment your skin tone and personal aesthetic preference.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
        title: 'Long-Lasting Results',
        desc: 'Includes custom touch-up trays and remineralizing paste to preserve your bright smile for years.'
      }
    ],
    processSteps: [
      { num: '01', title: 'Shade & Health Check', desc: 'Pre-treatment digital shade measurement and gingival health check.' },
      { num: '02', title: 'Gum Barrier Application', desc: 'Protective light-cured barrier isolates your lips and gums for zero irritation.' },
      { num: '03', title: 'Laser Gel Activation', desc: 'Three 15-minute cycles of professional gel activated by specialized LED light.' },
      { num: '04', title: 'Fluoride Polish & Care', desc: 'Remineralizing post-treatment paste applied with custom home maintenance kit.' }
    ],
    faqs: [
      {
        q: 'Will professional teeth whitening make my teeth sensitive?',
        a: 'Our formulations include built-in desensitizing agents (ACP and potassium nitrate). While mild transient sensitivity can occur for 24 hours, it quickly subsides.'
      },
      {
        q: 'How long do professional whitening results last?',
        a: 'Results generally last from one to three years, depending on dietary habits (such as coffee, red wine, and tea consumption) and routine dental cleanings.'
      },
      {
        q: 'Does teeth whitening work on dental crowns or composite fillings?',
        a: 'Whitening gels act only on natural tooth enamel. If you have visible anterior crowns or bonding, your dentist will coordinate shading to ensure an even result.'
      },
      {
        q: 'What is the "White Diet" after treatment?',
        a: 'For the first 48 hours following whitening, your enamel pores are slightly open. We advise avoiding dark-colored foods and beverages during this period.'
      }
    ],
    ctaTitle: 'Discover the Right Whitening Option for Your Smile.',
    ctaDescription: 'Schedule a personalized cosmetic consultation and discover how professional whitening can illuminate your smile.'
  }
};
document.addEventListener('DOMContentLoaded', () => {
  renderServiceDetail();
  initDetailFaqAccordion();
  initDetailSmoothScroll();
});
function renderServiceDetail() {
  const params = new URLSearchParams(window.location.search);
  let slug = params.get('service');
  if (!slug || !SERVICES_DATA[slug]) {
    slug = 'professional-cleaning';
  }
  const data = SERVICES_DATA[slug];
  document.title = `${data.title} — Oralize Dental Services`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', `${data.title} at Oralize: ${data.heroDescription}`);
  }
  const breadcrumbCurrent = document.getElementById('sd-breadcrumb-service');
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = data.title;
  const eyebrowEl = document.getElementById('sd-eyebrow');
  if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;
  const heroTitleEl = document.getElementById('sd-hero-title');
  if (heroTitleEl) heroTitleEl.innerHTML = highlightTail(data.heroTitle, 2);
  const heroDescEl = document.getElementById('sd-hero-desc');
  if (heroDescEl) heroDescEl.textContent = data.heroDescription;
  const heroImgEl = document.getElementById('sd-hero-img');
  if (heroImgEl) {
    heroImgEl.src = data.heroImage;
    heroImgEl.alt = `${data.title} treatment illustration`;
  }
  const overviewTitleEl = document.getElementById('sd-overview-title');
  if (overviewTitleEl) overviewTitleEl.textContent = data.overviewTitle;
  const overviewTextEl = document.getElementById('sd-overview-paragraphs');
  if (overviewTextEl) {
    overviewTextEl.innerHTML = data.overviewParagraphs.map(p => `<p>${p}</p>`).join('');
  }
  const overviewImgEl = document.getElementById('sd-overview-img');
  if (overviewImgEl) {
    overviewImgEl.src = data.overviewImage;
    overviewImgEl.alt = `${data.title} clinical care environment`;
  }
  const benefitsGridEl = document.getElementById('sd-benefits-grid');
  if (benefitsGridEl) {
    benefitsGridEl.innerHTML = data.benefits.map(b => `
      <div class="sd-benefit-card">
        <div class="sd-benefit-icon" aria-hidden="true">${b.icon}</div>
        <h4>${b.title}</h4>
        <p>${b.desc}</p>
      </div>
    `).join('');
  }
  const processGridEl = document.getElementById('sd-process-grid');
  if (processGridEl) {
    processGridEl.innerHTML = data.processSteps.map(s => `
      <div class="sd-process-step">
        <div class="sd-process-num">${s.num}</div>
        <h4>${s.title}</h4>
        <p>${s.desc}</p>
      </div>
    `).join('');
  }
  const faqsWrapEl = document.getElementById('sd-faqs-wrap');
  if (faqsWrapEl) {
    faqsWrapEl.innerHTML = data.faqs.map((f, i) => `
      <div class="sd-faq-item ${i === 0 ? 'is-open' : ''}">
        <button type="button" class="sd-faq-btn" aria-expanded="${i === 0 ? 'true' : 'false'}">
          <span>${f.q}</span>
          <span class="sd-faq-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </span>
        </button>
        <div class="sd-faq-panel">
          <p>${f.a}</p>
        </div>
      </div>
    `).join('');
  }
  const ctaTitleEl = document.getElementById('sd-cta-title');
  if (ctaTitleEl && data.ctaTitle) ctaTitleEl.innerHTML = highlightTail(data.ctaTitle, 2);
  const ctaDescEl = document.getElementById('sd-cta-desc');
  if (ctaDescEl) ctaDescEl.textContent = data.ctaDescription;
  const bookingBtns = document.querySelectorAll('.btn-book-service');
  bookingBtns.forEach(btn => {
    btn.setAttribute('data-service', data.title);
  });
}
function highlightTail(text, count) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const words = String(text || '').trim().split(/\s+/);
  if (words.length <= count) {
    return `<span class="highlight-champagne">${esc(words.join(' '))}</span>`;
  }
  const head = words.slice(0, -count).join(' ');
  const tail = words.slice(-count).join(' ');
  return `${esc(head)} <span class="highlight-champagne">${esc(tail)}</span>`;
}
function initDetailFaqAccordion() {
  const faqsWrap = document.getElementById('sd-faqs-wrap');
  if (!faqsWrap) return;
  faqsWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.sd-faq-btn');
    if (!btn) return;
    const item = btn.closest('.sd-faq-item');
    const isOpen = item.classList.contains('is-open');
    if (isOpen) {
      item.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
}
function initDetailSmoothScroll() {
  const scrollBtns = document.querySelectorAll('a[href="#overview"]');
  scrollBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('overview');
      if (target) {
        const offset = 80;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}
