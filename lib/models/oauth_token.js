
'use strict'

module.exports = (sequelize, DataTypes) => {
    let oauth_token = sequelize.define('oauth_token', {
        access_token:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        access_token_expires_on:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        refresh_token:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        refresh_token_expires_on:{
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
    return oauth_token;
}