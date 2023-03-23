import { configureStore } from "@reduxjs/toolkit";
import { employeeReducer } from "../reducers/EmployeeReducer";
import { assetReducer } from "../reducers/AssetReducer";
import { applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

export const store = configureStore(
  {
    reducer: {
      employeesSlice: employeeReducer,
      assetsSlice: assetReducer,
    },
  },
  applyMiddleware(thunk)
);
