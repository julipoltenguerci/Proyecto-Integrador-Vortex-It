import {
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  REMOVE_EMPLOYEE,
  GET_EMPLOYEE,
  GET_EMPLOYEES,
  UPDATE_EMPLOYEE,
  LOADING_EMPLOYEES,
  ERROR_EMPLOYEES,
} from "../actions/employeeActions";

const getEmptyEmployee = () => ({
  id_employee: 0,
  first_name: "",
  last_name: "",
  cuit: "",
  team_id: "",
  join_date: "",
  rol: "",
});

const initialState = {
  employee: getEmptyEmployee(),
  employees: [],
  totalEmployees: 0,
  loading: false,
  error: null,
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        loading: false,
        error: null,
        employees: [
          ...state.employees,
          {
            ...action.payload,
          },
        ],
        totalEmployees: state.totalEmployees + 1,
      };
    case EDIT_EMPLOYEE:
      return {
        ...state,
        loading: false,
        error: null,
        employees: state.employees.map((employee) =>
          action.payload.id_employee === employee.id_employee
            ? action.payload
            : employee
        ),
      };
    case REMOVE_EMPLOYEE:
      return {
        ...state,
        loading: false,
        error: null,
        employees: state.employees.filter(
          (employee) => action.payload.id_employee !== employee.id_employee
        ),
        totalEmployees: state.totalEmployees - 1,
      };
    case GET_EMPLOYEE:
      return {
        ...state,
        loading: false,
        error: null,
        employee: action.payload ? action.payload : getEmptyEmployee(),
      };
    case GET_EMPLOYEES:
      return {
        ...state,
        loading: false,
        error: null,
        employees: action.payload.rows,
        totalEmployees: action.payload.totalRows,
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employee: action.payload,
      };
    case LOADING_EMPLOYEES:
      return {
        ...state,
        loading: true,
      };

    case ERROR_EMPLOYEES:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
