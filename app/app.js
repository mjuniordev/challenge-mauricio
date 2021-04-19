const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs')
const requireDir = require('require-dir');

const { color } = require('./constants');
const { LOG_START } = process.env;

class App {
    constructor() {
        this.express = express();
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

    }
    
    loadMiddlewares() {
        this.express.use(cors())
        this.express.use(bodyParser.json())
    }

    loadRoutes() {
        this.requireDirectory('routes', true)
    }

    loadControllers() {
        this.requireDirectory('controllers')
    }

    loadBootstraps() {

    }

    start() {
        this.loadModels()
        this.loadMiddlewares()
        this.loadRoutes()
        this.loadControllers()
        this.loadBootstraps()
    }
}

module.exports = new App();