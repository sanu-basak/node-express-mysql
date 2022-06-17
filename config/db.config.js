module.exports = {
    HOST     : "localhost",
    USERNAME : "root",
    PASSWORD : "",
    DB       : "node",
    dialect : "mysql",
    pool : {
        min : 0,
        max : 5,
        acquire : 30000,
        idle : 10000
    }
}