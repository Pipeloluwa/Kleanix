export type ServiceCategory = 'residential' | 'commercial' | 'specialized' | 'outdoor';

export interface RoomInclusion {
  room: string;
  items: string[];
}

export interface CleaningService {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  shortDesc: string;
  longDesc: string;
  category: ServiceCategory;
  basePrice: number;
  priceNote: string;
  badge?: string;
  popular?: boolean;
  estimatedHours: string;
  heroImage: string;
  icon: string;
  checklist: RoomInclusion[];
  highlights: string[];
}

export interface ExtraServiceItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
  estimatedMinutes: number;
}

export type CleanFrequency = 'once_off' | 'weekly' | 'fortnightly' | 'monthly';

export interface FrequencyOption {
  id: CleanFrequency;
  name: string;
  discountPercentage: number;
  badge?: string;
  description: string;
}

export interface BookingCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  unitNumber?: string;
  suburb: string;
  postcode: string;
  accessMethod: 'someone_home' | 'key_under_mat' | 'lockbox' | 'building_concierge' | 'call_on_arrival';
  accessNotes?: string;
  specialInstructions?: string;
  parkingAvailable: boolean;
  hasPets: boolean;
}

export interface BookingState {
  currentStep: number;
  serviceId: string;
  bedrooms: number;
  bathrooms: number;
  frequency: CleanFrequency;
  date: string;
  timeSlot: string;
  selectedExtras: string[]; // ExtraServiceItem ids
  customer: BookingCustomer;
  couponCode: string;
  appliedDiscount: number;
  couponValid: boolean;
  couponError?: string;
  subtotal: number;
  discountTotal: number;
  taxGst: number;
  finalTotal: number;
  status: 'idle' | 'configuring' | 'submitting' | 'confirmed' | 'failed';
  bookingReference?: string;
  confirmationData?: {
    reference: string;
    submittedAt: string;
    customerName: string;
    serviceName: string;
    totalAmount: number;
    scheduledDate: string;
    scheduledTime: string;
    address: string;
  };
  error?: string;
}

export interface QuoteFormState {
  serviceId: string;
  bedrooms: number;
  bathrooms: number;
  frequency: CleanFrequency;
  suburb: string;
  estimatedTotal: number;
  estimatedHours: number;
  discountSaved: number;
  isCalculated: boolean;
}

export interface CustomerReview {
  id: string;
  author: string;
  suburb: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  verified: boolean;
  avatar?: string;
}

export interface SuburbCoverage {
  postcode: string;
  name: string;
  region: 'North Perth' | 'South Perth' | 'Western Suburbs' | 'Eastern Suburbs' | 'Central Perth' | 'Mandurah & Rockingham';
  available: boolean;
  nextAvailableSlot: string;
}
