const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs')

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yml');

const errorHandler = require('./middlewares/errorHandler');
const { color } = require('./constants');
const { LOG_START } = process.env;

class App {
    constructor() {
        this.express = express();
        // this.jwtAuthorization = null;
    }

    requireDirectory(path, execute) {
        const files = fs.readdirSync(`${__dirname}/${path}`)
    
        if (LOG_START) console.log(color.BLUE, `\nLoading ${path}`)
    
        files.forEach(file => {
          const fileSplit = file.split('.')
          const extension = fileSplit[fileSplit.length - 1]
    
          if (extension === 'js') {
            if (LOG_START) console.log(color.GREEN, file)
    
            if (execute) require(`${__dirname}/${path}/${file}`)({ app: this.express })
            else require(`${__dirname}/${path}/${file}`)
          }
        })
    }

    loadModels() {
        this.requireDirectory('models')
    }
    
    loadMiddlewares() {
        // this.jwtAuthorization = require('./middlewares/authorization');

        this.express.use(cors())
        this.express.use(bodyParser.json())
        // this.express.use(this.jwtAuthorization);
    }

    loadRoutes() {
        this.requireDirectory('routes', true)
    }

    loadControllers() {
        this.requireDirectory('controllers')
    }

    loadBootstraps() {
        this.requireDirectory('bootstraps')
    }

    start() {
        this.loadModels()
        this.loadMiddlewares()
        this.loadRoutes()
        this.loadControllers()
        this.loadBootstraps()

        this.express.use(errorHandler)
        this.express.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
}

module.exports = new App();