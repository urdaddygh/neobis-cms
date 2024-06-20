import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  removeCookie,
  setCookie,
} from "../../utils/cookieFunction/cookieFunction";
import { requests } from "../api";

const initialState = {
  error: false,
  loading:false,
  employeeInfo: [],
};

export const addTeacher = createAsyncThunk(
  "employeeReducer/addTeacher",
  async (data) => {
    try {
      const res = await requests.addTeacher(data.values);
      data.showSuccessMessage("Учитель успешно создан");
      data.updateHomePage()
      // if(!res.data.username && !res.data.email) data.navigate("/register/password")
      return res.data;
    } catch (error) {
      console.log(error.response.status);
      if (error.response.data.error.email) {
        console.log(error.response.data.error.email);
        return data.showErrorMessage("Такая почта уже зарегистрирована");
      }
      if (error.response.data.error.patent_number) {
        return data.showErrorMessage("Такой патент уже зарегистрирован");
      }
      if (error.response.data.error.phone) {
        return data.showErrorMessage(
          "Такой номер телефона уже зарегестрирован"
        );
      }

      throw new Error(error);
    }
  }
);

export const getEmployeeBySearch = createAsyncThunk(
    "getApplicationReducer/getEmployeeBySearch",
    async (data) => {
      try {
        const res = await requests.getEmployeeBySearch(data);
        console.log(res)
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );

  export const getEmployee = createAsyncThunk(
    "getApplicationReducer/getEmployee",
    async () => {
      try {
        const res = await requests.getEmployee();
        // console.log(res);
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );
  export const getTeachers = createAsyncThunk(
    "getApplicationReducer/getTeachers",
    async () => {
      try {
        const res = await requests.getTeachers();
        // console.log(res);
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );
const employeeSlice = createSlice({
  name: "employeeReducer",
  initialState,
  extraReducers: {
    [getEmployee.pending]: (state) => {
        state.error = false;
        state.loading = true;
    },
    [getEmployee.fulfilled]: (state, action) => {
        state.employeeInfo = action.payload;
        state.error = false;
        state.loading = false;
    },
    [getEmployee.rejected]: (state) => {
        state.error = true;
        state.loading = false;
    },

    [getEmployeeBySearch.pending]: (state) => {
        state.error = false;
        state.loading = true;
    },
    [getEmployeeBySearch.fulfilled]: (state, action) => {
        state.employeeInfo = action.payload;
        state.error = false;
        state.loading = false;
    },
    [getEmployeeBySearch.rejected]: (state) => {
        state.error = true;
        state.loading = false;
    },

    [getTeachers.pending]: (state) => {
        state.error = false;
        state.loading = true;
    },
    [getTeachers.fulfilled]: (state, action) => {
        state.employeeInfo = action.payload;
        state.error = false;
        state.loading = false;
    },
    [getTeachers.rejected]: (state) => {
        state.error = true;
        state.loading = false;
    },
  },
});

export const employeeSlices = employeeSlice.reducer;
