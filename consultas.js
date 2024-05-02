
const pool = require("./dbConfig");
//Funcion para verificar la conexion a la base de datos
const conectarDB = async () => {
    try {
        const res = await pool.query(`SELECT NOW()`);
        console.log("Conexion exitosa, fecha y hora actuales:", res.rows[0]);
    } catch (error) {
        console.error("Error al conectar a la Base de datos", error);
    }
}
//Llamar a la funcion de conectarDB
conectarDB();
const insertar = async (datos) => {
  const consulta = {
    text: "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3)",
    values: datos,
  };
  const result = await pool.query(consulta);
  return result;
};

const consultar = async () => {
  try {
    const result = await pool.query("SELECT * FROM canciones");
    return result.rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};


// const editar = async (datos) => {
//   const consulta = {
//     text: `UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *`,
//     values: datos,
//   };
//   const result = await pool.query(consulta);
//   return result;
// };
// 
// segunda version
// const editar = async (id, titulo, artista, tono) => {
//         const consulta = {
//         text: "UPDATE canciones SET titulo = $2, artista = $3, tono = $4 WHERE id = $1 RETURNING *",
//         values: [id, titulo, artista, tono,],
//     };
//     const result = await pool.query(consulta);
//     return result;
// }
const editar = async (id, titulo, artista, tono) => {
  const consulta = {
    text: "UPDATE canciones SET titulo = $2, artista = $3, tono = $4 WHERE id = $1 RETURNING *",
    values: [id, titulo, artista, tono],
  };
  const result = await pool.query(consulta);
  return result;
};
const eliminar = async (id) => {
  const result = await pool.query(`DELETE FROM canciones WHERE id =  '${id}'`);
  return result;
};

module.exports = { insertar, conectarDB, consultar, editar, eliminar}; // Exportamos la función