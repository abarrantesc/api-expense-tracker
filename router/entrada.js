const express = require("express");
const  EntradasController= require("../controllers/entrada");
const multiparty = require("connect-multiparty");
const md_auth = require("../middleware/authenticated");


const md_upload = multiparty({uploadDir: "./uploads/course"});


const api = express.Router();


api.post("/entrada", [md_auth.asureAuth, md_upload],EntradasController.createEntrada);
api.get("/obtenerentradas", [md_auth.asureAuth, md_upload],EntradasController.getEntradas);
api.patch("/actualizarentradas/:id", [md_auth.asureAuth, md_upload],EntradasController.updateEntradas);
api.delete("/eliminarentradas/:id",[md_auth.asureAuth],EntradasController.deleteEntradas); 
module.exports = api;