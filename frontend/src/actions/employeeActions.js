export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";
export const REMOVE_EMPLOYEE = "REMOVE_EMPLOYEE";

// -------- ACTIONS CREATORS ---------

export const addEmployee = (payload) => ({
  type: ADD_EMPLOYEE,
  payload,
});

export const editEmployee = (payload) => ({
  type: EDIT_EMPLOYEE,
  payload,
});

export const removeEmployee = (payload) => ({
  type: REMOVE_EMPLOYEE,
  payload,
});
