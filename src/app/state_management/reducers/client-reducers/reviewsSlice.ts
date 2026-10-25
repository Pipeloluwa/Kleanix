import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerReview } from '../../types';
import { DUMMY_REVIEWS } from '../../../services/mockApiService';

interface ReviewsState {
  items: CustomerReview[];
  ratingFilter: number | 'all';
  serviceFilter: string | 'all';
  averageRating: number;
  totalCount: number;
  displayReviews: boolean; // Configurable toggle to display reviews and ratings across the site
  leaveReviewModalOpen: boolean; // Controls the Leave a Review modal popup
}

const initialState: ReviewsState = {
  items: DUMMY_REVIEWS,
  ratingFilter: 'all',
  serviceFilter: 'all',
  averageRating: 4.96,
  totalCount: 524,
  displayReviews: true,
  leaveReviewModalOpen: false
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setRatingFilter: (state, action: PayloadAction<number | 'all'>) => {
      state.ratingFilter = action.payload;
    },
    setServiceFilter: (state, action: PayloadAction<string | 'all'>) => {
      state.serviceFilter = action.payload;
    },
    setDisplayReviews: (state, action: PayloadAction<boolean>) => {
      state.displayReviews = action.payload;
    },
    toggleDisplayReviews: (state) => {
      state.displayReviews = !state.displayReviews;
    },
    openLeaveReviewModal: (state) => {
      state.leaveReviewModalOpen = true;
    },
    closeLeaveReviewModal: (state) => {
      state.leaveReviewModalOpen = false;
    },
    addCustomerReview: (state, action: PayloadAction<Omit<CustomerReview, 'id' | 'date' | 'verified'>>) => {
      const newReview: CustomerReview = {
        ...action.payload,
        id: `rev-${Date.now()}`,
        date: 'Just now',
        verified: true
      };
      state.items.unshift(newReview);
      state.totalCount += 1;
    }
  }
});

export const {
  setRatingFilter,
  setServiceFilter,
  setDisplayReviews,
  toggleDisplayReviews,
  openLeaveReviewModal,
  closeLeaveReviewModal,
  addCustomerReview
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
