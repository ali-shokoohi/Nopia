'use strict';

const User = require('./controllers/user');
const Post = require('./controllers/post');
const Tag = require('./controllers/tag');
const PostsTag = require('./controllers/postsTag');
const Category = require('./controllers/category');
const Group = require('./controllers/group');
const oauth = require('./oauth2');
const express = require('express');
const router = express.Router();

router.oauth = oauth;

router.get('/post', (req, res) => {
  Post.read(req, res);
})
router.get('/post/:id', (req, res) => {
  Post.read(req, res);
})
router.post('/post', (req, res) => {
  Post.create(req, res);
})
router.put('/post/:id', (req, res) => {
  Post.update(req, res);
})
router.delete('/post/:id', (req, res) => {
  Post.delete(req, res);
})

router.get('/user/:id', (req, res) => {
  User.read(req, res);
})
/*
router.get('/user', (req, res) => {
  User.read(req, res);
})
router.post('/user', (req, res) => {
  User.create(req, res);
})
router.put('/user/:id', (req, res) => {
  User.update(req, res);
})
router.delete('/user/:id', (req, res) => {
  User.delete(req, res);
})
*/


router.get('/tag', (req, res) => {
  Tag.read(req, res);
})
router.get('/tag/:id', (req, res) => {
  Tag.read(req, res);
})
router.post('/tag', (req, res) => {
  Tag.create(req, res);
})
router.put('/tag/:id', (req, res) => {
  Tag.update(req, res);
})
router.delete('/tag/:id', (req, res) => {
  Tag.delete(req, res);
})

router.get('/posts-tag', (req, res) => {
  PostsTag.read(req, res);
})
router.get('/posts-tag/:id', (req, res) => {
  PostsTag.read(req, res);
})
router.post('/posts-tag', (req, res) => {
  PostsTag.create(req, res);
})
router.put('/posts-tag/:id', (req, res) => {
  PostsTag.update(req, res);
})
router.delete('/posts-tag/:id', (req, res) => {
  PostsTag.delete(req, res);
})

router.get('/category', (req, res) => {
  Category.read(req, res);
})
router.get('/category/:id', (req, res) => {
  Category.read(req, res);
})
router.post('/category', (req, res) => {
  Category.create(req, res);
})
router.put('/category/:id', (req, res) => {
  Category.update(req, res);
})
router.delete('/category/:id', (req, res) => {
  Category.delete(req, res);
})

router.get('/group', (req, res) => {
  Group.read(req, res);
})
router.get('/group/:id', (req, res) => {
  Group.read(req, res);
})
router.post('/group', (req, res) => {
  Group.create(req, res);
})
router.put('/group/:id', (req, res) => {
  Group.update(req, res);
})
router.delete('/group/:id', (req, res) => {
  Group.delete(req, res);
})

// Post token.
router.post('/oauth/token', router.oauth.token());

// Get authorization.
router.get('/oauth/authorize', function(req, res) {
  // Redirect anonymous users to login page.
  if (!req.app.locals.user) {
    return res.redirect(util.format('/login?redirect=%s&client_id=%s&redirect_uri=%s', req.path, req.query.client_id, req.query.redirect_uri));
  }

  return res.render('authorize', {
    client_id: req.query.client_id,
    redirect_uri: req.query.redirect_uri
  });
});

// Post authorization.
router.post('/oauth/authorize', function(req, res) {
  // Redirect anonymous users to login page.
  if (!req.app.locals.user) {
    return res.redirect(util.format('/login?client_id=%s&redirect_uri=%s', req.query.client_id, req.query.redirect_uri));
  }

  return router.oauth.authorize();
});

// Get login.
router.get('/login', function(req, res) {
  return res.render('login', {
    redirect: req.query.redirect,
    client_id: req.query.client_id,
    redirect_uri: req.query.redirect_uri
  });
});

// Post login.
router.post('/login', function(req, res) {
  // @TODO: Insert your own login mechanism.
  if (req.body.email !== 'thom@nightworld.com') {
    return res.render('login', {
      redirect: req.body.redirect,
      client_id: req.body.client_id,
      redirect_uri: req.body.redirect_uri
    });
  }

  // Successful logins should send the user back to /oauth/authorize.
  var path = req.body.redirect || '/home';

  return res.redirect(util.format('/%s?client_id=%s&redirect_uri=%s', path, req.query.client_id, req.query.redirect_uri));
});

// Get secret.
router.get('/secret', router.oauth.authenticate(), function(req, res) {
  // Will require a valid access_token.
  res.send('Secret area');
});

router.get('/public', function(req, res) {
  // Does not require an access_token.
  res.send('Public area');
});

module.exports = router
