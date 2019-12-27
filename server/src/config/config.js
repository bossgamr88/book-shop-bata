module.exports = {
    port : 5000,
    db : {
        database : process.env.DB_NAME || 'blogDb',
        user : process.env.DB_User || 'root',
        password : process.env.DB_PASS || '',
        options : {
            dialect : process.env.DIALECT || 'sqlite',
            storage : './blogDb-db.sqlite'
        }
    },
}



