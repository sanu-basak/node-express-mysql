const config = require('../config/db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.DB,
    config.USERNAME,
    config.PASSWORD,
    {
        host : config.HOST,
        dialect : config.dialect,
        operatorAliases : false,
        pool : {
            min : config.pool.min,
            max : config.pool.max,
            acquire : config.pool.acquire,
            idle : config.pool.idle
        }
    }

);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user      = require('../models/user.model.js')(sequelize,Sequelize);
db.role      = require('../models/role.model.js')(sequelize,Sequelize);

db.role.belongsToMany(db.user,{
    through : "user_roles",
    foreignKey : "roleId",
    otherKey : "userId"
});

db.user.belongsToMany(db.role,{
    through : "user_roles",
    foreignKey : "userId",
    otherKey : "roleId"
})

db.ROLES = ["admin","moderator","user"];

module.exports = db;