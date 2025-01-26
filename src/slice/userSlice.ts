import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User{
    token:string |undefined
};

const initialState:User={
    token:undefined
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setUserId: (state, action: PayloadAction<{token:string}>) => {
        state.token = action.payload.token;
      },
      clearUserId: (state) => {
        state.token = undefined;
      },
    },
  });

  export const { setUserId, clearUserId } = userSlice.actions;
  export const userReducer = userSlice.reducer;