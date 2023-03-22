const employeeRouter = require("express").Router();
const employeeController = require("../controllers/employee-controller");

//Importación de Middleware para validaciones
const {
  createEmployeeValidator,
  updateEmployeeValidator,
} = require("../validators/employeeValidator");

//Paths para rutas de employees

employeeRouter
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(createEmployeeValidator, employeeController.createEmployee);

employeeRouter
  .route("/:idE")
  .get(employeeController.getEmployeeById)
  .delete(employeeController.deleteEmployee)
  .put(updateEmployeeValidator, employeeController.updateEmployee);

module.exports = employeeRouter;
