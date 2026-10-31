import {
  CleaningService,
  ExtraServiceItem,
  FrequencyOption,
  SuburbCoverage,
  BookingState,
  CleanFrequency,
  DashboardBooking,
  StaffAccount
} from '../state_management/types';

export const DUMMY_SERVICES: CleaningService[] = [
  {
    id: 'standard',
    title: 'Standard Home Clean',
    slug: 'standard-clean',
    subtitle: 'Routine maintenance for a spotless household',
    shortDesc: 'Regular cleaning for living areas, bedrooms, kitchen, and bathrooms.',
    longDesc: 'Our Standard Clean keeps your home consistently fresh. Experienced, police-checked cleaners arrive with professional supplies and HEPA vacuums, systematically refreshing every room.',
    category: 'residential',
    basePrice: 130,
    priceNote: '$130 flat base',
    badge: 'Standard',
    popular: true,
    estimatedHours: '2.5 - 3.5 hrs',
    heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    icon: 'sparkles',
    highlights: [
      'Dusting all accessible furniture and surfaces',
      'Vacuuming rugs and carpets, mopping hard floors',
      'Wiping kitchen appliances & counter benches',
      'Scrubbing and sanitizing sinks, showers and toilets',
      'Emptying bins and replacing fresh liners'
    ],
    checklist: [
      {
        room: 'Bedrooms & Living Areas',
        items: ['Dusting surfaces & furniture', 'Vacuuming carpets & rugs', 'Mopping hard floors', 'Mirrors polished streak-free', 'Waste bins emptied']
      },
      {
        room: 'Kitchen',
        items: ['Wipe countertops & splashback', 'Clean stove top exterior', 'Wipe exterior of fridge, oven & dishwasher', 'Scrub & disinfect sink and taps', 'Mop floor']
      },
      {
        room: 'Bathrooms',
        items: ['Disinfect shower screen & tiles', 'Clean & scrub bathtub', 'Sanitize toilet bowl and seat', 'Wipe vanity, basin and polish mirror', 'Mop and disinfect floor']
      }
    ]
  },
  {
    id: 'deep',
    title: 'Deep Intensive Clean',
    slug: 'deep-clean',
    subtitle: 'Thorough top-to-bottom detail for homes needing extra care',
    shortDesc: 'An intensive refresh tackling built-up grime, skirting boards, grout, and hidden dust.',
    longDesc: 'When your home needs a reset, our Deep Clean goes deeper. We wash skirting boards, door frames, light switches, limescale, and vacuum behind moveable furniture.',
    category: 'residential',
    basePrice: 240,
    priceNote: '$240 flat base',
    badge: 'Deep Detail',
    popular: false,
    estimatedHours: '4 - 6 hrs',
    heroImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
    icon: 'shield-check',
    highlights: [
      'Everything in Standard Clean plus:',
      'Detailed hand-wiping of all skirting boards & doors',
      'Tile grout descaling in shower & kitchen zones',
      'Cobweb removal and ceiling vent dusting',
      'Spot cleaning high-touch walls and switch plates'
    ],
    checklist: [
      {
        room: 'Living Areas & Hallways',
        items: ['Detailed skirting board washing', 'Door frames & handles disinfected', 'Cobweb removal from corners', 'Intensive vacuum & double mop']
      },
      {
        room: 'Kitchen Deep Clean',
        items: ['Rangehood grease breakdown', 'Detailed splashback grout scrub', 'Small appliance exteriors wiped', 'Bin storage zone sanitized']
      },
      {
        room: 'Bathroom Deep Sanitisation',
        items: ['Limescale & soap scum mineral removal', 'Deep tile grout scrub', 'Exhaust fan cover dusted', 'Chrome fittings polished']
      }
    ]
  },
  {
    id: 'vacate',
    title: 'Vacate & End of Lease Clean',
    slug: 'vacate-clean',
    subtitle: '100% Bond Back Guarantee meeting real estate inspection criteria',
    shortDesc: 'Complete property handover clean. Free re-clean within 72 hours if flagged by your agent.',
    longDesc: 'Moving out is stressful enough. Our Vacate Clean meets rigorous property inspection standards. If your property manager flags any cleaning item, we return free of charge.',
    category: 'residential',
    basePrice: 360,
    priceNote: '$360 flat base',
    badge: 'Bond Clean',
    popular: true,
    estimatedHours: '5 - 8 hrs',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    icon: 'badge-percent',
    highlights: [
      'Approved inspection checklist',
      'Full interior oven and rangehood degreasing included',
      'Interior window glass & tracks wiped clean',
      'Inside all cupboards, drawers and wardrobes cleaned',
      'Wall mark spot cleaning and door frame wipe down',
      'Free return re-clean guarantee within 72 hours'
    ],
    checklist: [
      {
        room: 'Kitchen Handover',
        items: ['Oven interior baked grease removal', 'Rangehood filter degreasing', 'Inside & out of all cabinets and drawers', 'Dishwasher filter and seals cleaned', 'Sink descaling & polish']
      },
      {
        room: 'Rooms & Storage',
        items: ['Inside built-in wardrobes and drawers', 'Window tracks & glass cleaned', 'Spot cleaning scuffs on walls', 'Light switches and fixtures wiped']
      },
      {
        room: 'Bathrooms & Laundry',
        items: ['Heavy soap scum removal from glass screens', 'Silicone mold spot treatment', 'Laundry trough and taps descaled', 'Exhaust vents cleaned']
      }
    ]
  },
  {
    id: 'commercial',
    title: 'Office & Workspace Cleaning',
    slug: 'commercial-clean',
    subtitle: 'Reliable, professional cleaning for modern businesses',
    shortDesc: 'Regular after-hours or daytime cleaning for offices, studios, and commercial spaces.',
    longDesc: 'Create a clean, healthy workplace for your team and visitors. Flexible scheduling with vetted cleaners, tailored to your office layout.',
    category: 'commercial',
    basePrice: 180,
    priceNote: '$180 flat base',
    badge: 'Workplace',
    popular: false,
    estimatedHours: '3 - 5 hrs',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    icon: 'building',
    highlights: [
      'Desks, counters and meeting room sanitation',
      'Staff kitchen and breakroom deep cleaning',
      'Commercial vacuuming and hard floor mopping',
      'Restroom sanitisation and consumable restock',
      'Secure keyholder protocols'
    ],
    checklist: [
      {
        room: 'Workstations & Common Areas',
        items: ['Sanitise desks and surfaces', 'Empty recycling and waste bins', 'Dust window sills & horizontal blinds', 'Vacuum high-traffic walkways']
      },
      {
        room: 'Kitchen & Meeting Rooms',
        items: ['Clean microwave & fridge exterior', 'Wash sink and polish taps', 'Sanitise boardroom tables and chairs', 'Mop floors']
      },
      {
        room: 'Commercial Restrooms',
        items: ['Deep sanitize toilets and basins', 'Disinfect door handles and mirrors', 'Restock supplies', 'Anti-bacterial floor mopping']
      }
    ]
  }
];

export const DUMMY_EXTRAS: ExtraServiceItem[] = [
  { id: 'oven', name: 'Interior Oven Deep Clean', price: 60, icon: 'oven', description: 'Removes baked-on grease & carbon', estimatedMinutes: 45 },
  { id: 'fridge', name: 'Interior Fridge & Freezer Wipe', price: 45, icon: 'fridge', description: 'Shelves washed and food compartments disinfected', estimatedMinutes: 30 },
  { id: 'windows', name: 'Interior Windows & Tracks', price: 75, icon: 'window', description: 'Up to 10 reachable windows inside the home', estimatedMinutes: 60 },
  { id: 'balcony', name: 'Balcony / Patio Sweep & Wash', price: 50, icon: 'balcony', description: 'Outdoor tile scrub and railing wipe down', estimatedMinutes: 35 },
  { id: 'carpetSteam', name: 'Carpet Steam (2 Rooms)', price: 90, icon: 'steam', description: 'Industrial hot water allergen extraction', estimatedMinutes: 50 },
  { id: 'cabinets', name: 'Inside Kitchen Cabinets', price: 55, icon: 'cabinet', description: 'Cupboards emptied, wiped and re-organized', estimatedMinutes: 45 }
];

export const FREQUENCY_OPTIONS: FrequencyOption[] = [
  {
    id: 'once_off',
    name: 'One-Time Clean',
    description: 'Single booking'
  },
  {
    id: 'weekly',
    name: 'Weekly Clean',
    description: 'Every 7 days'
  },
  {
    id: 'fortnightly',
    name: 'Fortnightly',
    description: 'Every 2 weeks'
  },
  {
    id: 'monthly',
    name: 'Every 4 Weeks',
    description: 'Monthly schedule'
  }
];

export const DUMMY_SUBURBS: SuburbCoverage[] = [
  { postcode: '6000', name: 'Perth CBD', region: 'Central Perth', available: true, nextAvailableSlot: 'Tomorrow, 9:00 AM' },
  { postcode: '6005', name: 'West Perth', region: 'Central Perth', available: true, nextAvailableSlot: 'Tomorrow, 10:30 AM' },
  { postcode: '6008', name: 'Subiaco', region: 'Western Suburbs', available: true, nextAvailableSlot: 'Tomorrow, 8:00 AM' },
  { postcode: '6010', name: 'Claremont', region: 'Western Suburbs', available: true, nextAvailableSlot: 'Thursday, 1:00 PM' },
  { postcode: '6011', name: 'Cottesloe', region: 'Western Suburbs', available: true, nextAvailableSlot: 'Friday, 9:00 AM' },
  { postcode: '6151', name: 'South Perth', region: 'South Perth', available: true, nextAvailableSlot: 'Tomorrow, 11:00 AM' },
  { postcode: '6152', name: 'Como', region: 'South Perth', available: true, nextAvailableSlot: 'Thursday, 9:00 AM' },
  { postcode: '6160', name: 'Fremantle', region: 'South Perth', available: true, nextAvailableSlot: 'Tomorrow, 2:00 PM' },
  { postcode: '6019', name: 'Scarborough', region: 'North Perth', available: true, nextAvailableSlot: 'Wednesday, 9:30 AM' },
  { postcode: '6020', name: 'Carine', region: 'North Perth', available: true, nextAvailableSlot: 'Thursday, 8:30 AM' },
  { postcode: '6050', name: 'Mount Lawley', region: 'Central Perth', available: true, nextAvailableSlot: 'Tomorrow, 1:30 PM' },
  { postcode: '6100', name: 'Victoria Park', region: 'South Perth', available: true, nextAvailableSlot: 'Tomorrow, 10:00 AM' }
];

export const INITIAL_STAFF_ACCOUNTS: StaffAccount[] = [
  {
    id: 'stf-1',
    name: 'Pipeloluwa Admin',
    email: 'superadmin@kleanix.com.au',
    phone: '0400 000 001',
    role: 'superadmin',
    status: 'active',
    policeCheckVerified: true,
    trainingVerified: true,
    joinedDate: 'Jan 2024',
    jobsCompleted: 0
  },
  {
    id: 'stf-2',
    name: 'Jessica Taylor',
    email: 'admin@kleanix.com.au',
    phone: '0412 888 999',
    role: 'admin',
    status: 'active',
    policeCheckVerified: true,
    trainingVerified: true,
    joinedDate: 'Mar 2024',
    jobsCompleted: 0
  },
  {
    id: 'stf-3',
    name: 'Elena Rostova',
    email: 'cleaner.elena@kleanix.com.au',
    phone: '0434 567 890',
    role: 'cleaner',
    status: 'active',
    suburbAssigned: 'South Perth & CBD',
    policeCheckVerified: true,
    trainingVerified: true,
    joinedDate: 'Feb 2024',
    jobsCompleted: 48
  },
  {
    id: 'stf-4',
    name: 'Marcus Cole',
    email: 'cleaner.marcus@kleanix.com.au',
    phone: '0445 678 901',
    role: 'cleaner',
    status: 'active',
    suburbAssigned: 'Western Suburbs',
    policeCheckVerified: true,
    trainingVerified: true,
    joinedDate: 'Apr 2024',
    jobsCompleted: 34
  }
];

export const INITIAL_PORTAL_BOOKINGS: DashboardBooking[] = [
  {
    id: 'bkg-101',
    reference: 'KLX-48201',
    customerName: 'Sarah Jenkins',
    customerPhone: '0412 345 678',
    serviceTitle: 'Standard Home Clean',
    address: '14 Labouchere Rd',
    suburb: 'South Perth',
    date: 'Tomorrow, Nov 1',
    timeSlot: '09:00 AM - 12:00 PM',
    status: 'upcoming',
    price: 155,
    cleanerAssigned: 'Elena Rostova'
  },
  {
    id: 'bkg-102',
    reference: 'KLX-48202',
    customerName: 'David Miller',
    customerPhone: '0423 456 789',
    serviceTitle: 'Vacate & End of Lease Clean',
    address: '88 Rokeby Rd',
    suburb: 'Subiaco',
    date: 'Friday, Nov 3',
    timeSlot: '08:30 AM - 02:30 PM',
    status: 'upcoming',
    price: 410,
    cleanerAssigned: 'Marcus Cole'
  },
  {
    id: 'bkg-103',
    reference: 'KLX-48195',
    customerName: 'Amanda Clarke',
    customerPhone: '0419 888 222',
    serviceTitle: 'Deep Intensive Clean',
    address: '22 Marine Parade',
    suburb: 'Cottesloe',
    date: 'Oct 28',
    timeSlot: '10:00 AM - 03:00 PM',
    status: 'completed',
    price: 290,
    cleanerAssigned: 'Elena Rostova'
  },
  {
    id: 'bkg-104',
    reference: 'KLX-48190',
    customerName: 'TechHub Perth',
    customerPhone: '08 9200 1122',
    serviceTitle: 'Office & Workspace Cleaning',
    address: '100 St Georges Terrace',
    suburb: 'Perth CBD',
    date: 'Oct 26',
    timeSlot: '05:30 PM - 08:30 PM',
    status: 'completed',
    price: 220,
    cleanerAssigned: 'Marcus Cole'
  }
];

// ==========================================
// CALCULATE CLEANING PRICE (Straight Flat Rate, Zero Discounts)
// ==========================================

export function calculateCleaningPrice(params: {
  serviceId: string;
  bedrooms: number;
  bathrooms: number;
  frequency: CleanFrequency;
  extras: string[];
}) {
  const service = DUMMY_SERVICES.find(s => s.id === params.serviceId) || DUMMY_SERVICES[0];
  
  const bedroomRate = params.serviceId === 'vacate' ? 45 : params.serviceId === 'deep' ? 35 : 25;
  const bathroomRate = params.serviceId === 'vacate' ? 50 : params.serviceId === 'deep' ? 40 : 30;
  
  const extraBeds = Math.max(0, params.bedrooms - 1);
  const extraBaths = Math.max(0, params.bathrooms - 1);
  
  const roomCost = (extraBeds * bedroomRate) + (extraBaths * bathroomRate);
  const baseServiceCost = service.basePrice + roomCost;
  
  let extrasCost = 0;
  params.extras.forEach(extraId => {
    const item = DUMMY_EXTRAS.find(e => e.id === extraId);
    if (item) extrasCost += item.price;
  });
  
  const totalCost = baseServiceCost + extrasCost;
  const gstPortion = Math.round((totalCost / 11) * 100) / 100;
  
  const baseHours = params.serviceId === 'vacate' ? 4.5 : params.serviceId === 'deep' ? 3.5 : 2.5;
  const roomHours = (extraBeds * 0.4) + (extraBaths * 0.5);
  const totalHours = Math.round((baseHours + roomHours) * 10) / 10;

  return {
    baseRate: baseServiceCost,
    extrasTotal: extrasCost,
    subtotal: totalCost,
    taxGst: gstPortion,
    finalTotal: totalCost,
    estimatedHours: totalHours
  };
}

export const mockApiClient = {
  async getServices(): Promise<CleaningService[]> {
    await new Promise(r => setTimeout(r, 100));
    return DUMMY_SERVICES;
  },

  async getServiceBySlug(slug: string): Promise<CleaningService | null> {
    await new Promise(r => setTimeout(r, 80));
    return DUMMY_SERVICES.find(s => s.slug === slug) || null;
  },

  async submitBooking(bookingPayload: Partial<BookingState>): Promise<{
    success: boolean;
    reference: string;
    message: string;
    confirmationData: any;
  }> {
    await new Promise(r => setTimeout(r, 400));
    const randomRef = 'KLX-' + Math.floor(10000 + Math.random() * 90000);
    const serviceName = DUMMY_SERVICES.find(s => s.id === bookingPayload.serviceId)?.title || 'Standard Home Clean';

    return {
      success: true,
      reference: randomRef,
      message: 'Booking confirmed!',
      confirmationData: {
        reference: randomRef,
        submittedAt: new Date().toISOString(),
        customerName: bookingPayload.customer?.fullName || 'Customer',
        serviceName,
        totalAmount: bookingPayload.finalTotal || 160,
        scheduledDate: bookingPayload.date || 'Upcoming Date',
        scheduledTime: bookingPayload.timeSlot || '09:00 AM - 12:00 PM',
        address: `${bookingPayload.customer?.address || '9 Parker St'}, ${bookingPayload.customer?.suburb || 'South Perth'} WA`
      }
    };
  }
};
