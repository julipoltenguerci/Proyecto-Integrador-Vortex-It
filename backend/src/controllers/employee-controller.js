const employeeModel = require("../models/employee-model");
//const assetModel = require("../models/asset-model");
const { NotFoundError } = require("../customError/Http-Error");
const ResponseApi = require("../utils/responseApi");

// ---------- Funciones de Controlador de Employee ----------

const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await employeeModel.getAllEmployees(req);
    employees.length === 0
      ? next(new NotFoundError("No se encontraron empleados disponibles."))
      : res.json(
          new ResponseApi(
            true,
            "Se encontraron los siguientes empleados",
            employees
          )
        );
  } catch (err) {
    next(err);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const { idE } = req.params;
    const employee = await employeeModel.getEmployeeById(idE);
    employee.length === 0
      ? next(new NotFoundError(`No se encontró el empleado con el ID ${idE}`))
      : res.json(
          new ResponseApi(
            true,
            `Se encontró el empleado con el ID  ${idE} `,
            employee
          )
        );
  } catch (err) {
    next(err);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const values = { ...req.body };
    const idCreated = await employeeModel.createEmployee(values);
    res
      .status(201)
      .json(
        new ResponseApi(
          true,
          `Se ha creado correctamente el empleado con ID ${idCreated}`,
          idCreated,
          201
        )
      );
  } catch (err) {
    next(err);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const { idE } = req.params;
    let employeeToUpdate = await employeeModel.getEmployeeById(idE);
    if (employeeToUpdate.length == 0) {
      res
        .status(404)
        .json(
          new ResponseApi(
            false,
            `No se ha encontrado el empleado con el ID ${idE}`,
            idE,
            404
          )
        );
    }
    await employeeModel.updateEmployee(req.body, idE);
    res.json(
      new ResponseApi(
        true,
        `Se ha editado correctamente el empleado con ID ${idE}`,
        idE
      )
    );
  } catch (err) {
    next(err);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const { idE } = req.params;
    let empleadoToUpdate = await employeeModel.getEmployeeById(idE);
    if (empleadoToUpdate.length == 0) {
      res
        .status(404)
        .json(
          new ResponseApi(
            false,
            `No se ha encontrado el empleado con el ID ${idE}`,
            idE,
            404
          )
        );
    }
    // Obtener los activos relacionados con el empleado que se va a eliminar
    // const assets = await assetModel.getAssetsByEmployeeId(idE);
    // console.log(assets);
    // // Desvincular los activos del empleado antes de eliminarlo
    // await Promise.all(
    //   assets.map(async (asset) => {
    //     console.log("antes de act");
    //     await assetModel.updateAsset({ id_employee: null }, 6);
    //   })
    // );
    // Eliminar el empleado
    const result = await employeeModel.deleteEmployee(idE);
    res.json(
      new ResponseApi(
        true,
        `Se ha eliminado correctamente el empleado con ID ${idE}`,
        idE
      )
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
