'use strict';

const Models = require('../models/');
const md5 = require('md5');

module.exports={
    read: (req, res) => {
        const params = req.params;
        if (params.id){
            Models.User
            .findOne({
                include: [
                    { model: Models.Post, required: false }
                ],
                where: {
                    id: params.id
                }
            })
            .then(user => {
                user.password = '******';
                res.json(user);
            });
        }
        else{
            Models.User
            .findAll({
                include: [
                    { model: Models.Post, required: false }
                ]
            })
            .then(users => {
                res.json(users);
            });
        }
    },
    create: (req, res) => {
        const body = req.body;
        const password = md5(body.password);
        Models.User
        .create({
            first_name: body.first_name,
            last_name: body.last_name,
            nick_name: body.nick_name,
            age: body.age,
            email: body.email,
            about: body.about,
            username: body.username,
            password: password,
        })
        .then(user => {
            res.json(user);
        });
    },
    update: (req, res) => {
        const body = req.body;
        const password = md5(body.password);
        const values = {
            first_name: body.first_name,
            last_name: body.last_name,
            nick_name: body.nick_name,
            age: body.age,
            email: body.email,
            about: body.about,
            username: body.username,
            password: password,
        };
        const options = {
            where:{
                id: body.id
            }
        };
        
        Models.User
        .update(values, options)
        .then(() => {
            Models.User
            .findOne(options)
            .then(user => {
                res.json(user);
            });
        });
    },
    delete: (req, res) => {
        const params = req.params;
        Models.User
        .destroy({
            where: {
                id: params.id
            }
        })
        .then(() => {
            res.json({
                status: 'ok',
                message: 'User '+params.id+' deleted!'
            });
        });
    },
}