import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requests } from "../api";

const initialState = {
  error: false,
  loading: false,
  directions: [],
  source: [],
  groups: [],
};

export const getDiractions = createAsyncThunk(
  "getActionReducer/getDiractions",
  async () => {
    try {
      const res = await requests.getDirections();
      console.log("status code getDirections =", res.status);
      return res.data;
    } catch (err) {
      throw new Error(err, "errrrrrrr");
    }
  }
);
export const getSource = createAsyncThunk(
  "getActionReducer/getSource",
  async () => {
    try {
      const res = await requests.getSource();
      console.log("status code getSource =", res.status);
      return res.data;
    } catch (err) {
      throw new Error(err, "errrrrrrr");
    }
  }
);
export const getGroups = createAsyncThunk(
    "getActionReducer/getGroups",
    async () => {
      try {
        const res = await requests.getGroups();
        console.log("status code getGroups =", res.status);
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );

  export const createDirection = createAsyncThunk(
    "getActionReducer/createDirection",
    async (data) => {
      try {
        const res = await requests.createDirection(data.values);
        data.showSuccessMessage("Департамент добавлен")
        data.actions.resetForm()
        data.updateHomePage()
        return res.data;
      } catch (error) {
        if (error.response.data.error.name) {
          return data.showErrorMessage("Такой департамент уже существует");
        }
        throw new Error(console.log(error.response));
      }
    }
  );
const actionApiSlice = createSlice({
  name: "getActionReducer",
  initialState,
  extraReducers: {
    [getDiractions.pending]: (state) => {
      state.error = false;
      state.loading = true;
    },
    [getDiractions.fulfilled]: (state, action) => {
      state.directions = action.payload;
      state.error = false;
      state.loading = false;
    },
    [getDiractions.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },

    [getSource.pending]: (state) => {
      state.error = false;
      state.loading = true;
    },
    [getSource.fulfilled]: (state, action) => {
      state.source = action.payload;
      state.error = false;
      state.loading = false;
    },
    [getSource.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },

    [getGroups.pending]: (state) => {
      state.error = false;
      state.loading = true;
    },
    [getGroups.fulfilled]: (state, action) => {
      state.groups = action.payload;
      state.error = false;
      state.loading = false;
    },
    [getGroups.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const actionSlice = actionApiSlice.reducer;
