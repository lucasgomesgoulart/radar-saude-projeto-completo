const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./Routes/user.routes')

const server = express()
server.use(cors())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(routes)

dotenv.config({ path: './config/config.env' })

const port = process.env.PORT || 5000

server.listen(
    port,
    console.log(`Servidor rodando em ${process.env.NODE_ENV} na porta ${port}`),

)

