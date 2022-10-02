import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "src/services/cookies";
import isAuth from "src/utils/isAuth";
import { Navigate } from "react-router-dom";

export const getSubmitions = createAsyncThunk(
  "/submitions",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://gxoib8zz.directus.app/items/submition",
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

export const getSubmition = createAsyncThunk(
  "/submition",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://gxoib8zz.directus.app/items/submitions/" + payload.id,
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

export const createSubmition = createAsyncThunk(
  "/submition",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://gxoib8zz.directus.app/items/submitions",
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

// export const updateSubmition = createAsyncThunk(
//   "/submition",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         "https://gxoib8zz.directus.app/items/submitions/" + payload.id,
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

// export const deleteSubmition = createAsyncThunk(
//   "/submition",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         "https://gxoib8zz.directus.app/items/submitions/" + payload.id,
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

// export const exportSubmitionsCsv = createAsyncThunk(
//   "export-submitions-csv",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         "https://gxoib8zz.directus.app/utils/export/submitions",
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
  submitions: [],
  submition: {},
  isLoading: false,
  error: null,
};

export const submitionsSlice = createSlice({
  name: "submitions",
  initialState,
  reducers: {
    clearSubmition: (state) => {
      state.submition = {};
    },
  },
  extraReducers: {
    [getSubmitions.pending]: (state) => {
      state.isLoading = true;
    },
    [getSubmitions.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.submitions = action.payload.data;
    },
    [getSubmitions.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getSubmition.pending]: (state) => {
      state.isLoading = true;
    },
    [getSubmition.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.submition = action.payload.data;
    },
    [getSubmition.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [createSubmition.pending]: (state) => {
      state.isLoading = true;
    },
    [createSubmition.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.submition = action.payload.data;
    },
    [createSubmition.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // [updateSubmition.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [updateSubmition.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.submition = action.payload.data;
    // },
    // [updateSubmition.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // [deleteSubmition.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [deleteSubmition.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.submition = action.payload.data;
    // },
    // [deleteSubmition.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

export const { clearSubmition } = submitionsSlice.actions;
export default submitionsSlice.reducer;
