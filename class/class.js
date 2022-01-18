const fs = require("fs");

module.exports = class ProductosCocina {
    constructor(producto, precio, cantidad, id) {
        this.file = "./data/datos.json";
        this.producto = producto;
        this.precio = precio;
        this.cantidad = cantidad;
        this.id = id;
        this.productos = Array;
        }
    
    getAll(){
        const datos = fs.readFileSync(this.file, "utf-8");
        this.productos = JSON.parse(datos);

        return this.productos;
    }

    numRandom(){
        const datos = fs.readFileSync(this.file, "utf-8");
        this.productos = JSON.parse(datos);

        let num = Math.floor(Math.random() * this.productos.length)-1;

        return this.productos[num];
    }
}