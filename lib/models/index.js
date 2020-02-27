'use strict';

const Fs = require('fs');
const Path = require('path');
const Sequelize = require('sequelize');
const Settings = require('../../settings');
const DataTypes = require('sequelize/lib/data-types');

// Database settings for the current environment
const dbSettings = Settings[Settings.env].db;

console.log(dbSettings);

const sequelize = new Sequelize(dbSettings.database, dbSettings.username, dbSettings.password,
  {dialect: dbSettings.dialect, storage: dbSettings.storage});
const db = {};

// Read all the files in this directory and import them as models
Fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(Path.join(__dirname, file));
    db[model.name] = model;
  });

// Associations
const User = db.User
const Post = db.Post
const Tag = db.Tag
const Category = db.Category;
const Group = db.Group;
const oauth_client = db.oauth_client;
const oauth_token = db.oauth_token;

let PostsTag = sequelize.define('PostsTag', {
  PostId: {
      type: DataTypes.INTEGER,
      references: {
      model: Post, // 'Posts' would also work
      key: 'id'
      }
  },
  TagId: {
      type: DataTypes.INTEGER,
      references: {
      model: Tag, // 'Tag' would also work
      key: 'id'
      }
  }
});

db[PostsTag.name] = PostsTag;

User.hasMany(Post);
User.hasOne(oauth_token);
oauth_client.hasMany(oauth_token);

Post.belongsToMany(Tag, { through: 'PostsTags' })
Tag.belongsToMany(Post, { through: 'PostsTags' })

Category.hasMany(Group);
Group.hasMany(Post);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
