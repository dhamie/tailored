const mongoose = require('mongoose')
const Inc = require("mongoose-sequence");
var AutoIncrement = Inc(mongoose);

const locationSchema = mongoose.Schema({
    locationId: {
        type: Number,
        required: true
    },
    location_name: {
        type: String,
        required: true
    },
    plans: {
        type: [Number],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },   
    details: {
        type: String,
        required: true,
        ref: 'Details'
    }
});

locationSchema.plugin(AutoIncrement, {inc_field: "locationId", disable_hooks: true});

module.exports = mongoose.model('LocationTable', locationSchema, 'locationtable');

// details: {
//     type: mongoose.SchemaTypes.ObjectId,
//     required: true,
//     ref: 'Details'
// }