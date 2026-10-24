'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INavBgState {
  value: boolean;
}

const initialValue: INavBgState = {
  value: false
};

const navBg = createSlice({
  name: "nav-bg-state",
  initialState: initialValue,
  reducers: {
    setNavBg: (state, args: PayloadAction<{ scrollValue: number | undefined }>) => {
      const scroll = args.payload.scrollValue ?? 0;
      if (scroll > 20 && !state.value) {
        state.value = true;
      } else if (scroll <= 20 && state.value) {
        state.value = false;
      }
    }
  }
});

export const { setNavBg } = navBg.actions;
export default navBg.reducer;