import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User{
    token:string |null
};

const initialState:User={
    token:window.localStorage.getItem('token')?window.localStorage.getItem('token'):null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setUserId: (state, action: PayloadAction<{token:string}>) => {
        state.token = action.payload.token;
        window.localStorage.setItem('token',state.token);
      },
      clearToken: (state) => {
        state.token = null;
        window.localStorage.removeItem('token');
      },
    },
  });

  export const { setUserId, clearToken } = userSlice.actions;
  export const userReducer = userSlice.reducer;