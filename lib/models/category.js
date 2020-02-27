'use strict'

module.exports = (sequelize, DataTypes) => {
    let Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(32),
            allowNull: false,
        }
    });
    return Category;
}