import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuoteFormState, CleanFrequency } from '../../types';
import { calculateCleaningPrice } from '../../../services/mockApiService';

const initialPricing = calculateCleaningPrice({
  serviceId: 'standard',
  bedrooms: 3,
  bathrooms: 2,
  frequency: 'fortnightly',
  extras: []
});

const initialState: QuoteFormState = {
  serviceId: 'standard',
  bedrooms: 3,
  bathrooms: 2,
  frequency: 'fortnightly',
  suburb: 'Perth CBD (6000)',
  estimatedTotal: initialPricing.finalTotal,
  estimatedHours: initialPricing.estimatedHours,
  discountSaved: initialPricing.frequencyDiscount,
  isCalculated: true
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    updateQuoteService: (state, action: PayloadAction<string>) => {
      state.serviceId = action.payload;
      recalculateQuote(state);
    },
    updateQuoteBedrooms: (state, action: PayloadAction<number>) => {
      state.bedrooms = Math.max(1, Math.min(8, action.payload));
      recalculateQuote(state);
    },
    updateQuoteBathrooms: (state, action: PayloadAction<number>) => {
      state.bathrooms = Math.max(1, Math.min(6, action.payload));
      recalculateQuote(state);
    },
    updateQuoteFrequency: (state, action: PayloadAction<CleanFrequency>) => {
      state.frequency = action.payload;
      recalculateQuote(state);
    },
    updateQuoteSuburb: (state, action: PayloadAction<string>) => {
      state.suburb = action.payload;
    }
  }
});

function recalculateQuote(state: QuoteFormState) {
  const result = calculateCleaningPrice({
    serviceId: state.serviceId,
    bedrooms: state.bedrooms,
    bathrooms: state.bathrooms,
    frequency: state.frequency,
    extras: []
  });

  state.estimatedTotal = result.finalTotal;
  state.estimatedHours = result.estimatedHours;
  state.discountSaved = result.frequencyDiscount;
  state.isCalculated = true;
}

export const {
  updateQuoteService,
  updateQuoteBedrooms,
  updateQuoteBathrooms,
  updateQuoteFrequency,
  updateQuoteSuburb
} = quoteSlice.actions;

export default quoteSlice.reducer;
