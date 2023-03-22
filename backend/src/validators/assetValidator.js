const { body } = require("express-validator");
const validateResults = require("../utils/handleValidator");

// Middlewares para validar creación y actualización de assets

const createAssetValidator = [
  body("name")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isString()
    .withMessage("El valor no es válido")
    .isLength({ min: 3, max: 50 })
    .withMessage("Escriba mínimo 3 caracteres y máximo 50"),
  body("type")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isString()
    .withMessage("El valor no es válido")
    .isLength({ min: 3, max: 50 })
    .withMessage("Escriba mínimo 3 caracteres y máximo 50"),
  body("code").optional().notEmpty().withMessage("Campo no debe quedar vacio"),
  body("brand")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isString()
    .withMessage("El valor no es válido")
    .isLength({ min: 2, max: 50 })
    .withMessage("Escriba mínimo 3 caracteres y máximo 50"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isString()
    .withMessage("El valor no es válido")
    .isLength({ min: 3, max: 150 })
    .withMessage("Escriba mínimo 3 caracteres y máximo 150"),
  body("purchase_date")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isDate()
    .withMessage("El campo debe ser una fecha(aaaa-mm-dd)"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const updateAssetValidator = [
  body("name")
    .optional()
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isString()
    .withMessage("El valor no es válido")
    .isLength({ min: 3, max: 50 })
    .withMessage("Escriba mínimo 3 caracteres y máximo 50"),
  body("type")
    .optional()
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isString()
    .withMessage("El valor no es válido")
    .isLength({ min: 3, max: 50 })
    .withMessage("Escriba mínimo 3 caracteres y máximo 50"),
  body("code").optional().notEmpty().withMessage("Campo no debe quedar vacio"),
  body("brand")
    .optional()
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isString()
    .withMessage("El valor no es válido")
    .isLength({ min: 2, max: 50 })
    .withMessage("Escriba mínimo 3 caracteres y máximo 50"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isString()
    .withMessage("El valor no es válido")
    .isLength({ min: 3, max: 150 })
    .withMessage("Escriba mínimo 3 caracteres y máximo 150"),
  body("purchase_date")
    .optional()
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isDate()
    .withMessage("El campo debe ser una fecha(aaaa-mm-dd)"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { createAssetValidator, updateAssetValidator };
