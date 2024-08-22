import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  email: string;
  password: string;
  token: string | null;
}

const initialState: UserState = {
  username: '',
  email: '',
  password: '',
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Omit<UserState, 'token'>>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearUserData: (state) => {
      state.username = '';
      state.email = '';
      state.password = '';
      state.token = null;
    },
  },
});

export const { setUserData, setToken, clearUserData } = userSlice.actions;

export default userSlice.reducer;
