'use strict';

const Models = require('../models');
const md5 = require('md5');

module.exports={
    read: (req, res) => {
        const params = req.params;
        if (params.id){
            Models.PostsTag
            .findOne({
                where: {
                    id: params.id
                }
            })
            .then(postsTag => {
                res.json(postsTag);
            });
        }
        else{
            Models.PostsTag
            .findAll()
            .then(postsTags => {
                res.json(postsTags);
            });
        }
    },
    create: (req, res) => {
        const body = req.body;
        Models.PostsTag
        .create({
            PostId: body.post,
            TagId: body.tag,
        })
        .then(postsTag => {
            res.json(postsTag);
        });
    },
    update: (req, res) => {
        const body = req.body;
        const values = {
            PostId: body.post,
            TagId: body.tag,
        };
        const options = {
            where:{
                id: body.id
            }
        };
        
        Models.PostsTag
        .update(values, options)
        .then(() => {
            Models.PostsTag
            .findOne(options)
            .then(postsTag => {
                res.json(postsTag);
            });
        });
    },
    delete: (req, res) => {
        const params = req.params;
        Models.PostsTag
        .destroy({
            where: {
                id: params.id
            }
        })
        .then(() => {
            res.json({
                status: 'ok',
                message: 'PostsTag '+params.id+' deleted!'
            });
        });
    },
}