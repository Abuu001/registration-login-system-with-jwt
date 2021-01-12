const express = require('express')
const app = express()
require('dotenv').config({path : './config/dev.env'})
const chalk = require('chalk')
  
const PORT=process.env.PORT;
app.listen(PORT,()=>console.log(`Server ${chalk.yellowBright(`running`)} on ${chalk.cyan(`port`)} ${chalk.red(PORT)}`))