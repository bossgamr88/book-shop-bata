const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config');
const db = {};

const sequelize = new Sequelize (
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

fs.readdirSync(__dirname)
    .filter((file) => 
        file !== 'index.js'    
)
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname,file))
        db[model.name] = model
    });
    db.sequelize = sequelize
    db.Sequelize = Sequelize
    
module.exports = db

/**
 * UserController(ชื่อ model) -> Model -> index.js -> 
 * fs(config,เลือกตามชื่อ Model ที่ส่งมา) ->
 * สร้าง Database Object เก็บตารางตาม model นั้นๆ ->
 * ส่ง data กลับตามคำสั่งที่กำหนด
 */


