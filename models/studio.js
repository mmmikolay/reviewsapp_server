const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studioSchema = new Schema({
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
            ref:"Game",
        }
    ]
});

module.exports = mongoose.model("Studio",studioSchema);