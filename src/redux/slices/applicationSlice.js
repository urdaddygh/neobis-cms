import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requests } from "../api";

const initialState = {
  error: false,
  loading: false,
  applicationsInfo: [],
  applicationByIdInfo:[]
};

export const getApplicationByStatus = createAsyncThunk(
  "getApplicationReducer/getApplicationByStatus",
  async (data) => {
    try {
      const res = await requests.getApplicationByStatus(data);
      return res.data;
    } catch (err) {
      throw new Error(err, "errrrrrrr");
    }
  }
);

export const getApplicationById = createAsyncThunk(
    "getApplicationReducer/getApplicationById",
    async (data) => {
      try {
        const res = await requests.getApplicationById(data);
        console.log(res)
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );
  export const getApplicationBySearch = createAsyncThunk(
    "getApplicationReducer/getApplicationBySearch",
    async (data) => {
      try {
        const res = await requests.getApplicationBySearch(data);
        console.log(res)
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );
export const createApplicationCard = createAsyncThunk(
    "getApplicationReducer/createApplicationCard",
    async (data) => {
      try {
        const res = await requests.createApplicationCard(data.formData);
        data.showSuccessMessage("Карточка добавлена")
        data.actions.resetForm()
        data.updateHomePage()
        return res.data;
      } catch (err) {
        data.showErrMessage("Что то не так с интернетом...")
        throw new Error(console.log(err.response));
      }
    }
  );

const applicationApiSlice = createSlice({
  name: "getApplicationReducer",
  initialState,
  extraReducers: {
    [getApplicationByStatus.pending]: (state) => {
      state.error = false;
      state.loading = true;
    },
    [getApplicationByStatus.fulfilled]: (state, action) => {
      state.applicationsInfo = action.payload;
      state.error = false;
      state.loading = false;
    },
    [getApplicationByStatus.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
    
    [getApplicationBySearch.pending]: (state) => {
        state.error = false;
        state.loading = true;
      },
      [getApplicationBySearch.fulfilled]: (state, action) => {
        state.applicationsInfo = action.payload;
        state.error = false;
        state.loading = false;
      },
      [getApplicationBySearch.rejected]: (state) => {
        state.error = true;
        state.loading = false;
      },

    [getApplicationById.pending]: (state) => {
      state.error = false;
    },
    [getApplicationById.fulfilled]: (state, action) => {
      state.applicationByIdInfo = action.payload;
      state.error = false;
    },
    [getApplicationById.rejected]: (state) => {
      state.error = true;
    },
  },
});

export const applicationSlice = applicationApiSlice.reducer;
