import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User{
    token:string |null,
    verifiedOtp:boolean,
    income:number
};

const initialState:User={
    token:window.localStorage.getItem('token')?window.localStorage.getItem('token'):null,
    verifiedOtp:false,
    income:0
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setVerifiedOtp:(state,action:PayloadAction<{verifiedOtp:boolean}>)=>{
        state.verifiedOtp=action.payload.verifiedOtp;

      },
      setUserId: (state, action: PayloadAction<{token:string}>) => {
        state.token = action.payload.token;
        window.localStorage.setItem('token',state.token);
      },
      setIncome:(state,action:PayloadAction<{income:number}>)=>{
        state.income=action.payload.income

      },
      clearToken: (state) => {
        state.token = null;
        state.verifiedOtp=false;
        window.localStorage.removeItem('token');
      },
    },
  });

  export const { setUserId, clearToken ,setVerifiedOtp,setIncome} = userSlice.actions;
  export const userReducer = userSlice.reducer;