'use strict'

module.exports = (sequelize, DataTypes) => {
    let Group = sequelize.define('Group', {
        name: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(32),
            allowNull: false,
        }
    });
    return Group;
}