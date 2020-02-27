'use strict';

const Models = require('../models');
const md5 = require('md5');

module.exports={
    read: (req, res) => {
        const params = req.params;
        if (params.id){
            Models.Category
            .findOne({
                include: [
                    { model: Models.Group, required: false, include: [{model: Models.Post, required: false}] }
                ],
                where: {
                    id: params.id
                }
            })
            .then(category => {
                res.json(category);
            });
        }
        else{
            Models.Category
            .findAll({
                include: [
                    { model: Models.Group, required: false, include: [{model: Models.Post, required: false}] }
                ],
            })
            .then(categorys => {
                res.json(categorys);
            });
        }
    },
    create: (req, res) => {
        const body = req.body;
        Models.Category
        .create({
            name: body.name,
            description: body.description,
        })
        .then(category => {
            res.json(category);
        });
    },
    update: (req, res) => {
        const body = req.body;
        const values = {
            name: body.name,
            description: body.description,
        };
        const options = {
            where:{
                id: body.id
            }
        };
        
        Models.Category
        .update(values, options)
        .then(() => {
            Models.Category
            .findOne(options)
            .then(category => {
                res.json(category);
            });
        });
    },
    delete: (req, res) => {
        const params = req.params;
        Models.Category
        .destroy({
            where: {
                id: params.id
            }
        })
        .then(() => {
            res.json({
                status: 'ok',
                message: 'Category '+params.id+' deleted!'
            });
        });
    },
}