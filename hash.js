const bcrypt = require('bcrypt')

module.exports = function (password){
    return bcrypt.hash(password,10)
}