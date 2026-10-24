'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INavValue{
    value:string;
}

const initialValue: INavValue= {
    value:''
}

const navValue= createSlice({
    name: "nav-value",
    initialState: initialValue,
    reducers: {
        setNavValue: (state, args:PayloadAction<{action:string}>) => {
            state.value= args.payload.action;

        }
    }
});

export const{setNavValue}= navValue.actions;
export default navValue.reducer;