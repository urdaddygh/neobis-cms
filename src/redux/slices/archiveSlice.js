import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requests } from "../api";

const initialState = {
  error: false,
  loading: false,
  groupsInfo: [],
  studentsInfo: [],
  employeeInfo:[]
};

export const getArchiveGroups = createAsyncThunk(
    "getArchiveReducer/getArchiveGroups",
    async () => {
      try {
        const res = await requests.getArchiveGroups();
        console.log("status code getGroups =", res.status);
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );
  export const getArchiveStudents = createAsyncThunk(
    "getArchiveReducer/getArchiveStudents",
    async () => {
      try {
        const res = await requests.getArchiveStudents();
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );
  export const getArchiveEmployee = createAsyncThunk(
    "getArchiveReducer/getArchiveEmployee",
    async () => {
      try {
        const res = await requests.getArchiveEmployee();
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );
const archiveApiSlice = createSlice({
  name: "getArchiveReducer",
  initialState,
  extraReducers: {
    [getArchiveGroups.pending]: (state) => {
      state.error = false;
      state.loading = true;
    },
    [getArchiveGroups.fulfilled]: (state, action) => {
      state.groupsInfo = action.payload;
      state.error = false;
      state.loading = false;
    },
    [getArchiveGroups.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },

    [getArchiveStudents.pending]: (state) => {
      state.error = false;
      state.loading = true;
    },
    [getArchiveStudents.fulfilled]: (state, action) => {
      state.studentsInfo = action.payload;
      state.error = false;
      state.loading = false;
    },
    [getArchiveStudents.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },

    [getArchiveEmployee.pending]: (state) => {
        state.error = false;
        state.loading = true;
      },
      [getArchiveEmployee.fulfilled]: (state, action) => {
        state.employeeInfo = action.payload;
        state.error = false;
        state.loading = false;
      },
      [getArchiveEmployee.rejected]: (state) => {
        state.error = true;
        state.loading = false;
      },
  },
});

export const archiveSlice = archiveApiSlice.reducer;
