const express = require('express')
const app = express()
require('dotenv').config({path : './config/dev.env'})
const chalk = require('chalk')
const cors =require('cors')

//middleware
app.use(cors())
app.use(express.json()) // helps us access req.body

//routes
//register and login routes
app.use('/auth',require('./routes/jwtAuth'))
//dashboard route
app.use('/dashboard',require('./routes/dashboard'))

const PORT=process.env.PORT;
app.listen(PORT,()=>console.log(`Server ${chalk.yellowBright(`running`)} on ${chalk.cyan(`port`)} ${chalk.red(PORT)}`))