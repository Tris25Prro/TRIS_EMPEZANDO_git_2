const express = require("express");
const router = express.Router();
const db = require("../index")


  // Crear documento usuario
router.post("/multas/add", async (req, res) => { //Ruta POST
  try {
    const { estado, FechaLimite, Monto } = req.body;    
    // Agregar documento a la colección "usuarios"   
    const docRef = await db.collection("multas").add({ estado, FechaLimite, Monto }); 
    res.json({ id: docRef.id, message: "Multa agregado" });  
    } 
    catch (error) {
    res.status(500).json({ error: error.message });  
    }
});

//eliminar ciertos documentos de usuarios
router.delete("/multas/del/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("multas").doc(id).delete();
    res.json({ message: "Multa eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//actualizar daocumentos de usuarios
router.put("/multas/upd/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, FechaLimite, Monto } = req.body;
    await db.collection("multas").doc(id).update({ estado, FechaLimite, Monto });
    res.json({ message: "Multa actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Obtener datos de los documentos
router.get("/multas/ver", async (req, res) => {
  try {
    const items = await db.collection("multas").get();

    const multas = items.docs.map(doc => { // Mapear documentos a un array de objetos
      const data = doc.data();
      return {
        id: doc.id,
        FechaLimite: data.FechaLimite,
        estado: data.estado,
        Monto: data.Monto,
        
      };
    });

    res.json(multas); // Enviar array de usuarios como respuesta en JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Conexión al servidor
module.exports = router;