//Importación de conexión y configuración de la base de datos
const connection = require("../config/db-config");

// ---------- Funciones de Modelo Employee ----------

const getAllEmployees = async (req) => {
  const {
    page = 1,
    limit = "10",
    orderBy = "id_employee",
    direction = "ASC",
    ...filters
  } = req.query;

  // Offset: Cálculo de tamaño de pagina
  const offset = (page - 1) * limit;

  const where =
    filters &&
    Object.entries(filters)
      .map(([key, value]) => `${key} = "${value}"`)
      .join(" AND ");

  const finalQuery = `SELECT * FROM employees ${
    where ? `WHERE ${where}` : ""
  } ORDER BY ${orderBy} ${direction} 
  LIMIT ${limit} OFFSET ${offset}`;

  const [rows] = await connection.query(finalQuery);

  return rows;
};

const getEmployeeById = async (idE) => {
  const sentence = `SELECT * FROM employees e WHERE e.id_employee = ${idE}`;
  const rows = await connection.query(sentence).spread((rows) => rows);
  return rows.length > 0 ? rows[0] : [];
};

const createEmployee = async (values) => {
  const { first_name, last_name, cuit, team_id, join_date, rol } = values;
  const result = await connection
    .query(
      "INSERT INTO employees(first_name, last_name, cuit, team_id, join_date, rol) values(?,?,?,?,?,?)",
      [first_name, last_name, cuit, team_id, join_date, rol]
    )
    .spread((result) => result);
  return result.insertId;
};

const updateEmployee = async (req, idE) => {
  const body = Object.entries(req);
  let sentence = "UPDATE employees SET ";
  for (let i = 0; i < body.length; i++) {
    if (i === body.length - 1) {
      sentence = sentence.concat(`${body[i][0]} = "${body[i][1]}" `);
    } else {
      sentence = sentence.concat(`${body[i][0]} = "${body[i][1]}", `);
    }
  }
  sentence = sentence.concat(`WHERE id_employee = ${idE}`);

  const result = await connection.query(sentence).spread((result) => result);
  return result;
};

const deleteEmployee = async (idE) => {
  const sentence = `DELETE FROM employees WHERE id_employee = ${idE}`;
  const result = await connection.query(sentence).spread((result) => result);
  return result.affectedRows;
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  deleteEmployee,
  createEmployee,
  updateEmployee,
};
