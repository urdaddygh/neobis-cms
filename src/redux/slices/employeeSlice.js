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
  employeeInfoById: {},
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
    "employeeReducer/getEmployeeBySearch",
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
    "employeeReducer/getEmployee",
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
    "employeeReducer/getTeachers",
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
  export const getMeneger = createAsyncThunk(
    "employeeReducer/getMeneger",
    async () => {
      try {
        const res = await requests.getMeneger();
        // console.log(res);
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );

  export const getTeacherById = createAsyncThunk(
    "employeeReducer/getTeacherById",
    async (data) => {
      try {
        const res = await requests.getTeacherById(data);
        // console.log(res)
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );
  export const getMenegerById = createAsyncThunk(
    "employeeReducer/getMenegerById",
    async (data) => {
      try {
        const res = await requests.getMenegerById(data);
        // console.log(res)
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );

  export const deleteTeacherById = createAsyncThunk(
    "employeeReducer/deleteTeacherById",
    async (data) => {
      try {
        const res = await requests.deleteTeachers(data.id);
        data.updateHomePage()
        data.closeCard()
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );
  export const putTeacherById = createAsyncThunk(
    "employeeReducer/putTeacherById",
    async (data) => {
      try {
        console.log(data)
        const res = await requests.putTeacherById(data);
        data.showSuccessMessage("Данные изменены")
        data.updateHomePage()
        // console.log(res)
        return res.data;
      } catch (err) {
        data.showErrorMessage("Что то не так...")
        throw new Error(err, "errrrrrrr");
      }
    }
  );
  export const putMenegerById = createAsyncThunk(
    "employeeReducer/putMenegerById",
    async (data) => {
      try {
        console.log(data)
        const res = await requests.putMenegerById(data);
        data.showSuccessMessage("Данные изменены")
        data.updateHomePage()
        // console.log(res)
        return res.data;
      } catch (err) {
        data.showErrorMessage("Что то не так...")
        throw new Error(err, "errrrrrrr");
      }
    }
  );
  export const deleteMenegerById = createAsyncThunk(
    "employeeReducer/delteMenegerById",
    async (data) => {
      try {
        const res = await requests.deleteMeneger(data);
        data.updateHomePage()
        data.closeCard()
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

    [getMeneger.pending]: (state) => {
      state.error = false;
      state.loading = true;
    },
    [getMeneger.fulfilled]: (state, action) => {
      state.employeeInfo = action.payload;
      state.error = false;
      state.loading = false;
    },
    [getMeneger.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },

    [getMenegerById.pending]: (state) => {
      state.error = false;
    },
    [getMenegerById.fulfilled]: (state, action) => {
      state.employeeInfoById = action.payload;
      state.error = false;
    },
    [getMenegerById.rejected]: (state) => {
      state.error = true;
    },

    [getTeacherById.pending]: (state) => {
      state.error = false;
    },
    [getTeacherById.fulfilled]: (state, action) => {
      state.employeeInfoById = action.payload;
      state.error = false;
    },
    [getTeacherById.rejected]: (state) => {
      state.error = true;
    },
  },
});

export const employeeSlices = employeeSlice.reducer;
