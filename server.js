const express = require('express');
const app = express();
const path = require('path');

const {insertar, consultar, editar, eliminar} = require('./consultas');

app.listen(3000, () => {
  console.log('Server:ON')
})
app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})


app.post("/cancion", async (req, res) => {
  try {
    const datos = Object.values(req.body);
    const respuesta = await insertar(datos);
    res.json(respuesta);
  } catch (error) {
    res.status(500).send("Algo salio mal");
  }
});


app.get("/canciones", async (_req, res) => {
  try {
    // Call the `consultar` function to retrieve the records from the database
    const registros = await consultar();

    // Send the retrieved records as a JSON response
    res.json(registros);
  } catch (error) {
    // If an error occurs, send a 500 status code with an error message
    res.status(500).send("Algo salio mal");
  }
});
  
// app.put("/cancion", async (req, res) => {
//   try {
//     const datos = Object.values(req.body);
//     const respuesta = await editar(datos);
//     res.json(respuesta);
//   } catch (error) {
//     res.status(500).send("Algo salio mal");
//   }
// });
//Segunda version
// app.put("/cancion/:id", async (req, res) => {
//   try {
//     const datos = Object.values(req.body);
//     const respuesta = await editar(datos);
//     res.json(respuesta);
//   } catch (error) {
//     res.status(500).send("Algo salio mal");
//   }
// });
app.put("/cancion/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, artista, tono } = req.body;
    const respuesta = await editar(id, titulo, artista, tono);
    res.json(respuesta);
  } catch (error) {
    res.status(500).send("Algo salio mal");
  }
});
// app.delete("/cancion", async (req, res) => {
//   try {
//     const {id} = req.query
//     const respuesta = await eliminar(id);
//     res.json(respuesta);
//   } catch (error) {
//     res.status(500).send("Algo salio mal");
//   }
// })
app.delete("/cancion/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const respuesta = await eliminar(id);
    res.json(respuesta);
  } catch (error) {
    res.status(500).send("Algo salio mal");
  }
});