export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";
export const REMOVE_EMPLOYEE = "REMOVE_EMPLOYEE";
export const GET_EMPLOYEES = "GET_EMPLOYEES";

// -------- ACTIONS CREATORS ---------

// export const addEmployee = (payload) => ({
//   type: ADD_EMPLOYEE,
//   payload,
// });

export const addEmployee = (employeeData) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8000/api/v1/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });
    const responseData = await response.json();
    console.log(responseData);
    dispatch({ type: ADD_EMPLOYEE, payload: responseData.data });
  } catch (error) {}
};

//export const editEmployee = (payload) => ({
//type: EDIT_EMPLOYEE,
//payload,
//});
export const editEmployee = (payload) => async (dispatch) => {
  try {
    console.log("el payload Editar es: ", payload);
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

    const responseData = await response.json();

    dispatch({ type: EDIT_EMPLOYEE, payload: responseData });
  } catch (error) {
    console.log(error);
  }
};
// export const removeEmployee = (payload) => ({
//   type: REMOVE_EMPLOYEE,
//   payload,
// });
export const removeEmployee = (id_employee) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/employees/${id_employee}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      // Si la respuesta es satisfactoria, se dispara la acción de eliminar el empleado con el id correspondiente
      dispatch({ type: REMOVE_EMPLOYEE, payload: id_employee });
    } else {
      console.log("Error eliminando empleado");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getEmployees = (req) => async (dispatch) => {
  try {
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
    const responseData = await response.json();
    //console.log(responseData);
    //console.log(responseData.data);

    dispatch({ type: GET_EMPLOYEES, payload: responseData.data });
  } catch (error) {}
};
