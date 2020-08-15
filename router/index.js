const express = require('express')
const router = express.Router()


router.get('/kishiler', function (req, res) {
    res.status(200).send([{
        name: 'Yusif',
        age: 26
    }, {
        name: 'Rauf',
        age: 26
    }, {
        name: 'Qosha',
        age: 26
    }])
})

module.exports = { rout: router }