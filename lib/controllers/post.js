'use strict';

const Models = require('../models');
const md5 = require('md5');

module.exports={
    read: (req, res) => {
        const params = req.params;
        if (params.id){
            Models.Post
            .findOne({
                where: {
                    id: params.id
                },
                include: [{ all: true }],
            })
            .then(post => {
                res.json(post);
            });
        }
        else{
            Models.Post
            .findAll({
                include: [{ all: true }],
            })
            .then(posts => {
                res.json(posts);
            });
        }
    },
    create: (req, res) => {
        const body = req.body;
        Models.Post
        .create({
            title: body.title,
            content: body.content,
            UserId: body.author,
            GroupId: body.group,
        })
        .then(post => {
            res.json(post);
        });
    },
    update: (req, res) => {
        const body = req.body;
        const values = {
            title: body.title,
            content: body.content,
            UserId: body.author,
            GroupId: body.group,
        };
        const options = {
            where:{
                id: body.id
            }
        };
        
        Models.Post
        .update(values, options)
        .then(() => {
            Models.Post
            .findOne(options)
            .then(post => {
                res.json(post);
            });
        });
    },
    delete: (req, res) => {
        const params = req.params;
        Models.Post
        .destroy({
            where: {
                id: params.id
            }
        })
        .then(() => {
            res.json({
                status: 'ok',
                message: 'Post '+params.id+' deleted!'
            });
        });
    },
}