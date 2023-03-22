import { configureStore } from "@reduxjs/toolkit";
import { employeeReducer } from "../reducers/EmployeeReducer";

export const store = configureStore({
  reducer: {
    employeesSlice: employeeReducer,
  },
});
