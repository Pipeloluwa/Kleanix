import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { SuburbCoverage } from '../../types';
import { DUMMY_SUBURBS, mockApiClient } from '../../../services/mockApiService';

interface SuburbsState {
  items: SuburbCoverage[];
  searchQuery: string;
  searchResult: SuburbCoverage | null;
  notFound: boolean;
  isSearching: boolean;
}

const initialState: SuburbsState = {
  items: DUMMY_SUBURBS,
  searchQuery: '',
  searchResult: null,
  notFound: false,
  isSearching: false
};

export const checkSuburbThunk = createAsyncThunk(
  'suburbs/checkCoverage',
  async (query: string) => {
    return await mockApiClient.checkSuburbCoverage(query);
  }
);

export const suburbsSlice = createSlice({
  name: 'suburbs',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      if (!action.payload.trim()) {
        state.searchResult = null;
        state.notFound = false;
      }
    },
    resetSuburbSearch: (state) => {
      state.searchQuery = '';
      state.searchResult = null;
      state.notFound = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkSuburbThunk.pending, (state) => {
        state.isSearching = true;
        state.notFound = false;
      })
      .addCase(checkSuburbThunk.fulfilled, (state, action) => {
        state.isSearching = false;
        if (action.payload.found && action.payload.suburb) {
          state.searchResult = action.payload.suburb;
          state.notFound = false;
        } else {
          state.searchResult = null;
          state.notFound = true;
        }
      })
      .addCase(checkSuburbThunk.rejected, (state) => {
        state.isSearching = false;
        state.notFound = true;
      });
  }
});

export const { setSearchQuery, resetSuburbSearch } = suburbsSlice.actions;
export default suburbsSlice.reducer;
