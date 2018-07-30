var mongoose = require('mongoose');

var routeSchema = new mongoose.Schema({
    username: {
	   type: String,
	   required: true
    },
    lat: {
        type: Array,
	    required: true
    },
    long: {
	    type: Array,
        required: true
    },

},{
    versionKey: false
});

var Route = mongoose.model('Route',routeSchema);

module.exports = Route;
