'use strict';

const Models = require('../models');
const md5 = require('md5');

module.exports={
    read: (req, res) => {
        const params = req.params;
        if (params.id){
            Models.Tag
            .findOne({
                where: {
                    id: params.id
                }
            })
            .then(tag => {
                res.json(tag);
            });
        }
        else{
            Models.Tag
            .findAll()
            .then(tags => {
                res.json(tags);
            });
        }
    },
    create: (req, res) => {
        const body = req.body;
        Models.Tag
        .create({
            tag: body.tag,
            description: body.description,
        })
        .then(tag => {
            res.json(tag);
        });
    },
    update: (req, res) => {
        const body = req.body;
        const values = {
            tag: body.tag,
            description: body.description,
        };
        const options = {
            where:{
                id: body.id
            }
        };
        
        Models.Tag
        .update(values, options)
        .then(() => {
            Models.Tag
            .findOne(options)
            .then(tag => {
                res.json(tag);
            });
        });
    },
    delete: (req, res) => {
        const params = req.params;
        Models.Tag
        .destroy({
            where: {
                id: params.id
            }
        })
        .then(() => {
            res.json({
                status: 'ok',
                message: 'Tag '+params.id+' deleted!'
            });
        });
    },
}