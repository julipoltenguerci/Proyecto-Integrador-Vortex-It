import {
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  REMOVE_EMPLOYEE,
  GET_EMPLOYEES,
} from "../actions/employeeActions";

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [
          ...state.employees,
          {
            ...action.payload,
          },
        ],
      };
    case EDIT_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((employee) =>
          action.payload.id_employee === employee.id_employee
            ? action.payload
            : employee
        ),
      };
    case REMOVE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => action.payload.id_employee !== employee.id_employee
        ),
      };
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload.rows,
        totalRows: action.payload.totalRows[0].total,
      };

    default:
      return state;
  }
};
