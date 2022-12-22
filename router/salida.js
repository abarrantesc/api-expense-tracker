const express = require("express");
const  SalidasController= require("../controllers/salidas");
const multiparty = require("connect-multiparty");
const md_auth = require("../middleware/authenticated");


const md_upload = multiparty({uploadDir: "./uploads/course"});


const api = express.Router();


api.post("/salida", [md_auth.asureAuth, md_upload],SalidasController.createSalida);
api.get("/obtenersalidas", [md_auth.asureAuth, md_upload],SalidasController.getSalidas);
api.patch("/actualizarsalidas/:id", [md_auth.asureAuth, md_upload],SalidasController.updateSalidas);
api.delete("/eliminarsalidas/:id",[md_auth.asureAuth],SalidasController.deleteSalidas); 
module.exports = api;