/*const http = require('http');
//codigo de un servidor
const app = http.createServer((request, Response)=>{
    Response.writeHead(200, {'Content-Type': 'application/json'});
    Response.end('servidor node iniciado')
})
const PORT = 3000;
app.listen(PORT)
console.log('Servidor levantado en el puerto 3000')
*/

/*const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hola, respuesta del servidor con Express.js 😎");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});*/

/*const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const app = express();
app.use(cors());


// Inicializar Firebase
app.use(express.json());
const serviceAccount = require("./firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// Rutas
const db = admin.firestore();~
app.get("/", (req, res) => { //Ruta GET
  res.send("Servidor corriendo Firebase");});

  // Crear documento usuario
app.post("/libros/add", async (req, res) => { //Ruta POST
  try {
    const { Activo, Año, Categoria, Copias, Titulo } = req.body;    
    // Agregar documento a la colección "usuarios"   
    const docRef = await db.collection("libros").add({ Titulo, Copias, Año, Categoria, Activo}); 
    res.json({ id: docRef.id, message: "Libro agregado" });  
    } 
    catch (error) {
    res.status(500).json({ error: error.message });  
    }
});

//eliminar ciertos documentos de usuarios

app.delete("/libros/del/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("libros").doc(id).delete();
    res.json({ message: "Libro eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//actualizar daocumentos de usuarios
app.put("/libros/upd/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Activo, Año, Categoria, Copias, Titulo } = req.body;
    await db.collection("libros").doc(id).update({ Titulo, Copias, Año, Categoria, Activo });
    res.json({ message: "Libro actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Obtener datos de los documentos
app.get("/libros/ver", async (req, res) => {
  try {
    const items = await db.collection("libros").get();

    const libros = items.docs.map(doc => { // Mapear documentos a un array de objetos
      const data = doc.data();
      return {
        id: doc.id,
        Titulo: data.Titulo,
        Copias: data.Copias,
        Año: data.Año,
        Categoria: data.Categoria,
        Activo: data.Activo
        
      };
    });

    res.json(libros); // Enviar array de usuarios como respuesta en JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Conexión al servidor
const PORT = 3000;app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));*/

const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Inicializar Firebase
const serviceAccount = require("./firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Exportar db para usar en las rutas
const db = admin.firestore();
module.exports = db;

// Importar rutas
const librosRoutes = require("./routes/LIBROS.JS");
const usuariosRoutes = require("./routes/USUARIOS.JS"); // ejemplo de otra tabla
const multasRoutes = require("./routes/MULTAS.JS"); // ejemplo de otra tabla
const prestamosRoutes = require("./routes/PRESTAMOS.JS"); // ejemplo de otra tabla
const reservasRoutes = require("./routes/AUTORES.JS"); // ejemplo de otra tabla

// Usar rutas
app.use("/libros", librosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/multas", multasRoutes);
app.use("/prestamos", prestamosRoutes);
app.use("/autores", reservasRoutes);

app.get("/", (req, res) => {
  res.send("Servidor corriendo con Firebase y rutas separadas 🚀");
});

// Conexión al servidor
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
