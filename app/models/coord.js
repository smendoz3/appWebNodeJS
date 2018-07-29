var mongoose = require('mongoose');

var coordSchema = new mongoose.Schema({
    username: {
	type: String,
	required: true
    },
    route: {
    type: String,
    required: true
    },
    lat: {
	type: String,
	required: true
    },
    long: {
	type: String,
	required: true
    },
    timestamp: {
    type: String
    }


},{
    versionKey: false
});

var Coord = mongoose.model('Videos',coordSchema);

module.exports = Coord;
