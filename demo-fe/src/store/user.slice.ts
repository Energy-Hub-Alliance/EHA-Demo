import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const USER_FEATURE_KEY = 'user';

export type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
};

export interface UserState {
  userState: UserInfo;
}

const initialState: UserState = {
  userState: {} as UserInfo,
};

export const userSlice = createSlice({
  name: USER_FEATURE_KEY,
  initialState,
  reducers: {
    setUser: (state, { payload: user }: PayloadAction<UserInfo>) => {
      state.userState = user;
    },
  },
});

export const { setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
