'use strict'

module.exports = (sequelize, DataTypes) => {
    let Tag = sequelize.define('Tag', {
        tag: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(32),
            allowNull: false,
        }
    });
    return Tag;
}