const express = require("express");
const { send } = require("express/lib/response");
const app = express();
const router = express.Router();
const {ProductosCocina} = require("../class/class");
//const productos = new ProductosCocina;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/api/productos", function (req, res){
    const archivo = express.json("../data/datos.json");
    res.json(archivo);
})

