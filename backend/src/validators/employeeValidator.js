const { body } = require("express-validator");
const validateResults = require("../utils/handleValidator");

// Middlewares para validar creación y actualización de employees

const createEmployeeValidator = [
  body("first_name")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isString()
    .withMessage("El valor no es válido")
    .isLength({ min: 3, max: 50 })
    .withMessage("Escriba mínimo 3 caracteres y máximo 50"),
  body("last_name")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isString()
    .withMessage("El valor no es válido")
    .isLength({ min: 3, max: 50 })
    .withMessage("Escriba mínimo 3 caracteres y máximo 50"),
  body("cuit")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isNumeric()
    .withMessage("El campo debe ser numérico"),
  body("team_id")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isNumeric()
    .withMessage("El campo debe ser numérico"),
  body("join_date")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isDate()
    .withMessage("El campo debe ser una fecha(aaaa-mm-dd)"),
  body("rol")
    .exists()
    .withMessage("El campo es obligatorio")
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isString()
    .withMessage("El valor no es válido")
    .isLength({ min: 2, max: 50 })
    .withMessage("Escriba mínimo 3 caracteres y máximo 50"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const updateEmployeeValidator = [
  body("first_name")
    .optional()
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isString()
    .withMessage("El valor no es válido")
    .isLength({ min: 3, max: 50 })
    .withMessage("Escriba mínimo 3 caracteres y máximo 50"),
  body("last_name")
    .optional()
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isString()
    .withMessage("El valor no es válido")
    .isLength({ min: 3, max: 50 })
    .withMessage("Escriba mínimo 3 caracteres y máximo 50"),
  body("cuit")
    .optional()
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isNumeric()
    .withMessage("El campo debe ser numérico"),
  body("team_id")
    .optional()
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isNumeric()
    .withMessage("El campo debe ser numérico"),
  body("join_date")
    .optional()
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isDate()
    .withMessage("El campo debe ser una fecha(aaaa-mm-dd)"),
  body("rol")
    .optional()
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isString()
    .withMessage("El valor no es válido")
    .isLength({ min: 2, max: 50 })
    .withMessage("Escriba mínimo 3 caracteres y máximo 50"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { createEmployeeValidator, updateEmployeeValidator };
