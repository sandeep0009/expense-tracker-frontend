import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User{
    token:string |null,
    verifiedOtp:boolean
};

const initialState:User={
    token:window.localStorage.getItem('token')?window.localStorage.getItem('token'):null,
    verifiedOtp:false
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
      clearToken: (state) => {
        state.token = null;
        state.verifiedOtp=false;
        window.localStorage.removeItem('token');
      },
    },
  });

  export const { setUserId, clearToken ,setVerifiedOtp} = userSlice.actions;
  export const userReducer = userSlice.reducer;