const orm = require('../config/orm.js');

const burger = {
    selectAll(cb) {
        orm.selectAll('burgers', (res) => cb(res));
    }, 
    insertOne(cols, vals, cb) {
        orm.insertOne('burgers', cols, vals, (res) => cb(res));
    },
    upadteOne(objColVals, condition, cb) {
        orm.updateOne('burgers', objColVals, condition, (res) => cb(res));
    },
};

module.exports = burger;