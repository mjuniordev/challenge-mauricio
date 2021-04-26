const app = require('./app')
const mongo = require('./db/mongo')
const { color } = require('./constants')

mongo.connect()
  .then(() => {
    const { express } = app
    const { PORT } = process.env

    app.start()
    express.listen(PORT, () => console.log(color.GREEN, `\nAPP RUNNING ON PORT ${PORT}`))
  })