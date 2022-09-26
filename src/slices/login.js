import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "src/services/cookies";
import isAuth from "src/utils/isAuth";
import { Navigate } from "react-router-dom";

export const login = createAsyncThunk(
  "/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch("https://gxoib8zz.directus.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: payload.values.email,
          password: payload.values.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setCookie("user", data.data);
        <Navigate to="/" />;
        window.location.reload();
      }
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logout = createAsyncThunk("/logout", async () => {
  const response = await fetch("https://gxoib8zz.directus.app/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: getCookie("user").refresh_token,
    }),
  });
  console.log(response);
  if (response.ok) {
    removeCookie("user");
    <Navigate to="/" />;
    window.location.reload();
  }
  if (!response.ok) {
    throw new Error(data.message);
  }
  return true;
});

const initialState = {
  email: "",
  password: "",
  isAuth: isAuth(),
  isLoading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = null;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [logout.pending]: (state) => {
      state.isLoading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = null;
    },
    [logout.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default loginSlice.reducer;
