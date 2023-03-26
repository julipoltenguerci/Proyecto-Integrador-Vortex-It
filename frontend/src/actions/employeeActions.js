//libreria para modificar formato de fecha
import format from "date-fns/format";

export const GET_EMPLOYEES = "GET_EMPLOYEES";
export const GET_EMPLOYEE = "GET_EMPLOYEE";
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";
export const REMOVE_EMPLOYEE = "REMOVE_EMPLOYEE";
export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";
export const LOADING_EMPLOYEES = "LOADING_EMPLOYEES";
export const ERROR_EMPLOYEES = "ERROR_EMPLOYEES";

// -------- ACTIONS CREATORS ---------

// Función para obtener todos los empleados

export const getEmployees = (req) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_EMPLOYEES });

    const body = Object.entries(req);
    let url = "http://localhost:8000/api/v1/employees?";
    for (let i = 0; i < body.length; i++) {
      if (i === body.length - 1) {
        url = `${url}${body[i][0]}=${body[i][1]}`;
      } else {
        url = `${url}${body[i][0]}=${body[i][1]}&`;
      }
    }
    const response = await fetch(url);
    if (response.ok) {
      const responseData = await response.json();
      dispatch({ type: GET_EMPLOYEES, payload: responseData.data });
    } else {
      dispatch({
        type: ERROR_EMPLOYEES,
        payload: "Error obteniendo empleados.",
      });
    }
  } catch (error) {
    dispatch({ type: ERROR_EMPLOYEES, payload: error.message });
  }
};

// Función para obtener un empleado por id

export const getEmployee = (id_employee) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_EMPLOYEES });
    if (id_employee !== undefined) {
      const response = await fetch(
        `http://localhost:8000/api/v1/employees/${id_employee}`
      );
      if (response.ok) {
        const responseData = await response.json();
        const empleado = {
          ...responseData.data,
          join_date: format(
            new Date(responseData.data.join_date),
            "yyyy-MM-dd"
          ),
        };

        dispatch({ type: GET_EMPLOYEE, payload: empleado });
      } else {
        dispatch({
          type: ERROR_EMPLOYEES,
          payload: "Error obteniendo el empleado por id.",
        });
      }
    }
  } catch (error) {
    dispatch({ type: ERROR_EMPLOYEES, payload: error.message });
  }
};

// Función para crear un empleado

export const addEmployee = (employeeData) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_EMPLOYEES });

    const response = await fetch("http://localhost:8000/api/v1/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });

    if (response.ok) {
      const responseData = await response.json();
      dispatch({ type: ADD_EMPLOYEE, payload: responseData.data });
    } else {
      const responseData = await response.json();
      //const errores = responseData.errors.map((a) => `${a.param} ${a.msg}`);
      const errorsArray = responseData.errors.map((a) => a.msg);
      const err = errorsArray[0];
      dispatch({
        type: ERROR_EMPLOYEES,
        payload: "Error agregando el empleado. " + err,
      });
    }
  } catch (error) {
    dispatch({ type: ERROR_EMPLOYEES, payload: error.message });
  }
};

// Función para editar un empleado

export const editEmployee = (payload) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_EMPLOYEES });

    const response = await fetch(
      `http://localhost:8000/api/v1/employees/${payload.id_employee}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      const responseData = await response.json();

      dispatch({ type: EDIT_EMPLOYEE, payload: responseData });
    } else {
      const responseData = await response.json();
      const errorsArray = responseData.errors.map((a) => a.msg);
      const err = errorsArray[0];
      dispatch({
        type: ERROR_EMPLOYEES,
        payload: "Error editando el empleado. " + err,
      });
    }
  } catch (error) {
    dispatch({ type: ERROR_EMPLOYEES, payload: error.message });
  }
};

// Función para eliminar un empleado

export const removeEmployee = (employee) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_EMPLOYEES });

    const response = await fetch(
      `http://localhost:8000/api/v1/employees/${employee.id_employee}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      // Si la respuesta es satisfactoria, se dispara la acción de eliminar el empleado con el id correspondiente
      dispatch({ type: REMOVE_EMPLOYEE, payload: employee });
    } else {
      dispatch({
        type: ERROR_EMPLOYEES,
        payload: "Error eliminando empleado por id.",
      });
    }
  } catch (error) {
    dispatch({ type: ERROR_EMPLOYEES, payload: error.message });
  }
};

// Función para actualizar un empleado desde estado de redux

export const updateEmployee = (payload) => ({
  type: UPDATE_EMPLOYEE,
  payload,
});
