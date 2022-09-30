import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "src/services/cookies";
import isAuth from "src/utils/isAuth";
import { Navigate } from "react-router-dom";

export const getRegisters = createAsyncThunk(
  "/registers",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://gxoib8zz.directus.app/items/register",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("user").access_token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        return data;
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

export const getRegister = createAsyncThunk(
  "/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://gxoib8zz.directus.app/items/register/" + payload.id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("user").access_token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        return data;
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

export const createRegister = createAsyncThunk(
  "/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://gxoib8zz.directus.app/items/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("user").access_token}`,
          },
          body: JSON.stringify({
            title: payload.values.title,
            description: payload.values.description,
            user: getCookie("userProfile").data[0].id,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        return data;
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

// export const updateRegister = createAsyncThunk(
//   "/register",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         "https://gxoib8zz.directus.app/items/registers/" + payload.id,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${getCookie("user").access_token}`,
//           },
//           body: JSON.stringify({
//             title: payload.values.title,
//             description: payload.values.description,
//           }),
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         return data;
//       }
//       if (!response.ok) {
//         throw new Error(data.errors[0].message);
//       }
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// export const deleteRegister = createAsyncThunk(
//   "/register",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         "https://gxoib8zz.directus.app/items/registers/" + payload.id,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${getCookie("user").access_token}`,
//           },
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         return data;
//       }
//       if (!response.ok) {
//         throw new Error(data.errors[0].message);
//       }
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// export const exportRegistersCsv = createAsyncThunk(
//   "export-registers-csv",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         "https://gxoib8zz.directus.app/utils/export/registers",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${getCookie("user").access_token}`,
//           },
//           body: JSON.stringify({
//             query: {
//               title
//             }
//           })
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         return data;
//       }
//       if (!response.ok) {
//         throw new Error(data.errors[0].message);
//       }
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

const initialState = {
  registers: [],
  register: {},
  isLoading: false,
  error: null,
};

export const registersSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    clearRegister: (state) => {
      state.register = {};
    },
  },
  extraReducers: {
    [getRegisters.pending]: (state) => {
      state.isLoading = true;
    },
    [getRegisters.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.registers = action.payload.data;
    },
    [getRegisters.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getRegister.pending]: (state) => {
      state.isLoading = true;
    },
    [getRegister.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.register = action.payload.data;
    },
    [getRegister.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [createRegister.pending]: (state) => {
      state.isLoading = true;
    },
    [createRegister.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.register = action.payload.data;
    },
    [createRegister.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // [updateRegister.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [updateRegister.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.register = action.payload.data;
    // },
    // [updateRegister.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // [deleteRegister.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [deleteRegister.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.register = action.payload.data;
    // },
    // [deleteRegister.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

export const { clearRegister } = registersSlice.actions;
export default registersSlice.reducer;
