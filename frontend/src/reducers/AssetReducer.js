import {
  ADD_ASSET,
  EDIT_ASSET,
  REMOVE_ASSET,
  GET_ASSETS,
} from "../actions/assetActions";
//import { v4 as uuidv4 } from "uuid";

const initialState = {
  assets: [],
  loading: false,
  error: null,
};

export const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ASSET:
      return {
        ...state,
        assets: [
          ...state.assets,
          {
            ...action.payload,
            //id_asset: uuidv4(),
          },
        ],
      };
    case EDIT_ASSET:
      return {
        ...state,
        assets: state.assets.map((asset) =>
          action.payload.id_asset === asset.id_asset ? action.payload : asset
        ),
      };
    case REMOVE_ASSET:
      return {
        ...state,
        assets: state.assets.filter(
          (asset) => action.payload.id_asset !== asset.id_asset
        ),
      };
    case GET_ASSETS:
      return {
        ...state,
        assets: action.payload,
      };
    default:
      return state;
  }
};
