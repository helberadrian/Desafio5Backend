const archivo = require("../data/datos.json");
const fs = require("fs");
const {Router} = require("express");
const router = Router();

// Get raiz
router.get("/", (req, res) => {
    res.json({
        "Aviso": "Servidor Listo"
    });
});

router.get("/productos", (req, res) => {
    res.json(archivo);
});

// GET
router.get("/productos/:id", (req, res) =>{
    const id = parseInt(req.params.id);

    const producto = archivo.find(producto => producto.id == id);
    res.json(producto);
});

// POST
router.post("/productos", (req, res) => {
    const producto = req.body;
    let num = archivo.length + 1;
    const id = { id: num}
    const productoFinal = Object.assign(producto, id);
    
    archivo.push(productoFinal);
    res.send(`Se guardo el producto ${JSON.stringify(productoFinal)}`);
});

// PUT
router.put("/productos/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const productoNuevo = req.body;
    const resultado = [];

    const datos = fs.readFileSync("../data/datos.json");
    const productos = JSON.parse(datos);

    const producto = productos.find(producto => producto.id == id);
    if (producto == undefined){
        res.send({error: "producto no encontrado"});
    } else{
        for (const indice of productos) {
            if (indice.id != id){
                resultado.push(indice);
            }
        }
        const productoFinal = Object.assign(productoNuevo, id);
        productos.push(productoFinal);

        fs.writeFileSync("../data/datos.json", JSON.stringify(productos));
    }
    console.log(productos);
    res.send(`Se modifico el producto con el ID ${id}: ${JSON.stringify(productoNuevo)}`);
});

// DELETE
router.delete("/productos/:id", (req, res) =>{
    const id = parseInt(req.params.id);

    const producto = archivo.find(producto => producto.id == id);
    if (producto == undefined){
        res.send({error: "producto no encontrado"});
    } else{
        archivo.filter(eliminado => eliminado.id !== id);
    }
    console.log(archivo);
    res.send(`Se borro el archivo con el ID ${id}: ${JSON.stringify(archivo)}`);
});

module.exports = router;
