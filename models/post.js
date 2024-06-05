const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    body : {
        type : String,
        required : false,
        default : "Lorem ipsum",
    },
    tags : {
        type : Array,
        required : false,
        default : [],
    },
    userId : {
        type : mongoose.Types.ObjectId,     // Mongoose Id Type
        ref : "users",      // Connection established between POST and USER.
    },
},
{
    timestamps : true,
});

const postsModel = mongoose.model("posts", postSchema);

module.exports = postsModel;