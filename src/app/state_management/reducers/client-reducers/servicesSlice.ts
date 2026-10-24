import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CleaningService, ServiceCategory } from '../../types';
import { DUMMY_SERVICES, mockApiClient } from '../../../services/mockApiService';

interface ServicesState {
  items: CleaningService[];
  activeCategory: ServiceCategory | 'all';
  selectedService: CleaningService | null;
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  items: DUMMY_SERVICES,
  activeCategory: 'all',
  selectedService: DUMMY_SERVICES[0],
  loading: false,
  error: null
};

export const fetchServicesThunk = createAsyncThunk(
  'services/fetchServices',
  async () => {
    return await mockApiClient.getServices();
  }
);

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<ServiceCategory | 'all'>) => {
      state.activeCategory = action.payload;
    },
    setSelectedService: (state, action: PayloadAction<string>) => {
      state.selectedService = state.items.find(s => s.id === action.payload) || null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServicesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchServicesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load services';
      });
  }
});

export const { setActiveCategory, setSelectedService } = servicesSlice.actions;
export default servicesSlice.reducer;
