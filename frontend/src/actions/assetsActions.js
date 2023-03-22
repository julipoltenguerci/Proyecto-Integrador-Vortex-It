export const ADD_ASSET = "ADD_ASSET";
export const EDIT_ASSET = "EDIT_ASSET";
export const REMOVE_ASSET = "REMOVE_ASSET";

// -------- ACTIONS CREATORS ---------

export const addAsset = (payload) => ({
  type: ADD_ASSET,
  payload,
});

export const editAsset = (payload) => ({
  type: EDIT_ASSET,
  payload,
});

export const removeAsset = (payload) => ({
  type: REMOVE_ASSET,
  payload,
});
