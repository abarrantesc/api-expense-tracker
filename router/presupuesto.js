const express = require("express");
const  PresupuestoController= require("../controllers/presupuesto");
const multiparty = require("connect-multiparty");
const md_auth = require("../middleware/authenticated");


const md_upload = multiparty({uploadDir: "./uploads/course"});


const api = express.Router();


api.post("/presupuesto", [md_auth.asureAuth,md_upload],PresupuestoController.createPresupuesto); 
api.get("/obtenerpresupuesto" ,[md_auth.asureAuth,md_upload],PresupuestoController.getPresupuesto);
api.patch("/actualizarpresupuesto/:id" ,[md_auth.asureAuth,md_upload],PresupuestoController.updatePresupuesto);

module.exports = api;