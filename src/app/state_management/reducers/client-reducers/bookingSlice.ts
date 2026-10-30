import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BookingState, CleanFrequency, BookingCustomer } from '../../types';
import { calculateCleaningPrice, mockApiClient } from '../../../services/mockApiService';

const initialCustomer: BookingCustomer = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  unitNumber: '',
  suburb: 'South Perth',
  postcode: '6151',
  accessMethod: 'someone_home',
  accessNotes: '',
  specialInstructions: '',
  parkingAvailable: true,
  hasPets: false
};

const defaultPricing = calculateCleaningPrice({
  serviceId: 'standard',
  bedrooms: 2,
  bathrooms: 1,
  frequency: 'once_off',
  extras: []
});

const initialState: BookingState = {
  currentStep: 1,
  serviceId: 'standard',
  bedrooms: 2,
  bathrooms: 1,
  frequency: 'once_off',
  date: '',
  timeSlot: '09:00 AM - 12:00 PM',
  selectedExtras: [],
  customer: initialCustomer,
  subtotal: defaultPricing.subtotal,
  taxGst: defaultPricing.taxGst,
  finalTotal: defaultPricing.finalTotal,
  status: 'idle',
  bookingReference: undefined,
  confirmationData: undefined,
  error: undefined
};

export const submitBookingThunk = createAsyncThunk(
  'booking/submitBooking',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = (getState() as any).booking as BookingState;
      const response = await mockApiClient.submitBooking(state);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Submission failed');
    }
  }
);

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < 4) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    setServiceId: (state, action: PayloadAction<string>) => {
      state.serviceId = action.payload;
      recalculate(state);
    },
    setBedrooms: (state, action: PayloadAction<number>) => {
      state.bedrooms = Math.max(1, Math.min(8, action.payload));
      recalculate(state);
    },
    setBathrooms: (state, action: PayloadAction<number>) => {
      state.bathrooms = Math.max(1, Math.min(6, action.payload));
      recalculate(state);
    },
    setFrequency: (state, action: PayloadAction<CleanFrequency>) => {
      state.frequency = action.payload;
      recalculate(state);
    },
    toggleExtra: (state, action: PayloadAction<string>) => {
      const extraId = action.payload;
      if (state.selectedExtras.includes(extraId)) {
        state.selectedExtras = state.selectedExtras.filter(id => id !== extraId);
      } else {
        state.selectedExtras.push(extraId);
      }
      recalculate(state);
    },
    setSchedule: (state, action: PayloadAction<{ date: string; timeSlot: string }>) => {
      state.date = action.payload.date;
      state.timeSlot = action.payload.timeSlot;
    },
    updateCustomerField: (state, action: PayloadAction<{ field: keyof BookingCustomer; value: any }>) => {
      state.customer = {
        ...state.customer,
        [action.payload.field]: action.payload.value
      };
    },
    setCustomer: (state, action: PayloadAction<BookingCustomer>) => {
      state.customer = action.payload;
    },
    resetBooking: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(submitBookingThunk.pending, (state) => {
      state.status = 'submitting';
      state.error = undefined;
    });
    builder.addCase(submitBookingThunk.fulfilled, (state, action) => {
      state.status = 'confirmed';
      state.bookingReference = action.payload.reference;
      state.confirmationData = action.payload.confirmationData;
      state.currentStep = 4;
    });
    builder.addCase(submitBookingThunk.rejected, (state, action) => {
      state.status = 'failed';
      state.error = (action.payload as string) || 'Booking submission encountered an error';
    });
  }
});

function recalculate(state: BookingState) {
  const calc = calculateCleaningPrice({
    serviceId: state.serviceId,
    bedrooms: state.bedrooms,
    bathrooms: state.bathrooms,
    frequency: state.frequency,
    extras: state.selectedExtras
  });

  state.subtotal = calc.subtotal;
  state.taxGst = calc.taxGst;
  state.finalTotal = calc.finalTotal;
}

export const {
  setStep,
  nextStep,
  prevStep,
  setServiceId,
  setBedrooms,
  setBathrooms,
  setFrequency,
  toggleExtra,
  setSchedule,
  updateCustomerField,
  setCustomer,
  resetBooking
} = bookingSlice.actions;

export default bookingSlice.reducer;
