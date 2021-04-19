const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');

const { color } = require('./constants');
const { LOG_START } = process.env;

class App {
    constructor() {
        this.express = express();
    }

    loadMiddlewares() {
        this.express.use(cors())
        this.express.use(bodyParser.json())
    }

    loadModels() {

    }

    loadControllers() {
        requireDir('../app/controllers');
    }

    loadRoutes() {
        requireDir('../app/routes');
    }

    loadBootstraps() {

    }

    start() {
        this.loadModels()
        this.loadControllers()
        this.loadRoutes()
        this.loadBootstraps()
    }
}

module.exports = new App();