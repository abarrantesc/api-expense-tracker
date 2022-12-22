const express = require("express");
const {API_VERSION} =require("./constants");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


// import rutas
const authRoutes = require("./router/auth");
const UserRouter = require("./router/user");
const menuRoutes = require("./router/menu");
const courseRoutes = require("./router/course");
const postRoutes = require("./router/post");
const newsletterRoutes = require("./router/newsletter");
const entradasRoutes = require("./router/entrada");
const presupuestoRoutes = require("./router/presupuesto");
const salidasRoutes = require("./router/salida");
// Configurar body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Configurar static files (arhicvos de uploads)
app.use(express.static("uploads"));

// configurar Header HTTP - CORS
app.use(cors());


// Configurar routes
app.use(`/api/${API_VERSION}`,authRoutes);
app.use(`/api/${API_VERSION}`,UserRouter);
app.use(`/api/${API_VERSION}`,menuRoutes);
app.use(`/api/${API_VERSION}`,courseRoutes);
app.use(`/api/${API_VERSION}`,postRoutes);
app.use(`/api/${API_VERSION}`,newsletterRoutes);
app.use(`/api/${API_VERSION}`,entradasRoutes);
app.use(`/api/${API_VERSION}`,presupuestoRoutes);
app.use(`/api/${API_VERSION}`,salidasRoutes);

module.exports = app;
