const express = require('express');
const createError = require('http-errors');

const Model = require('../../models/service.model');
const raceService = require('./service');

// Create a new person.
exports.create = (req, res, next) => {
    const validationErrors = new Model(req.body).validateSync();
    if (validationErrors) {
        return next(
            new createError.BadRequest(validationErrors)
        );
    }

    return raceService.create(req.body)
        .then(cp => {
            res.status(201);
            res.json(cp);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findAll = (req, res, next) => {
    return raceService.findAll()
        .then(list => {
            res.json(list);
        });
};

exports.findOne = (req, res, next) => {
    return raceService.findOne(req.params.id)
        .then(entity => {
            if (!entity) {
                return next(new createError.NotFound("Race is not found"));
            }
            return res.json(entity);
        });
};

exports.update = (req, res, next) => {
    const validationErrors = new Model(req.body).validateSync();
    if (validationErrors) {
        return next(
            new createError.BadRequest(validationErrors)
        );
    }

    return raceService.update(req.params.id, req.body)
        .then(entity => {
            res.json(entity);
        })
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
};

exports.delete = (req, res, next) => {
    return raceService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
};
