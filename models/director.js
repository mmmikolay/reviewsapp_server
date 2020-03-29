const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    bio: {
        type:String,
        required:true,
    },
    photo: {
        type:String,
        required: true,
    },
    items:[
        {
            type:Schema.Types.ObjectId,
            ref:"Movie",
        }
    ]
});

module.exports = mongoose.model("Director",directorSchema);