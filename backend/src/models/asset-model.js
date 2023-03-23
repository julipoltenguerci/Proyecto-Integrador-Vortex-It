//Importación de conexión y configuración de la base de datos
const connection = require("../config/db-config");

// ---------- Funciones de Modelo Asset ----------

const getAllAssets = async (req) => {
  const {
    page = 1,
    limit = "10",
    orderBy = "id_asset",
    direction = "ASC",
    ...filters
  } = req.query;

  // Offset: Cálculo de tamaño de pagina
  const offset = (page - 1) * limit;

  // Clausula where
  const where =
    filters &&
    Object.entries(filters)
      .map(([key, value]) => `${key} = "${value}"`)
      .join(" AND ");

  const finalQuery = `SELECT * FROM assets ${
    where ? `WHERE ${where}` : ""
  } ORDER BY ${orderBy} ${direction} 
  LIMIT ${limit} OFFSET ${offset}`;

  const [rows] = await connection.query(finalQuery);

  return rows;
};

const getAssetById = async (idA) => {
  const sentence = `SELECT * FROM assets a WHERE a.id_asset = ${idA}`;
  const row = await connection.query(sentence).spread((row) => row);
  return row;
};

const getAssetsByEmployeeId = async (idE) => {
  const sentence = `SELECT * FROM assets a WHERE a.id_employee= ${idE}`;
  const rows = await connection.query(sentence).spread((rows) => rows);
  return rows;
};

const createAsset = async (values) => {
  const { name, type, code, brand, description, purchase_date, id_employee } =
    values;
  const result = await connection
    .query(
      "INSERT INTO assets(name, type, code, brand, description, purchase_date, id_employee ) values(?,?,?,?,?,?,?)",
      [name, type, code, brand, description, purchase_date, id_employee]
    )
    .spread((result) => result);

  return result.insertId;
};

const updateAsset = async (req, idA) => {
  const body = Object.entries(req);
  console.log("req:", req);
  console.log("iD a actualizar:", idA);
  let sentence = "UPDATE assets SET ";
  for (let i = 0; i < body.length; i++) {
    if (body[i][0] == "id_employee") {
      sentence = sentence.concat(`${body[i][0]} = ${body[i][1]} `);
      console.log("entro");
    } else if (i === body.length - 1) {
      sentence = sentence.concat(`${body[i][0]} = "${body[i][1]}" `);
    } else {
      sentence = sentence.concat(`${body[i][0]} = "${body[i][1]}", `);
    }
  }
  sentence = sentence.concat(`WHERE id_asset = ${idA}`);
  console.log(sentence);

  const result = await connection.query(sentence).spread((result) => result);
  console.log("resultado ", result);

  return result;
};

const deleteAsset = async (idA) => {
  const sentence = `DELETE FROM assets WHERE id_asset = ${idA}`;
  const result = await connection.query(sentence).spread((result) => result);
  return result.affectedRows;
};

module.exports = {
  getAllAssets,
  getAssetById,
  getAssetsByEmployeeId,
  deleteAsset,
  createAsset,
  updateAsset,
};
