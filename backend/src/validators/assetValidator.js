const { body } = require("express-validator");
const validateResults = require("../utils/handleValidator");

// Middlewares para validar creación y actualización de assets

const createAssetValidator = [
  body("name")
    .matches(/^[\p{L}\s]+$/u)
    .withMessage("NOMBRE debe contener solo letras.")
    .exists()
    .withMessage("NOMBRE es obligatorio")
    .notEmpty()
    .withMessage("NOMBRE no debe quedar vacio")
    .isString()
    .withMessage("El valor no es válido")
    .isLength({ min: 3, max: 50 })
    .withMessage("Escriba en NOMBRE un mínimo 3 caracteres y un máximo 50"),
  body("type")
    .matches(/^[\p{L}\s]+$/u)
    .withMessage("TIPO debe contener solo letras.")
    .exists()
    .withMessage("TIPO es obligatorio")
    .notEmpty()
    .withMessage("TIPO no debe quedar vacio")
    .isString()
    .withMessage("El valor de TIPO no es válido")
    .isLength({ min: 3, max: 50 })
    .withMessage("Escriba en TIPO un mínimo 3 caracteres y un máximo 50"),
  body("code").optional({
    options: {
      checkFalsy: true,
    },
  }),
  body("brand")
    .matches(/^[\p{L}\s]+$/u)
    .withMessage("MARCA debe contener solo letras.")
    .exists()
    .withMessage("MARCA es obligatorio")
    .notEmpty()
    .withMessage("MARCA no debe quedar vacio")
    .isString()
    .withMessage("El valor de MARCA no es válido")
    .isLength({ min: 2, max: 50 })
    .withMessage("Escriba en MARCA un mínimo 2 caracteres y un máximo 50"),
  body("description")
    .optional()
    .isString()
    .optional({
      options: {
        checkFalsy: true,
      },
    }),
  body("purchase_date")
    .exists()
    .withMessage("FECHA DE COMPRA es obligatorio")
    .notEmpty()
    .withMessage("FECHA DE COMPRA no debe quedar vacio")
    .isDate()
    .withMessage("FECHA DE COMPRA debe ser una fecha(aaaa-mm-dd)"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const updateAssetValidator = [
  body("name")
    .optional()

    .notEmpty()
    .withMessage("NOMBRE no debe quedar vacio")
    .matches(/^[\p{L}\s]+$/u)
    .withMessage("NOMBRE debe contener solo letras.")
    .isString()
    .withMessage("El valor de NOMBRE no es válido. Debe ser texto.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Escriba en NOMBRE un mínimo 3 caracteres y máximo 50"),
  body("type")
    .optional()

    .notEmpty()
    .withMessage("TIPO no debe quedar vacio")
    .isString()
    .withMessage("El valor de TIPO no es válido")
    .isLength({ min: 3, max: 50 })
    .withMessage("Escriba en TIPO un mínimo 3 caracteres y un máximo 50"),
  body("code").optional({
    options: {
      checkFalsy: true,
    },
  }),
  body("brand")
    .optional()

    .notEmpty()
    .withMessage("MARCA no debe quedar vacio")
    .isString()
    .withMessage("El valor de MARCA no es válido")
    .isLength({ min: 2, max: 50 })
    .withMessage("Escriba en MARCA un mínimo 2 caracteres y un máximo 50"),
  body("description").optional({
    options: {
      checkFalsy: true,
    },
  }),
  body("purchase_date")
    .optional()
    .notEmpty()
    .withMessage("FECHA DE COMPRA no debe quedar vacio")
    .isDate()
    .withMessage("FECHA DE COMPRA debe ser una fecha(aaaa-mm-dd)"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { createAssetValidator, updateAssetValidator };
