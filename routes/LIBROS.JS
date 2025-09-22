const express = require("express");
const router = express.Router();
const db = require("../index")


  // Crear documento usuario
router.post("/libros/add", async (req, res) => { //Ruta POST
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

router.delete("/libros/del/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("libros").doc(id).delete();
    res.json({ message: "Libro eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//actualizar daocumentos de usuarios
router.put("/libros/upd/:id", async (req, res) => {
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
router.get("/libros/ver", async (req, res) => {
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
module.exports = router;