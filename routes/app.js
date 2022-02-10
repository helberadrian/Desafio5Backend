//const archivo = require("../data/datos.json");
const fs = require("fs");
const {Router} = require("express");
const router = Router();

// Get raiz
router.get("/", (req, res) => {
    res.json({
        "Aviso": "Servidor Listo"
    });
});

// GET
router.get("/productos", (req, res) => {
    fs.promises.readFile("../data/datos.json", "utf-8")
    .then(contenido => {
        const data = JSON.parse(contenido);
        res.json(data);
    })
    .catch( error => {
        console.log("Error en la lectura", error);
    });
});

// GET
router.get("/productos/:id", (req, res) =>{
    fs.promises.readFile("../data/datos.json", "utf-8")
    .then(contenido => {
        const id = parseInt(req.params.id);
        const data = JSON.parse(contenido);

        const producto = data.find(producto => producto.id == id);
        res.json(producto);
    })
    .catch( error => {
        console.log("Error en la lectura", error);
    });
});
    
// POST
router.post("/productos", (req, res) => {
    fs.promises.readFile("../data/datos.json", "utf-8")
    .then(contenido => {
        const data = JSON.parse(contenido);
        const productoNuevo = req.body;
        let num = data.length + 1;
        const id = {id: num}
        const producto = Object.assign(productoNuevo, id);

        data.push(producto);
        const final = JSON.stringify(data);
        fs.writeFileSync("../data/datos.json", final);

        res.send(`Se guardo el producto ${JSON.stringify(producto)}`);
    })
    .catch( error => {
        console.log("Error en la lectura", error);
    });
});

// PUT
router.put("/productos/:id", (req, res) =>{
    fs.promises.readFile("../data/datos.json", "utf-8")
    .then(contenido =>{
        const id = parseInt(req.params.id); // Tomo información de DOM y navegador
        const productoNuevo = req.body;
        const resultado = [];

        const productos = JSON.parse(contenido); // Descargo el contenido del JSON

        for (const indice of productos) { // Elimino el producto existente creando un nuevo array sin el
            if (indice.id != id){
                resultado.push(indice);
            }
        }

        const productoFinal = Object.assign(productoNuevo, {id: id}); // Asigno el id al producto nuevo
        resultado.push(productoFinal); // Agrego el producto al array que se va a escribir

        fs.writeFileSync("../data/datos.json", JSON.stringify(resultado)); // Se guardan los datos en el archivo

        console.log(productos);
        res.send(`Se modifico el producto con el ID ${id}: ${JSON.stringify(productoFinal)}`);
    })
    .catch( error => {
        console.log("Error en la lectura", error);
    })
});

// DELETE
router.delete("/productos/:id", (req, res) =>{
    fs.promises.readFile("../data/datos.json", "utf-8")
    .then(contenido => {
        const data = JSON.parse(contenido);
        const id = parseInt(req.params.id);
        const resultado = [];

        const productos = JSON.parse(contenido);

        for (const indice of productos) {
            if (indice.id != id){
                resultado.push(indice);
            }
        }

        fs.writeFileSync("../data/datos.json", JSON.stringify(resultado));

        res.send(`Se elimino el producto ${id} con exito`);
    })
    .catch( error => {
        console.log("Error en la lectura", error);
    });
});

module.exports = router;
