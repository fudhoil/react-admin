import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "src/services/cookies";

const userId = getCookie("userProfile").data[0].id;
console.log("userId", userId);

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get(
    "https://gxoib8zz.directus.app/users/" + userId
  );
  return response.data;
});

const initialState = {
  user: null,
  status: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.data;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
