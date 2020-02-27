const md5 = require('md5')
const User = require('../models/').User

module.exports.authenticate = async ({ username, password }) => 
    User
    .findOne({
        where: {
            username: username,
            password: md5(password),
        }
    })
    .then(user => {
        console.log(user)
        if (user !== null) {
            return user
        }
        return false
    })
