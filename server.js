const express = require("express");
const app = express();
const productos = require("./routes/app");
const PORT = 8080;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// settings
app.set("json spaces", 2);
app.use("/static", express.static(__dirname, "./public"));
app.use("/api", productos);

// starting the server
const server = app.listen(PORT, () =>{
    console.log(`Servidor conectado en puerto ${server.address().port}`);
});