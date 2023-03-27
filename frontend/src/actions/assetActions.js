//libreria para modificar formato de fecha
import format from "date-fns/format";

export const GET_ASSETS = "GET_ASSETS";
export const GET_ASSET = "GET_ASSET";
export const ADD_ASSET = "ADD_ASSET";
export const EDIT_ASSET = "EDIT_ASSET";
export const REMOVE_ASSET = "REMOVE_ASSET";
export const UPDATE_ASSET = "UPDATE_ASSET";
export const LOADING_ASSETS = "LOADING_ASSETS";
export const ERROR_ASSETS = "ERROR_ASSETS";

// -------- ACTIONS CREATORS ---------

// Función para obtener todos los activos

export const getAssets = (req) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_ASSETS });

    const body = Object.entries(req).filter((data) => data[1]);
    let url = "http://localhost:8000/api/v1/assets?";
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
      dispatch({ type: GET_ASSETS, payload: responseData.data });
    } else {
      dispatch({
        type: ERROR_ASSETS,
        payload: "Error obteniendo activos.",
      });
    }
  } catch (error) {
    dispatch({ type: ERROR_ASSETS, payload: error.message });
  }
};

// Función para obtener un activo por id

export const getAsset = (id_asset) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_ASSETS });
    if (id_asset) {
      const response = await fetch(
        `http://localhost:8000/api/v1/assets/${id_asset}`
      );
      if (response.ok) {
        const responseData = await response.json();
        const asset = {
          ...responseData.data,
          purchase_date: format(
            new Date(responseData.data.purchase_date),
            "yyyy-MM-dd"
          ),
        };
        dispatch({ type: GET_ASSET, payload: asset });
      } else {
        dispatch({
          type: ERROR_ASSETS,
          payload: "Error obteniendo el activo por id.",
        });
      }
    } else {
      dispatch({ type: GET_ASSET });
    }
  } catch (error) {
    dispatch({ type: ERROR_ASSETS, payload: error.message });
  }
};

// Función para crear un activo

export const addAsset = (assetData) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_ASSETS });
    const response = await fetch("http://localhost:8000/api/v1/assets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assetData),
    });
    if (response.ok) {
      const responseData = await response.json();

      dispatch({ type: ADD_ASSET, payload: responseData.data });
      return Promise.resolve(true);
    } else {
      let err = "";
      const responseData = await response.json();
      if (responseData.errors) {
        const errorsArray = responseData.errors.map((a) => a.msg);
        err = errorsArray[0];
      } else {
        err = responseData.message;
      }
      dispatch({
        type: ERROR_ASSETS,
        payload: "Error agregando el activo. " + err,
      });
      return Promise.resolve(false);
    }
  } catch (error) {
    dispatch({ type: ERROR_ASSETS, payload: error.message });
    return Promise.resolve(false);
  }
};

// Función para editar un activo por id

export const editAsset = (payload) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_ASSETS });
    const response = await fetch(
      `http://localhost:8000/api/v1/assets/${payload.id_asset}`,
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

      dispatch({ type: EDIT_ASSET, payload: responseData });
      return Promise.resolve(true);
    } else {
      let err = "";
      const responseData = await response.json();
      if (responseData.errors) {
        const errorsArray = responseData.errors.map((a) => a.msg);
        err = errorsArray[0];
      } else {
        err = responseData.message;
      }
      dispatch({
        type: ERROR_ASSETS,
        payload: "Error editando el activo. " + err,
      });
      return Promise.resolve(false);
    }
  } catch (error) {
    dispatch({ type: ERROR_ASSETS, payload: error.message });
    return Promise.resolve(false);
  }
};
// Función para eliminar asset

export const removeAsset = (asset) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_ASSETS });

    const response = await fetch(
      `http://localhost:8000/api/v1/assets/${asset.id_asset}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      // Si la respuesta es satisfactoria, se dispara la acción de eliminar el empleado con el id correspondiente
      dispatch({ type: REMOVE_ASSET, payload: asset });
    } else {
      dispatch({
        type: ERROR_ASSETS,
        payload: "Error eliminando activo por id.",
      });
    }
  } catch (error) {
    dispatch({ type: ERROR_ASSETS, payload: error.message });
  }
};

// Función para actualizar un activo desde estado de redux

export const updateAsset = (payload) => ({
  type: UPDATE_ASSET,
  payload,
});
