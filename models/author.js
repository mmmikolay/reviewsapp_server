const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
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
            ref:"Book",
        }
    ]
});

module.exports = mongoose.model("Author",authorSchema);