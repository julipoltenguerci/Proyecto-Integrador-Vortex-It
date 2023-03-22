import {
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  REMOVE_EMPLOYEE,
} from "../actions/employeeActions";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  employees: [
    {
      id_employee: "4e451e26-9328-4df5-9f64-5689c3762da3",
      first_name: "Dolores",
      last_name: "Pizarro Caballero",
      cuit: 27309874530,
      team_id: 1,
      join_date: "2020-04-10",
      rol: "Developer",
    },
    {
      id_employee: "882ab9a0-d735-485a-9d16-e1ad47b7a0e2",
      first_name: "Luciano",
      last_name: "Soria",
      cuit: 20359874770,
      team_id: 2,
      join_date: "2021-08-10",
      rol: "UX",
    },
    {
      id_employee: "eeabdc27-fe22-4a3c-800f-aba160c07e40",
      first_name: "Miguel Angel",
      last_name: "Medina",
      cuit: 20385631190,
      team_id: 3,
      join_date: "2022-08-10",
      rol: "PM",
    },
  ],
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
            id_employee: uuidv4(),
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
    default:
      return state;
  }
};
