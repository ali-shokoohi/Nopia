'use strict'

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        first_name:{
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        last_name:{
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        nick_name:{
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        about:{
            type: DataTypes.TEXT,
        },
        username:{
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        date_join:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
        }

    }
    );
    return User
}