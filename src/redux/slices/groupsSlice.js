import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requests } from "../api";

const initialState = {
  error: false,
  loading: false,
  groupsInfo: [],
  studentsInfo: [],
  studentsInfoById: [],
};

export const getGroups = createAsyncThunk(
    "getGroupsReducer/getGroups",
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
  export const getStudents = createAsyncThunk(
    "getGroupsReducer/getStudents",
    async () => {
      try {
        const res = await requests.getStudents();
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );
  export const getStudentById = createAsyncThunk(
    "getGroupsReducer/getStudentById",
    async (data) => {
      try {
        const res = await requests.getStudentById(data);
        // console.log(res)
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );
  export const getStudentsBySearch = createAsyncThunk(
    "getGroupsReducer/getStudentsBySearch",
    async (data) => {
      console.log(data)
      try {
        const res = await requests.getStudentsBySearch(data);
        console.log(res)
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );
  export const createStudent = createAsyncThunk(
    "getGroupsReducer/createStudent",
    async (data) => {
      try {
        const res = await requests.createStudent(data.values);
        data.showSuccessMessage("Студент успешно создан");
        data.actions.resetForm()
        data.updateHomePage()
        // if(!res.data.username && !res.data.email) data.navigate("/register/password")
        return res.data;
      } catch (error) {
        console.log(error.response);
        if (error.response.data.email) {
          console.log(error.response.data.email);
          return data.showErrorMessage("Такая почта уже зарегистрирована");
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

  export const createGroup = createAsyncThunk(
    "getGroupsReducer/createGroup",
    async (data) => {
      try {
        const res = await requests.createGroup(data.formData);
        data.showSuccessMessage("Группа успешно создан");
        data.actions.resetForm()
        data.updateHomePage()
        // if(!res.data.username && !res.data.email) data.navigate("/register/password")
        return res.data;
      } catch (error) {
        console.log(error.response);
       data.showErrorMessage("Что то пошло не так...");
  
        throw new Error(error);
      }
    }
  );

  export const deleteStudentById = createAsyncThunk(
    "getGroupsReducer/deleteStudentById",
    async (data) => {
      try {
        const res = await requests.deleteStudentById(data.id);
        data.updateHomePage()
        data.closeCard()
        console.log(res)
        return res.data;
      } catch (err) {
        throw new Error(err, "errrrrrrr");
      }
    }
  );
  export const putStudentById = createAsyncThunk(
    "getGroupsReducer/putStudentById",
    async (data) => {
      try {
        console.log(data)
        const res = await requests.putStudentById(data);
        data.showSuccessMessage("Данные изменены")
        data.updateHomePage()
        return res.data;
      } catch (err) {
        if(err.response.data.email){
        data.showErrorMessage("Пользователь с такой почтой уже существует")
        }
        if(err.response.data.phone){
          data.showErrorMessage("Пользователь с таким номером уже существует");
        }
        data.showErrorMessage("Что то не так...")
        throw new Error(err, "errrrrrrr");
      }
    }
  );
const groupsApiSlice = createSlice({
  name: "getGroupsReducer",
  initialState,
  extraReducers: {
    [getGroups.pending]: (state) => {
      state.error = false;
      state.loading = true;
    },
    [getGroups.fulfilled]: (state, action) => {
      state.groupsInfo = action.payload;
      state.error = false;
      state.loading = false;
    },
    [getGroups.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },

    [getStudents.pending]: (state) => {
      state.error = false;
      state.loading = true;
    },
    [getStudents.fulfilled]: (state, action) => {
      state.studentsInfo = action.payload;
      state.error = false;
      state.loading = false;
    },
    [getStudents.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },

    [getStudentsBySearch.pending]: (state) => {
      state.error = false;
      state.loading = true;
    },
    [getStudentsBySearch.fulfilled]: (state, action) => {
      state.studentsInfo = action.payload;
      state.error = false;
      state.loading = false;
    },
    [getStudentsBySearch.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },

    [getStudentById.pending]: (state) => {
      state.error = false;
    },
    [getStudentById.fulfilled]: (state, action) => {
      state.studentsInfoById = action.payload;
      state.error = false;
    },
    [getStudentById.rejected]: (state) => {
      state.error = true;
    },
  },
});

export const groupsSlice = groupsApiSlice.reducer;
