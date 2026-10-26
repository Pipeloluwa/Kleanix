import {
  CleaningService,
  ExtraServiceItem,
  FrequencyOption,
  CustomerReview,
  SuburbCoverage,
  BookingState,
  CleanFrequency
} from '../state_management/types';

// ==========================================
// DUMMY DATA SOURCES (Ready for REST / GraphQL API replacement)
// ==========================================

export const DUMMY_SERVICES: CleaningService[] = [
  {
    id: 'standard',
    title: 'Standard Home Clean',
    slug: 'standard-clean',
    subtitle: 'Routine maintenance for a sparkling, fresh household',
    shortDesc: 'Regular upkeep for living areas, bedrooms, kitchen surfaces, and bathrooms so you can reclaim your weekends.',
    longDesc: 'Our Standard Clean is designed to keep your home continuously fresh and dust-free. Our vetted professionals arrive on schedule with eco-friendly cleaning agents and HEPA-filter vacuums, systematically refreshing every living space.',
    category: 'residential',
    basePrice: 130,
    priceNote: 'Starting from $130 for 1 bed / 1 bath',
    badge: 'Most Popular',
    popular: true,
    estimatedHours: '2.5 - 3.5 hrs',
    heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    icon: 'sparkles',
    highlights: [
      'Dusting all accessible surfaces and furniture',
      'Vacuuming rugs, carpets and mopping hard floors',
      'Full exterior wipedown of kitchen appliances & countertops',
      'Scrubbing and sanitizing sinks, showers, toilets and mirrors',
      'Emptying all bins and replacing liners',
      'Making beds and neatly arranging cushions'
    ],
    checklist: [
      {
        room: 'All Bedrooms & Living Areas',
        items: ['Dusting shelves, tables & decor', 'Vacuuming carpets & rugs', 'Mopping hard floors', 'Mirrors cleaned streak-free', 'Waste bins emptied & sanitized']
      },
      {
        room: 'Kitchen',
        items: ['Wipe countertops & backsplash', 'Clean stove top & rangehood exterior', 'Wipe exterior of fridge, oven & dishwasher', 'Scrub & disinfect sink and chrome taps', 'Mop kitchen floor']
      },
      {
        room: 'Bathrooms & Toilets',
        items: ['Disinfect shower screens & tiles', 'Clean & scrub bathtub', 'Sanitize toilet bowl, seat and lid', 'Wipe vanity, basin and polish mirror', 'Mop and disinfect floor']
      }
    ]
  },
  {
    id: 'deep',
    title: 'Deep Intensive Clean',
    slug: 'deep-clean',
    subtitle: 'Comprehensive top-to-bottom detail for overdue homes',
    shortDesc: 'An intensive restore for homes needing extra attention, targeting built-up grime, baseboards, grout, and hidden dirt.',
    longDesc: 'When your residence requires a thorough reset, our Deep Clean goes beyond surface level. We tackle stubborn soap scum, neglected skirting boards, door frames, light switches, and deep dust behind furniture.',
    category: 'residential',
    basePrice: 240,
    priceNote: 'Starting from $240 for 1 bed / 1 bath',
    badge: 'Recommended 2x/Year',
    popular: false,
    estimatedHours: '4 - 6 hrs',
    heroImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
    icon: 'shield-check',
    highlights: [
      'Everything included in Standard Clean plus:',
      'Detailed hand-wiping of all skirting boards & door jambs',
      'Tile grout descaling in shower and kitchen zones',
      'Cleaning reachable ceiling vents, exhaust fans & cobweb removal',
      'Spot cleaning high-touch walls, doors & switchplates',
      'Deep dusting behind and underneath moveable furniture'
    ],
    checklist: [
      {
        room: 'General Living & Hallways',
        items: ['Detailed skirting board washing', 'Door frames & handles disinfected', 'Cobweb removal from corners & vents', 'Intensive vacuum with crevice tool', 'Double floor mop and wash']
      },
      {
        room: 'Kitchen Deep Treatment',
        items: ['Grease breakdown on rangehood filters', 'Detailed grout scrub on tiled backsplashes', 'Disinfect small appliance exteriors', 'Wipe down outside and top of cupboards', 'Sanitize bin storage area']
      },
      {
        room: 'Bathroom Deep Sanitisation',
        items: ['Limescale & soap scum mineral deposit removal', 'Deep tile grout scrub with antibacterial solution', 'Exhaust fan cover dust removal', 'Polish all chrome fittings to mirror shine']
      }
    ]
  },
  {
    id: 'vacate',
    title: 'Vacate & End of Lease Clean',
    slug: 'vacate-clean',
    subtitle: '100% Bond Back Guarantee approved by Perth Real Estate Agents',
    shortDesc: 'Complete property turnover meeting Western Australia REIWA bond inspection standards. Guaranteed re-clean within 72 hours if flagged.',
    longDesc: 'Moving out is stressful enough without risking your bond deposit. Our Vacate Cleaning service is tailored to rigorous real estate agent checklists. If your property manager flags any item on our checklist, we return free of charge.',
    category: 'residential',
    basePrice: 360,
    priceNote: 'Starting from $360 with Bond Back Guarantee',
    badge: '100% Bond Back Guarantee',
    popular: true,
    estimatedHours: '5 - 8 hrs',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    icon: 'badge-percent',
    highlights: [
      'REIWA approved inspection checklist',
      'Full interior oven and rangehood degreasing included',
      'All interior window glass & window tracks vacuumed and wiped',
      'Inside all cupboards, drawers, wardrobes and pantry sanitized',
      'Wall mark spot cleaning and door frame wipe down',
      'Free return re-clean guarantee within 72 hours'
    ],
    checklist: [
      {
        room: 'Full Kitchen Handover',
        items: ['Oven interior baked grease removal', 'Rangehood filter degreasing', 'Inside & out of all cabinets and drawers', 'Dishwasher filter and seals cleaned', 'Sink descaling & polish']
      },
      {
        room: 'All Rooms & Storage',
        items: ['Inside built-in wardrobes, shelves & rails', 'Window sills, tracks & glass cleaned', 'Spot cleaning reachable scuffs on walls', 'Light switches, fixtures & power points', 'Deep vacuuming carpet edges']
      },
      {
        room: 'Bathrooms & Laundry',
        items: ['Heavy soap scum removal from glass screens', 'Bleach treatment on silicone mold spots', 'Laundry trough and taps descaling', 'Exhaust vents cleaned', 'Floor drains washed']
      }
    ]
  },
  {
    id: 'commercial',
    title: 'Office & Commercial Cleaning',
    slug: 'commercial-clean',
    subtitle: 'Healthy, productive work environments for Perth businesses',
    shortDesc: 'Customized cleaning contracts for modern offices, medical clinics, retail spaces, and co-working hubs.',
    longDesc: 'Maintain an immaculate impression for your clients and a sanitized workspace for your staff. We offer after-hours or daytime cleaning schedules tailored to your commercial facility requirements.',
    category: 'commercial',
    basePrice: 180,
    priceNote: 'Starting from $180 per visit or hourly rate',
    badge: 'After-Hours Available',
    popular: false,
    estimatedHours: '3 - 5 hrs',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    icon: 'building',
    highlights: [
      'Desk surfaces, monitors and telephone sanitation',
      'Breakroom kitchen and coffee station deep cleaning',
      'High-traffic floor care (commercial vacuum and mop)',
      'Replenishment of restroom consumables and soap',
      'Secure lock-up protocols & keyholder insurance',
      'Tailored daily, weekly or bi-weekly rosters'
    ],
    checklist: [
      {
        room: 'Workstations & Open Office',
        items: ['Sanitise desks and keyboards', 'Empty recycling and waste receptacles', 'Dust window sills & horizontal blinds', 'Vacuum high-traffic walkways']
      },
      {
        room: 'Staff Kitchen & Boardrooms',
        items: ['Clean microwave & fridge exterior', 'Wash up coffee cups and sink', 'Sanitise boardroom table and chairs', 'Mop tiled dining zones']
      },
      {
        room: 'Commercial Restrooms',
        items: ['Deep sanitize all toilet cubicles & urinals', 'Disinfect basin counters and mirrors', 'Restock paper towels and toilet paper', 'Anti-bacterial floor mopping']
      }
    ]
  },
  {
    id: 'airbnb',
    title: 'Airbnb & Holiday Rental Turnover',
    slug: 'airbnb-clean',
    subtitle: '5-Star guest readiness with linen wash & amenity restock',
    shortDesc: 'Fast, dependable turnaround cleaning between guest check-outs and check-ins, keeping your superhost status intact.',
    longDesc: 'We understand that reviews make or break your short-stay rental. Our turnover team ensures fresh hotel-grade linen changes, bathroom sparkle, pantry restock, and instant property inspection reporting.',
    category: 'specialized',
    basePrice: 150,
    priceNote: 'Starting from $150 per turnover',
    badge: 'Superhost Standard',
    popular: false,
    estimatedHours: '2.5 - 4 hrs',
    heroImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    icon: 'home',
    highlights: [
      'Fresh bed linen changes & styling',
      'Washing and drying towels & bathmats',
      'Inspection report for damages or left-behind items',
      'Restocking guest toiletries & welcome packs',
      'Key lockbox code reset assistance'
    ],
    checklist: [
      {
        room: 'Bedrooms',
        items: ['Hotel fold linen changes', 'Under-bed check for lost belongings', 'Fluff pillows & decorative throw styling']
      },
      {
        room: 'Kitchen & Hospitality',
        items: ['Dishwasher emptied and put away', 'Discard expired guest food from fridge', 'Restock coffee, tea & sugar canisters']
      },
      {
        room: 'Bathroom & Presentation',
        items: ['Replace bath sheets and hand towels', 'Replenish luxury shampoo & soap dispenser', 'Toilet paper fold presentation']
      }
    ]
  },
  {
    id: 'carpet-oven',
    title: 'Carpet Steam & Oven Special',
    slug: 'carpet-oven-cleaning',
    subtitle: 'Deep industrial hot water extraction & carbon removal',
    shortDesc: 'Targeted heavy-duty treatments to eliminate stubborn stains, pet dander, and burnt-on oven grease.',
    longDesc: 'Combine high-temperature steam extraction for revitalised carpets with our non-toxic fume-free oven restoration dip. Perfect add-on or standalone service for high-wear areas.',
    category: 'specialized',
    basePrice: 160,
    priceNote: 'Combined package from $160',
    badge: 'Eco Steam Tech',
    popular: false,
    estimatedHours: '2 - 3.5 hrs',
    heroImage: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
    icon: 'fire',
    highlights: [
      'Deep hot-water carpet extraction to kill 99.9% of allergens',
      'Non-toxic fume-free oven enamel degreasing',
      'Removes stubborn food spills, wine stains and pet odors',
      'Fast drying times within 3-4 hours'
    ],
    checklist: [
      {
        room: 'Carpet Treatment',
        items: ['Pre-spray soil lifter application', 'Targeted spot stain agitation', 'Hot water extraction with deodorizer', 'Pile grooming for rapid dry']
      },
      {
        room: 'Oven Restoration',
        items: ['Removal of oven racks and trays for soaking', 'Non-caustic paste applied to chamber', 'Glass door removed and cleaned between panes', 'Stove dials and exterior polished']
      }
    ]
  },
  {
    id: 'gardening',
    title: 'Gardening & Lawn Maintenance',
    slug: 'gardening-lawn-care',
    subtitle: 'Precision lawn mowing, hedge shaping, weed control & green waste disposal',
    shortDesc: 'Comprehensive outdoor garden care for Perth homes, keeping lawns lush, edges crisp, and garden beds completely weed-free.',
    longDesc: 'Transform your outdoor living spaces with professional groundskeeping. Our police-checked gardening teams arrive equipped with commercial mowers, precision line trimmers, hedge clippers, and green waste disposal bags to maintain immaculate Perth yards.',
    category: 'outdoor',
    basePrice: 140,
    priceNote: 'Starting from $140 per garden session',
    badge: 'Popular Outdoor Add-on',
    popular: true,
    estimatedHours: '2 - 4 hrs',
    heroImage: 'https://images.unsplash.com/photo-1592417817098-8f3d69102a56?auto=format&fit=crop&w=800&q=80',
    icon: 'leaf',
    highlights: [
      'Commercial mower cut with clean border edging & path blowing',
      'Shrub pruning, hedge sculpting & deadwood trimming',
      'Targeted weed removal & organic garden bed mulching',
      'Removal & council-compliant disposal of all green waste',
      'High-pressure cleaning of garden pathways & brick pavers',
      'Reticulation and sprinkler head operation check'
    ],
    checklist: [
      {
        room: 'Lawn & Turf Care',
        items: ['Precision height lawn mowing', 'Clean mechanical line edging along fences and walkways', 'Blow clearing all grass clippings from hard surfaces', 'Organic fertilizer application upon request']
      },
      {
        room: 'Garden Beds & Shrubs',
        items: ['Manual weed pulling from roots in all garden beds', 'Pruning hedges, decorative shrubs and rose bushes', 'Turnover and aeration of garden soil', 'Application of protective bark or mulch']
      },
      {
        room: 'Patios & Hardscapes',
        items: ['Sweeping and leaf collection on driveways and patios', 'Weed treatment between paving stones and brick seams', 'Eco-safe outdoor cobweb clearing around eaves', 'Full removal of green waste cuttings']
      }
    ]
  },
  {
    id: 'forensic',
    title: 'Forensic & Biohazard Remediation',
    slug: 'forensic-cleaning',
    subtitle: 'Certified trauma, biohazard decontamination, hoarder & unattended death sanitisation',
    shortDesc: 'Discreet, compassionate, and certified biohazard decontamination adhering to stringent WA Health and EPA Australia safety standards.',
    longDesc: 'When traumatic, hazardous, or extreme contamination events occur, our licensed forensic restoration crew provides compassionate, rapid-response remediation. Using hospital-grade biological neutralizers, HEPA air scrubbers, and industrial ozone fogging, we safely restore properties to 100% biological safety with full documentation for insurance providers and landlords.',
    category: 'specialized',
    basePrice: 450,
    priceNote: 'Starting from $450 with Certificate of Sanitisation',
    badge: 'WA Certified Biohazard',
    popular: false,
    estimatedHours: '4 - 8 hrs',
    heroImage: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=800&q=80',
    icon: 'shield-virus',
    highlights: [
      '24/7 Rapid dispatch across all Perth metropolitan areas',
      'Trauma, unattended death, and crime scene remediation',
      'Extreme hoarder property clearing & deep sanitisation',
      'Clinical disposal of hazardous biological materials & sharps',
      'Industrial ozone fogging & hydroxyl air deodorization',
      'Formal Certificate of Decontamination for insurance & real estate'
    ],
    checklist: [
      {
        room: 'Containment & Hazard Removal',
        items: ['Establishment of negative air pressure & containment barriers', 'Safe removal and disposal of contaminated porous furnishings', 'Biological fluid identification and extraction using specialized enzyme agents', 'Licensed clinical biohazard waste containerization']
      },
      {
        room: 'Deep Decontamination & Sterilization',
        items: ['Hospital-grade sporicidal wiping of all non-porous surfaces', 'Sub-floor and structural timber antimicrobial treatment', 'HEPA-filtered air scrubbers to eliminate airborne pathogens', 'Deep tile, grout, and structural seal sanitisation']
      },
      {
        room: 'Deodorization & Clearance Testing',
        items: ['Thermal fogging to penetrate micro-cavities and neutralize odors', 'Multi-stage ozone purification treatment', 'ATP bioluminescence surface verification test', 'Issuance of official Decontamination Certificate']
      }
    ]
  }
];

export const DUMMY_EXTRAS: ExtraServiceItem[] = [
  { id: 'oven', name: 'Interior Oven Deep Clean', price: 60, icon: 'oven', description: 'Removes baked-on grease & burnt carbon', estimatedMinutes: 45 },
  { id: 'fridge', name: 'Interior Fridge & Freezer Wipe', price: 45, icon: 'fridge', description: 'Shelves washed and food compartments disinfected', estimatedMinutes: 30 },
  { id: 'windows', name: 'Interior Windows & Tracks', price: 75, icon: 'window', description: 'Up to 10 reachable windows inside the home', estimatedMinutes: 60 },
  { id: 'balcony', name: 'Balcony / Patio Sweep & Wash', price: 50, icon: 'balcony', description: 'Outdoor tile scrub and railing wipe down', estimatedMinutes: 35 },
  { id: 'carpetSteam', name: 'Carpet Steam (2 Bedrooms)', price: 90, icon: 'steam', description: 'Industrial hot water allergen extraction', estimatedMinutes: 50 },
  { id: 'walls', name: 'Spot Cleaning Wall Scuffs', price: 65, icon: 'wall', description: 'Targeted scuff mark removal on high-traffic walls', estimatedMinutes: 40 },
  { id: 'cabinets', name: 'Inside Kitchen Cabinets', price: 55, icon: 'cabinet', description: 'Cupboards emptied, wiped and re-organized', estimatedMinutes: 45 },
  { id: 'laundry', name: 'Ironing & Wash Load (1 Hour)', price: 40, icon: 'laundry', description: 'Bedding or clothing washed, dried or ironed', estimatedMinutes: 60 },
  { id: 'lawnMowing', name: 'Lawn Mowing & Edging', price: 70, icon: 'mower', description: 'Front and back lawn mowing, mechanical edging & blower sweep', estimatedMinutes: 45 },
  { id: 'weeding', name: 'Garden Bed Weeding (1 Hr)', price: 55, icon: 'plant', description: 'Hand-weeding, soil aeration & dead foliage clearing', estimatedMinutes: 50 },
  { id: 'highPressureOutdoor', name: 'High-Pressure Driveway Wash', price: 85, icon: 'pressure', description: 'Industrial pressure wash for pavers, driveways or outdoor entertaining areas', estimatedMinutes: 60 },
  { id: 'antimicrobialFog', name: 'Antimicrobial Fogging Treatment', price: 95, icon: 'fog', description: 'Whole-property aerosol hospital-grade pathogen & viral neutralization', estimatedMinutes: 40 }
];

export const FREQUENCY_OPTIONS: FrequencyOption[] = [
  {
    id: 'once_off',
    name: 'One-Time Clean',
    discountPercentage: 0,
    description: 'Pay once with zero ongoing commitment'
  },
  {
    id: 'weekly',
    name: 'Weekly Clean',
    discountPercentage: 15,
    badge: 'Best Value - 15% OFF',
    description: 'Effortless continuous cleanliness every 7 days'
  },
  {
    id: 'fortnightly',
    name: 'Fortnightly (Every 2 Wks)',
    discountPercentage: 10,
    badge: 'Most Popular - 10% OFF',
    description: 'Our most requested plan for busy households'
  },
  {
    id: 'monthly',
    name: 'Every 4 Weeks',
    discountPercentage: 5,
    badge: '5% OFF',
    description: 'Monthly thorough reset'
  }
];

export const DUMMY_SUBURBS: SuburbCoverage[] = [
  { postcode: '6000', name: 'Perth CBD', region: 'Central Perth', available: true, nextAvailableSlot: 'Tomorrow 9:00 AM' },
  { postcode: '6008', name: 'Subiaco', region: 'Western Suburbs', available: true, nextAvailableSlot: 'Tomorrow 10:30 AM' },
  { postcode: '6151', name: 'South Perth', region: 'South Perth', available: true, nextAvailableSlot: 'Today 2:00 PM' },
  { postcode: '6160', name: 'Fremantle', region: 'South Perth', available: true, nextAvailableSlot: 'Tomorrow 8:00 AM' },
  { postcode: '6019', name: 'Scarborough', region: 'North Perth', available: true, nextAvailableSlot: 'Tomorrow 1:00 PM' },
  { postcode: '6100', name: 'Victoria Park', region: 'Central Perth', available: true, nextAvailableSlot: 'Today 4:00 PM' },
  { postcode: '6011', name: 'Cottesloe', region: 'Western Suburbs', available: true, nextAvailableSlot: 'Tomorrow 11:00 AM' },
  { postcode: '6050', name: 'Mount Lawley', region: 'Central Perth', available: true, nextAvailableSlot: 'Tomorrow 9:30 AM' },
  { postcode: '6027', name: 'Joondalup', region: 'North Perth', available: true, nextAvailableSlot: 'Tomorrow 10:00 AM' },
  { postcode: '6153', name: 'Applecross', region: 'South Perth', available: true, nextAvailableSlot: 'Tomorrow 12:00 PM' },
  { postcode: '6009', name: 'Nedlands', region: 'Western Suburbs', available: true, nextAvailableSlot: 'Tomorrow 1:30 PM' },
  { postcode: '6018', name: 'Innaloo & Karrinyup', region: 'North Perth', available: true, nextAvailableSlot: 'Today 3:30 PM' },
  { postcode: '6152', name: 'Como', region: 'South Perth', available: true, nextAvailableSlot: 'Tomorrow 8:30 AM' },
  { postcode: '6056', name: 'Midland & Guildford', region: 'Eastern Suburbs', available: true, nextAvailableSlot: 'Wednesday 9:00 AM' },
  { postcode: '6168', name: 'Rockingham', region: 'Mandurah & Rockingham', available: true, nextAvailableSlot: 'Wednesday 10:00 AM' }
];

export const DUMMY_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Sarah Jenkins',
    suburb: 'South Perth',
    rating: 5,
    date: '3 days ago',
    service: 'Vacate & End of Lease Clean',
    comment: 'Booked Kleanix for our end of lease clean in South Perth and got 100% of our $2,400 bond refunded without a single complaint from the real estate agent! The oven was like brand new. Outstanding work.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-2',
    author: 'Mark Robertson',
    suburb: 'Subiaco',
    rating: 5,
    date: '1 week ago',
    service: 'Standard Home Clean (Fortnightly)',
    comment: 'We have had Elena from Kleanix coming every two weeks for the past 6 months. Having our kitchen and bathrooms spotless when coming home from work is an absolute lifesaver. Extremely reliable team.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-3',
    author: 'Chloe & Dave M.',
    suburb: 'Cottesloe',
    rating: 5,
    date: '2 weeks ago',
    service: 'Deep Intensive Clean',
    comment: 'Just had our annual spring deep clean. The attention to detail on the tile grout and skirting boards was beyond expectations. Cleaner was on time, super polite, and brought all eco-friendly supplies.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-4',
    author: 'Liam Fitzgerald',
    suburb: 'Perth CBD',
    rating: 5,
    date: '3 weeks ago',
    service: 'Airbnb & Holiday Rental Turnover',
    comment: 'I run two short-stay apartments in the city. Kleanix handles all my turnovers and linen. Not a single review below 5 stars since switching to them. Instant booking and easy invoicing.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-5',
    author: 'Natasha Vance',
    suburb: 'Scarborough',
    rating: 5,
    date: '1 month ago',
    service: 'Standard Home Clean',
    comment: 'The booking process took 2 minutes online and everything was transparent upfront without hidden fees. Cleaners were fully police checked and insured which gave me huge peace of mind.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
  }
];

export const VALID_COUPONS: Record<string, { discountPercent?: number; discountFixed?: number; description: string }> = {
  'KLEAN15': { discountPercent: 15, description: '15% Off Your Booking' },
  'PERTH20': { discountFixed: 20, description: '$20 Off Introductory Special' },
  'SPRINGCLEAN': { discountPercent: 10, description: '10% Seasonal Refresh Discount' }
};

// ==========================================
// PRICING CALCULATION LOGIC
// ==========================================

export function calculateCleaningPrice(params: {
  serviceId: string;
  bedrooms: number;
  bathrooms: number;
  frequency: CleanFrequency;
  extras: string[];
  couponCode?: string;
}) {
  const service = DUMMY_SERVICES.find(s => s.id === params.serviceId) || DUMMY_SERVICES[0];
  
  // Base room increments
  const bedroomRate = params.serviceId === 'forensic' ? 80 : params.serviceId === 'vacate' ? 45 : params.serviceId === 'deep' ? 35 : params.serviceId === 'gardening' ? 20 : 25;
  const bathroomRate = params.serviceId === 'forensic' ? 90 : params.serviceId === 'vacate' ? 50 : params.serviceId === 'deep' ? 40 : params.serviceId === 'gardening' ? 15 : 30;
  
  // Calculate raw base: 1 bed / 1 bath included in service.basePrice
  const extraBeds = Math.max(0, params.bedrooms - 1);
  const extraBaths = Math.max(0, params.bathrooms - 1);
  
  const roomCost = (extraBeds * bedroomRate) + (extraBaths * bathroomRate);
  const baseServiceCost = service.basePrice + roomCost;
  
  // Extras
  let extrasCost = 0;
  params.extras.forEach(extraId => {
    const item = DUMMY_EXTRAS.find(e => e.id === extraId);
    if (item) extrasCost += item.price;
  });
  
  const rawSubtotal = baseServiceCost + extrasCost;
  
  // Frequency discount
  const freq = FREQUENCY_OPTIONS.find(f => f.id === params.frequency) || FREQUENCY_OPTIONS[0];
  const freqDiscountAmount = Math.round((rawSubtotal * freq.discountPercentage) / 100);
  
  const discountedSubtotal = rawSubtotal - freqDiscountAmount;
  
  // Coupon discount
  let couponDiscount = 0;
  if (params.couponCode && VALID_COUPONS[params.couponCode.toUpperCase()]) {
    const coupon = VALID_COUPONS[params.couponCode.toUpperCase()];
    if (coupon.discountPercent) {
      couponDiscount = Math.round((discountedSubtotal * coupon.discountPercent) / 100);
    } else if (coupon.discountFixed) {
      couponDiscount = Math.min(discountedSubtotal, coupon.discountFixed);
    }
  }
  
  const finalSubtotal = Math.max(50, discountedSubtotal - couponDiscount);
  const totalSavings = freqDiscountAmount + couponDiscount;
  
  // In Australia GST is 10% included in headline price
  const gstPortion = Math.round((finalSubtotal / 11) * 100) / 100;
  
  // Estimated hours
  const baseHours = params.serviceId === 'forensic' ? 5.5 : params.serviceId === 'vacate' ? 4.5 : params.serviceId === 'deep' ? 3.5 : params.serviceId === 'gardening' ? 3.0 : 2.5;
  const roomHours = (extraBeds * 0.4) + (extraBaths * 0.5);
  const totalHours = Math.round((baseHours + roomHours) * 10) / 10;

  return {
    baseRate: baseServiceCost,
    extrasTotal: extrasCost,
    frequencyDiscount: freqDiscountAmount,
    couponDiscount,
    totalSavings,
    subtotal: rawSubtotal,
    taxGst: gstPortion,
    finalTotal: finalSubtotal,
    estimatedHours: totalHours
  };
}

// ==========================================
// MOCK CLIENT API SERVICE (Simulates Backend Endpoints)
// Ready to switch to axios / fetch / rtk-query seamlessly!
// ==========================================

export const mockApiClient = {
  // Fetch available services
  async getServices(): Promise<CleaningService[]> {
    await new Promise(r => setTimeout(r, 300));
    return DUMMY_SERVICES;
  },

  // Fetch service by slug
  async getServiceBySlug(slug: string): Promise<CleaningService | null> {
    await new Promise(r => setTimeout(r, 200));
    return DUMMY_SERVICES.find(s => s.slug === slug) || null;
  },

  // Validate coupon
  async validateCoupon(code: string): Promise<{ valid: boolean; discountText?: string; message: string }> {
    await new Promise(r => setTimeout(r, 400));
    const normalized = code.trim().toUpperCase();
    if (VALID_COUPONS[normalized]) {
      return {
        valid: true,
        discountText: VALID_COUPONS[normalized].description,
        message: `Coupon "${normalized}" applied successfully!`
      };
    }
    return {
      valid: false,
      message: 'Invalid or expired promo code. Try "KLEAN15"'
    };
  },

  // Check suburb postcode availability
  async checkSuburbCoverage(query: string): Promise<{ found: boolean; suburb?: SuburbCoverage }> {
    await new Promise(r => setTimeout(r, 350));
    const term = query.toLowerCase().trim();
    const match = DUMMY_SUBURBS.find(s => 
      s.postcode === term || s.name.toLowerCase().includes(term)
    );
    if (match) {
      return { found: true, suburb: match };
    }
    return { found: false };
  },

  // Submit booking
  async submitBooking(bookingPayload: Partial<BookingState>): Promise<{
    success: boolean;
    reference: string;
    message: string;
    confirmationData: any;
  }> {
    // Simulate real network call with 1.2s latency
    await new Promise(r => setTimeout(r, 1200));
    
    // Generate human-friendly reference e.g. KLX-84920
    const randomRef = 'KLX-' + Math.floor(10000 + Math.random() * 90000);
    const serviceName = DUMMY_SERVICES.find(s => s.id === bookingPayload.serviceId)?.title || 'Standard Home Clean';

    return {
      success: true,
      reference: randomRef,
      message: 'Your booking has been received! Our team is preparing your assignment.',
      confirmationData: {
        reference: randomRef,
        submittedAt: new Date().toISOString(),
        customerName: bookingPayload.customer?.fullName || 'Valued Customer',
        serviceName,
        totalAmount: bookingPayload.finalTotal || 160,
        scheduledDate: bookingPayload.date || 'Upcoming Saturday',
        scheduledTime: bookingPayload.timeSlot || '09:00 AM - 12:00 PM',
        address: `${bookingPayload.customer?.address || '9 Parker St'}, ${bookingPayload.customer?.suburb || 'South Perth'} WA`
      }
    };
  }
};
