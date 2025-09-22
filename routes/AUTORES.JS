const express = require("express");
const router = express.Router();
const db = require("../index")


  // Crear documento usuario
router.post("/autores/add", async (req, res) => { //Ruta POST
  try {
    const { Apellidos, Nombres, Nacionalidad } = req.body;    
    // Agregar documento a la colección "usuarios"   
    const docRef = await db.collection("autores").add({ Apellidos, Nombres, Nacionalidad}); 
    res.json({ id: docRef.id, message: "Usuario agregado" });  
    } 
    catch (error) {
    res.status(500).json({ error: error.message });  
    }
});

//eliminar ciertos documentos de usuarios
router.delete("/autores/del/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("autores").doc(id).delete();
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//actualizar daocumentos de usuarios
router.put("/autores/upd/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Apellidos, Nombres, Nacionalidad } = req.body;
    await db.collection("autores").doc(id).update({ Apellidos, Nombres, Nacionalidad });
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Obtener datos de los documentos
router.get("/autores/ver", async (req, res) => {
  try {
    const items = await db.collection("autores").get();

    const autores = items.docs.map(doc => { // Mapear documentos a un array de objetos
      const data = doc.data();
      return {
        id: doc.id,
        Nombres: data.Nombres,
        Apellidos: data.Apellidos,
        Nacionalidad: data.Nacionalidad,
        
      };
    });

    res.json(autores); // Enviar array de usuarios como respuesta en JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Conexión al servidor
module.exports = router;