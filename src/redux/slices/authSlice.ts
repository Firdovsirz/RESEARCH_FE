import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  name: string | null;
  surname: string | null;
  father_name: string | null;
  fin_kod: string | null;
  role: number | null;
  email: string | null;
  birth_date: string | null;
  created_at: string | null;
  updated_at: string | null;
  token: string | null;
}

const initialState: AuthState = {
  name: null,
  surname: null,
  father_name: null,
  fin_kod: null,
  role: null,
  email: null,
  birth_date: null,
  created_at: null,
  updated_at: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state: AuthState,
      action: PayloadAction<{
        token: string;
        user?: Partial<Omit<AuthState, "token">>;
      }>
    ) => {
      const { user = {}, token } = action.payload;
      Object.assign(state, { ...user, token });
    },
    logout: () => initialState,
    clearLoginSteps: (state: AuthState) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  loginSuccess,
  clearLoginSteps,
  logout
} = authSlice.actions;
export default authSlice.reducer;