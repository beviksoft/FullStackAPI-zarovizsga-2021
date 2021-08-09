// 1. Feladat: pótold a service modellt.
const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    since: {
        type: Number,
        default: 0,
        required: true
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timeStamps: true
});

