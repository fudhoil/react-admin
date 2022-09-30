import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "src/services/cookies";
import isAuth from "src/utils/isAuth";
import { Navigate } from "react-router-dom";
import { useRouteError } from "react-router-dom";

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
        const getIdUser = await fetch(
          "https://gxoib8zz.directus.app/users?filter[email][_eq]=" +
            payload.values.email,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.data.access_token}`,
            },
          }
        );
        const user = await getIdUser.json();
        setCookie("userProfile", user);
        setCookie("user", data.data);
        <Navigate to="/" replace />;
        window.location.reload();
      }
      if (!response.ok) {
        throw new Error(data.errors[0].message);
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

export const isLoggedIn = createAsyncThunk("/isLoggedIn", async () => {
  const response = await fetch("https://gxoib8zz.directus.app/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("user").access_token}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  const error = await new Error(data.message);
  if (!response.ok) {
    throw error;
  }
  return data;
});

const initialState = {
  email: "",
  password: "",
  isAuth: isAuth(),
  isLogged: false,
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
      console.log("pl:", action.errors);
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
    [isLoggedIn.pending]: (state) => {
      state.isLoading = true;
    },
    [isLoggedIn.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogged = true;
      state.error = null;
    },
    [isLoggedIn.rejected]: (state, action) => {
      state.isLoading = false;
      state.isLogged = false;
      state.error = action.payload;
    },
  },
});

export default loginSlice.reducer;
