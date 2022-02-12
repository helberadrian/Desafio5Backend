const fs = require("fs");

module.exports = class ListaProductos {
    constructor(productos) {
        this.file = "./data/datos.json";
        this.productos = productos;
        }
    
    getAll(){
        fs.promises.readFile(this.file, "utf-8")
        .then(contenido => {
            this.productos = JSON.parse(contenido);
        
            return this.productos;
        })
        .catch( error => {
            console.log("Error en la lectura", error);
        });
    }

    getID(id){
        const data = fs.readFileSync(this.file, "utf-8");
        this.productos = JSON.parse(data);

        const producto = this.productos.find(producto => producto.id == id);
        return producto;
    }

    agregarProducto(nuevo){
        fs.promises.readFile(this.file, "utf-8")
        .then(contenido => {
            this.productos = JSON.parse(contenido);
            
            let num = this.productos.length + 1;
            const id = {id: num}
            const producto = Object.assign(nuevo, id);

            this.productos.push(producto);
            const final = JSON.stringify(this.productos);
            fs.writeFileSync(this.file, final);

            //console.log(final);
            //console.log(producto);
            return this.productos;
        })
        .catch( error => {
            console.log("Error en la lectura", error);
        });
    }

    modificarProducto(id, productoNuevo){
        fs.promises.readFile(this.file, "utf-8")
        .then(contenido =>{
            const resultado = [];
            this.productos = JSON.parse(contenido); // Descargo el contenido del JSON

            for (const indice of this.productos) { // Elimino el producto existente creando un nuevo array sin el
                if (indice.id != id){
                    resultado.push(indice);
                }
            }

            const productoFinal = Object.assign(productoNuevo, {id: id}); // Asigno el id al producto nuevo
            resultado.push(productoFinal); // Agrego el producto al array que se va a escribir

            fs.writeFileSync(this.file, JSON.stringify(resultado)); // Se guardan los datos en el archivo

            return productoFinal;
        })
        .catch( error => {
            console.log("Error en la lectura", error);
        })
    }

    deleteID(id){
        fs.promises.readFile(this.file, "utf-8")
        .then(contenido => {
            this.productos = JSON.parse(contenido);
            const resultado = [];

            for (const indice of this.productos) {
                if (indice.id != id){
                    resultado.push(indice);
                }
            }

            fs.writeFileSync(this.file, JSON.stringify(resultado));
        })
        .catch( error => {
            console.log("Error en la lectura", error);
        });
    }
}