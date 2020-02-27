
'use strict'

module.exports = (sequelize, DataTypes) => {
    let oauth_client = sequelize.define('oauth_client', {
        client_secret:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        redirect_uri:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });
    return oauth_client;
}