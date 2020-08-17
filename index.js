const express = require('express')
const app = express()
const router = require('./router/index.js')

app.listen(3000);

app.use('/api', router.rout)