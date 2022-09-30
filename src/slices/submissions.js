import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "src/services/cookies";
import isAuth from "src/utils/isAuth";
import { Navigate } from "react-router-dom";

export const getSubmissions = createAsyncThunk(
  "/submissions",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://gxoib8zz.directus.app/items/submissions",
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

export const getSubmission = createAsyncThunk(
  "/submission",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://gxoib8zz.directus.app/items/submissions/" + payload.id,
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

export const createSubmission = createAsyncThunk(
  "/submission",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://gxoib8zz.directus.app/items/submissions",
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

// export const updateSubmission = createAsyncThunk(
//   "/submission",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         "https://gxoib8zz.directus.app/items/submissions/" + payload.id,
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

// export const deleteSubmission = createAsyncThunk(
//   "/submission",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         "https://gxoib8zz.directus.app/items/submissions/" + payload.id,
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

// export const exportSubmissionsCsv = createAsyncThunk(
//   "export-submissions-csv",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         "https://gxoib8zz.directus.app/utils/export/submissions",
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
  submissions: [],
  submission: {},
  isLoading: false,
  error: null,
};

export const submissionsSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {
    clearSubmission: (state) => {
      state.submission = {};
    },
  },
  extraReducers: {
    [getSubmissions.pending]: (state) => {
      state.isLoading = true;
    },
    [getSubmissions.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.submissions = action.payload.data;
    },
    [getSubmissions.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getSubmission.pending]: (state) => {
      state.isLoading = true;
    },
    [getSubmission.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.submission = action.payload.data;
    },
    [getSubmission.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [createSubmission.pending]: (state) => {
      state.isLoading = true;
    },
    [createSubmission.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.submission = action.payload.data;
    },
    [createSubmission.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // [updateSubmission.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [updateSubmission.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.submission = action.payload.data;
    // },
    // [updateSubmission.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // [deleteSubmission.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [deleteSubmission.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.submission = action.payload.data;
    // },
    // [deleteSubmission.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

export const { clearSubmission } = submissionsSlice.actions;
export default submissionsSlice.reducer;
