import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface UiState {
  quoteModalOpen: boolean;
  mobileMenuOpen: boolean;
  activeServiceSlug: string;
  toasts: ToastNotification[];
}

const initialState: UiState = {
  quoteModalOpen: false,
  mobileMenuOpen: false,
  activeServiceSlug: 'standard-clean',
  toasts: []
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openQuoteModal: (state) => {
      state.quoteModalOpen = true;
    },
    closeQuoteModal: (state) => {
      state.quoteModalOpen = false;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },
    setActiveServiceSlug: (state, action: PayloadAction<string>) => {
      state.activeServiceSlug = action.payload;
    },
    addToast: (state, action: PayloadAction<Omit<ToastNotification, 'id'>>) => {
      const id = `toast-${Date.now()}`;
      state.toasts.push({ ...action.payload, id });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(t => t.id !== action.payload);
    }
  }
});

export const {
  openQuoteModal,
  closeQuoteModal,
  toggleMobileMenu,
  setMobileMenuOpen,
  setActiveServiceSlug,
  addToast,
  removeToast
} = uiSlice.actions;

export default uiSlice.reducer;
