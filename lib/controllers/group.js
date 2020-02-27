'use strict';

const Models = require('../models');
const md5 = require('md5');

module.exports={
    read: (req, res) => {
        const params = req.params;
        if (params.id){
            Models.Group
            .findOne({
                include: [
                    { model: Models.Post, required: false }
                ],
                where: {
                    id: params.id
                }
            })
            .then(group => {
                res.json(group);
            });
        }
        else{
            Models.Group
            .findAll({
                include: [
                    { model: Models.Post, required: false }
                ],
            })
            .then(groups => {
                res.json(groups);
            });
        }
    },
    create: (req, res) => {
        const body = req.body;
        Models.Group
        .create({
            name: body.name,
            description: body.description,
            CategoryId: body.category,
        })
        .then(group => {
            res.json(group);
        });
    },
    update: (req, res) => {
        const body = req.body;
        const values = {
            name: body.name,
            description: body.description,
            CategoryId: body.category,
        };
        const options = {
            where:{
                id: body.id
            }
        };
        
        Models.Group
        .update(values, options)
        .then(() => {
            Models.Group
            .findOne(options)
            .then(group => {
                res.json(group);
            });
        });
    },
    delete: (req, res) => {
        const params = req.params;
        Models.Group
        .destroy({
            where: {
                id: params.id
            }
        })
        .then(() => {
            res.json({
                status: 'ok',
                message: 'Group '+params.id+' deleted!'
            });
        });
    },
}