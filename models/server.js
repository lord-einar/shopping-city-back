const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Conectar a base de datos
    this.conectarDB()
    //Middlewares
    this.middlewares();

    //Rutas de mi aplicacion

    this.routes();
  }

  async conectarDB() {
    await dbConnection()
  }

  middlewares() {
        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json())

        // Directorio publico
        this.app.use(express.static("public"));
  }

  routes() {
    this.app.use('/api/user', require('../routes/user.routes'))
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Corriendo en puerto ${this.port}`)
    );
  }
}

module.exports = Server;
