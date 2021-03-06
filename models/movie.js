const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    header: {
        type: String,
        required: true,
    },
    detailsPhoto: {
        type: String,
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref:"Director"
    },
});

module.exports = mongoose.model("Movie",movieSchema);