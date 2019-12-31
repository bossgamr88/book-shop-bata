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

    User.prototype.comparePassword = function(password){
        if(password == this.password){
            return true
        }
        return false 
    }       
    User.associate = function(models){}

    return User
}








