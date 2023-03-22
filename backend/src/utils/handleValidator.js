const { validationResult } = require("express-validator");

// Manejador de la validacion de resultados
const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next(); //Si no existe error con la validacion, continua hacia el controlador
  } catch (err) {
    res.status(400);
    res.send({ errors: err.array() });
  }
};

module.exports = validateResults;
