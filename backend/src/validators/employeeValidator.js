const { body } = require("express-validator");
const validateResults = require("../utils/handleValidator");

// Middlewares para validar creación y actualización de employees

const createEmployeeValidator = [
  body("first_name")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("NOMBRE debe contener solo letras.")
    .exists()
    .withMessage("NOMBRE es obligatorio")
    .notEmpty()
    .withMessage("NOMBRE no debe quedar vacio.")
    .isString()
    .withMessage("El valor no es válido.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Escriba en NOMBRE un mínimo de 3 caracteres y un máximo 50."),
  body("last_name")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("APELLIDO debe contener solo letras.")
    .exists()
    .withMessage("APELLIDO es obligatorio.")
    .notEmpty()
    .withMessage("APELLIDO no debe estar vacio.")
    .isString()
    .withMessage("El valor de APELLIDO no es válido.")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Escriba en APELLIDO un mínimo de 3 caracteres y un máximo 50."
    ),
  body("cuit")
    .exists()
    .withMessage("CUIT es obligatorio.")
    .notEmpty()
    .withMessage("CUIT no debe estar vacio.")
    .isNumeric()
    .withMessage("CUIT debe ser numérico."),
  body("team_id")
    .exists()
    .withMessage("TEAM ID es obligatorio")
    .notEmpty()
    .withMessage("TEAM ID no debe estar vacio")
    .isNumeric()
    .withMessage("TEAM ID debe ser numérico"),
  body("join_date")
    .exists()
    .withMessage("FECHA DE CONTRATACIÓN es obligatorio")
    .notEmpty()
    .withMessage("FECHA DE CONTRATACIÓN no debe quedar vacio")
    .isDate()
    .withMessage(
      "FECHA DE CONTRATACIÓN debe ser una fecha válida (dd-mm-aaaa)"
    ),
  body("rol")
    .exists()
    .withMessage("ROL es obligatorio")
    .matches(/^[A-Za-z\s]+$/)

    .withMessage("ROL debe contener solo letras")
    .notEmpty()
    .withMessage("ROL no debe quedar vacio")
    .isString()
    .withMessage("ROL no es válido")
    .isLength({ min: 2, max: 50 })
    .withMessage("Escriba en ROL un mínimo de 2 caracteres y un máximo 50"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const updateEmployeeValidator = [
  body("first_name")
    .optional()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("NOMBRE debe contener solo letras.")
    .notEmpty()
    .withMessage("NOMBRE no debe quedar vacio")
    .isString()
    .withMessage("El valor de NOMBRE no es válido. Debe ser texto.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Escriba en NOMBRE un mínimo 3 caracteres y un máximo 50"),
  body("last_name")
    .optional()
    .notEmpty()
    .withMessage("Campo no debe quedar vacio")
    .isString()
    .withMessage("APELLIDO debe ser de texto")
    .isLength({ min: 3, max: 50 })
    .withMessage("Escriba en APELLIDO un mínimo 3 caracteres y un máximo 50"),
  body("cuit")
    .optional()
    .notEmpty()
    .withMessage("CUIT no debe quedar vacio")
    .isNumeric()
    .withMessage("CUIT debe ser numérico"),
  body("team_id")
    .optional()
    .notEmpty()
    .withMessage("TEAM ID no debe quedar vacio")
    .isNumeric()
    .withMessage("EAM ID debe ser numérico"),
  body("join_date")
    .optional()
    .notEmpty()
    .withMessage("FECHA DE CONTRATACION no debe quedar vacio")
    .isDate()
    .withMessage("FECHA DE CONTRATACION debe ser una fecha(aaaa-mm-dd)"),
  body("rol")
    .optional()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("En ROL debe escribir solo letras")
    .notEmpty()
    .withMessage("ROL no debe quedar vacio")
    .isString()
    .withMessage("El valor de ROL no es válido")
    .isLength({ min: 2, max: 50 })
    .withMessage("Escriba en ROL un mínimo 2 caracteres y un máximo 50"),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { createEmployeeValidator, updateEmployeeValidator };
