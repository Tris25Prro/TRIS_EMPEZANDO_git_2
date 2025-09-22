const express = require("express");
const router = express.Router();
const db = require("../index")



  // Crear documento usuario
router.post("/usuarios/add", async (req, res) => { //Ruta POST
  try {
    const { Apellido, Nombre, Email, FechaRegistro, Telefono } = req.body;    
    // Agregar documento a la colección "usuarios"   
    const docRef = await db.collection("usuarios").add({ Apellido, Nombre, Email, FechaRegistro, Telefono}); 
    res.json({ id: docRef.id, message: "Usuario agregado" });  
    } 
    catch (error) {
    res.status(500).json({ error: error.message });  
    }
});

//eliminar ciertos documentos de usuarios
router.delete("/usuarios/del/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("usuarios").doc(id).delete();
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//actualizar daocumentos de usuarios
router.put("/usuarios/upd/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Apellido, Nombre, Email, FechaRegistro, Telefono } = req.body;
    await db.collection("usuarios").doc(id).update({ Apellido, Nombre, Email, FechaRegistro, Telefono });
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Obtener datos de los documentos
router.get("/usuarios/ver", async (req, res) => {
  try {
    const items = await db.collection("usuarios").get();

    const usuarios = items.docs.map(doc => { // Mapear documentos a un array de objetos
      const data = doc.data();
      return {
        id: doc.id,
        Nombre: data.Nombre,
        Apellido: data.Apellido,
        Email: data.Email,
        FechaRegistro: data.FechaRegistro,
        Telefono: data.Telefono
        
      };
    });

    res.json(usuarios); // Enviar array de usuarios como respuesta en JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Conexión al servidor
module.exports = router;