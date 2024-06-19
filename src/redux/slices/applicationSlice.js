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
        // console.log(res)
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );
  export const deleteApplicationById = createAsyncThunk(
    "getApplicationReducer/deleteApplicationById",
    async (data) => {
      try {
        const res = await requests.deleteApplicationById(data.id);
        data.updateHomePage()
        console.log(res)
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );
  export const archiveApplicationById = createAsyncThunk(
    "getApplicationReducer/archiveApplicationById",
    async (data) => {
      try {
        console.log(data)
        const res = await requests.archiveApplicationById(data.id);
        data.updateHomePage()
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );
  export const putApplicationById = createAsyncThunk(
    "getApplicationReducer/putApplicationById",
    async (data) => {
      try {
        console.log(data)
        const res = await requests.putApplicationById(data);
        data.showSuccessMessage("Карточка изменена")
        data.updateHomePage()
        // console.log(res)
        return res.data;
      } catch (err) {
        data.showErrMessage("Что то не так с интернетом...")
        throw new Error(err, "errrrrrrr");
      }
    }
  );
  export const getApplicationBySearch = createAsyncThunk(
    "getApplicationReducer/getApplicationBySearch",
    async (data) => {
      console.log(data)
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
      } catch (error) {
        if (error.response.data.error.student.email) {
          return data.showErrorMessage("Такая почта уже зарегистрирована");
        }
        if (error.response.data.error.student.phone) {
          return data.showErrorMessage(
            "Такой номер телефона уже зарегестрирован"
          );
        }
        throw new Error(console.log(error.response));
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
