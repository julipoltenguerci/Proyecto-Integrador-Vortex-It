import {
  ADD_ASSET,
  EDIT_ASSET,
  REMOVE_ASSET,
  GET_ASSET,
  GET_ASSETS,
  UPDATE_ASSET,
  LOADING_ASSETS,
  ERROR_ASSETS,
} from "../actions/assetActions";

const getEmptyAsset = () => ({
  id_asset: 0,
  name: "",
  type: "",
  code: "",
  brand: "",
  description: "",
  purchase_date: "",
  id_employee: 0,
});

const initialState = {
  asset: getEmptyAsset(),
  assets: [],
  totalAssets: 0,
  loading: false,
  error: null,
};

export const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ASSET:
      return {
        ...state,
        loading: false,
        assets: [
          ...state.assets,
          {
            ...action.payload,
          },
        ],
      };
    case EDIT_ASSET:
      return {
        ...state,
        loading: false,
        assets: state.assets.map((asset) =>
          action.payload.id_asset === asset.id_asset ? action.payload : asset
        ),
      };
    case REMOVE_ASSET:
      return {
        ...state,
        loading: false,
        assets: state.assets.filter(
          (asset) => action.payload.id_asset !== asset.id_asset
        ),
      };
    case GET_ASSET:
      return {
        ...state,
        loading: false,
        asset: action.payload ? action.payload : getEmptyAsset(),
      };
    case GET_ASSETS:
      return {
        ...state,
        loading: false,
        assets: action.payload.rows,
        totalAssets: action.payload.totalRows,
      };
    case UPDATE_ASSET:
      return {
        ...state,
        asset: action.payload,
      };
    case LOADING_ASSETS:
      return {
        ...state,
        loading: true,
      };

    case ERROR_ASSETS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
