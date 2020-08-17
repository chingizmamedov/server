const express = require('express')
const router = express.Router()
const mysql = require('mysql2');
const Sequelize = require("sequelize");

const dbConfig = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "nodetest",
    dialect: "mysql",
    port: "8889",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: console.log
}

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    port: dbConfig.port,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

let posts = sequelize.define('posts', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
    },
    title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.DataTypes.STRING
    }
}, {
    timestamps: true // Колонки createdAt и updatedAt будут созданы автоматически
});

// И комменты
let comments = sequelize.define('comments', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
    },
    posts_id: { // Связь с табличкой posts
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    userName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true // Колонки createdAt и updatedAt будут созданы автоматически
});
let newPost = {
    title: 'Post title 1',
    body: 'Ololo ololo ya voditel NLO'
}
let newDBRecord = sequelize.models.posts.create(newPost);

sequelize.authenticate()
    .then(response => console.log('res 45', response))
    .catch(err => console.log('err', err))
sequelize.sync();

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