const { NODE_ENV } = process.env
const path = `dotenv/${NODE_ENV}.env`

require('dotenv').config({ path })