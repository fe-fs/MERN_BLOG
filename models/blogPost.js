const mongoose = require('mongoose');

//Blog Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema ({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
});

//Model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

//export model to be used anywhere
module.exports = BlogPost;

