const assetModel = require("../models/asset-model");
const { HttpError, NotFoundError } = require("../customError/Http-Error");
const ResponseApi = require("../utils/responseApi");

// ---------- Funciones de Controlador de Employee ----------

const getAllAssets = async (req, res, next) => {
  try {
    const assets = await assetModel.getAllAssets(req);
    assets.length === 0
      ? next(new NotFoundError("No se encontraron activos disponibles."))
      : res.json(
          new ResponseApi(
            true,
            "Se encontraron los siguientes activos.",
            assets
          )
        );
  } catch (err) {
    next(err);
  }
};

const getAssetById = async (req, res, next) => {
  try {
    const { idA } = req.params;
    const asset = await assetModel.getAssetById(idA);
    asset.length === 0
      ? next(new NotFoundError(`No se encontró el activo con el ID ${idA}`))
      : res.json(
          new ResponseApi(
            true,
            `Se encontró el activo con el ID  ${idA} `,
            asset
          )
        );
  } catch (err) {
    next(err);
  }
};

const getAssetsByEmployeeId = async (req, res, next) => {
  try {
    const { idE } = req.params;
    const asset = await assetModel.getAssetsByEmployeeId(idE);
    asset.length === 0
      ? next(
          new NotFoundError(
            `No se encontraron activos relacionados al id de empleado ${idE}.`
          )
        )
      : res.json(
          new ResponseApi(
            true,
            `Se encontraron los siguientes activos con el ID de empleado ${idE} `,
            asset
          )
        );
  } catch (err) {
    next(err);
  }
};

const createAsset = async (req, res, next) => {
  try {
    const values = { ...req.body };
    const idCreated = await assetModel.createAsset(values);
    res
      .status(201)
      .json(
        new ResponseApi(
          true,
          `Se ha creado correctamente el activo con ID ${idCreated}`,
          idCreated,
          201
        )
      );
  } catch (err) {
    next(err);
  }
};

const updateAsset = async (req, res, next) => {
  try {
    const { idA } = req.params;
    let assetToUpdate = await assetModel.getAssetById(idA);
    if (assetToUpdate.length == 0) {
      res
        .status(404)
        .json(
          new ResponseApi(
            false,
            `No se ha encontrado el asset con el ID ${idA}`,
            idA,
            404
          )
        );
    }
    await assetModel.updateAsset(req.body, idA);
    res.json(
      new ResponseApi(
        true,
        `Se ha editado correctamente el activo con ID ${idA}`,
        idA
      )
    );
  } catch (err) {
    next(err);
  }
};

const deleteAsset = async (req, res, next) => {
  try {
    const { idA } = req.params;
    let assetToDelete = await assetModel.getAssetById(idA);
    if (assetToDelete.length == 0) {
      res
        .status(404)
        .json(
          new ResponseApi(
            false,
            `No se ha encontrado el activo con el ID ${idA}`,
            idA,
            404
          )
        );
    }
    const result = await assetModel.deleteAsset(idA);
    res.json(
      new ResponseApi(
        true,
        `Se ha eliminado correctamente el activo con ID ${idA}`,
        idA
      )
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllAssets,
  getAssetById,
  getAssetsByEmployeeId,
  createAsset,
  updateAsset,
  deleteAsset,
};
