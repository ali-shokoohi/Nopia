'use strict'

module.exports = (sequelize, DataTypes) => {
    let Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    });
    return Post;
}