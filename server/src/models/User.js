// User.js
module.exports = (sequelize,DataTypes) => {
	// Scheme for User
    const User = sequelize.define('User',{
        email : DataTypes.STRING,
        password : DataTypes.STRING,
        name : DataTypes.STRING,
        lastname : DataTypes.STRING,
        status : DataTypes.STRING,
        type : DataTypes.STRING
    })
    return User
}








