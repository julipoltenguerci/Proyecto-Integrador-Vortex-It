const assetRouter = require("express").Router();
const assetController = require("../controllers/asset-controller");
const {
  createAssetValidator,
  updateAssetValidator,
} = require("../validators/assetValidator");

//Paths para rutas de assets

assetRouter
  .route("/")
  .get(assetController.getAllAssets)
  .post(createAssetValidator, assetController.createAsset);

assetRouter
  .route("/:idA")
  .get(assetController.getAssetById)
  .put(updateAssetValidator, assetController.updateAsset)
  .delete(assetController.deleteAsset);

assetRouter.get("/employees/:idE", assetController.getAssetsByEmployeeId);

module.exports = assetRouter;
