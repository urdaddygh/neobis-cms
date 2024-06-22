import { configureStore } from "@reduxjs/toolkit";
import { authSlices } from "./slices/authSlice";
import { registerSlices } from "./slices/registerSlice";
import { productSlice } from "./slices/productsApiSlice";
import { profileSlices } from "./slices/profileSlice";
import { applicationSlice } from "./slices/applicationSlice";
import { actionSlice } from "./slices/actionSlice";
import { employeeSlices } from "./slices/employeeSlice";
import { groupsSlice } from "./slices/groupsSlice";
import { archiveSlice } from "./slices/archiveSlice";


export const store = configureStore({
  reducer: {
    auth:authSlices,
    register:registerSlices,
    products:productSlice,
    profile:profileSlices,
    applications:applicationSlice,
    action:actionSlice,
    employee:employeeSlices,
    groups:groupsSlice,
    archive:archiveSlice
  },
});
