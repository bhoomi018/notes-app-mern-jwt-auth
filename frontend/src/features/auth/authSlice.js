import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const data = await api('http://localhost:5000/auth/login', { method: 'POST', body: { email, password } });
    return data.token;
  } catch (err) {
    return rejectWithValue(err.message || err);
  }
});

const slice = createSlice({
  name: 'auth',
  initialState: { token: null, loading: false, error: null },
  reducers: {
    logout(state) { state.token = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.token = action.payload; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload || 'Login failed'; });
  }
});

export const { logout } = slice.actions;
export default slice.reducer;
