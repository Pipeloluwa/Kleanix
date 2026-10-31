export type ServiceCategory = 'residential' | 'commercial' | 'specialized';

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
  selectedExtras: string[];
  customer: BookingCustomer;
  subtotal: number;
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

export interface SuburbCoverage {
  postcode: string;
  name: string;
  region: 'North Perth' | 'South Perth' | 'Western Suburbs' | 'Eastern Suburbs' | 'Central Perth' | 'Mandurah & Rockingham';
  available: boolean;
  nextAvailableSlot: string;
}

export type StaffRole = 'cleaner' | 'admin' | 'superadmin';

export interface StaffAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: StaffRole;
  status: 'active' | 'suspended';
  suburbAssigned?: string;
  policeCheckVerified: boolean;
  trainingVerified: boolean;
  joinedDate: string;
  jobsCompleted?: number;
  passwordHash?: string;
}

export interface DashboardBooking {
  id: string;
  reference: string;
  customerName: string;
  customerPhone: string;
  serviceTitle: string;
  address: string;
  suburb: string;
  date: string;
  timeSlot: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
  price: number;
  cleanerAssigned?: string;
}
