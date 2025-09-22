const express = require("express");
const router = express.Router();
const db = require("../index")


  // Crear documento usuario
router.post("/prestamos/add", async (req, res) => { //Ruta POST
  try {
    const { FechaDevolucion, estado, fechaDePrestacion } = req.body;    
    // Agregar documento a la colección "usuarios"   
    const docRef = await db.collection("prestamos").add({ FechaDevolucion, estado, fechaDePrestacion}); 
    res.json({ id: docRef.id, message: "Prestamo agregado" });  
    } 
    catch (error) {
    res.status(500).json({ error: error.message });  
    }
});

//eliminar ciertos documentos de usuarios
router.delete("/prestamos/del/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("prestamos").doc(id).delete();
    res.json({ message: "Prestamo eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//actualizar daocumentos de usuarios
router.put("/prestamos/upd/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { FechaDevolucion, estado, fechaDePrestacion } = req.body;
    await db.collection("prestamos").doc(id).update({ FechaDevolucion, estado, fechaDePrestacion });
    res.json({ message: "Prestamo actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Obtener datos de los documentos
router.get("/prestamos/ver", async (req, res) => {
  try {
    const items = await db.collection("prestamos").get();

    const prestamos = items.docs.map(doc => { // Mapear documentos a un array de objetos
      const data = doc.data();
      return {
        id: doc.id,
        FechaDevolucion: data.FechaDevolucion,
        estado: data.estado,
        fechaDePrestacion: data.fechaDePrestacion,
        
      };
    });

    res.json(prestamos); // Enviar array de usuarios como respuesta en JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Conexión al servidor
module.exports = router;