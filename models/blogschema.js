const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
    {
        title: String,
        description: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

const blog = mongoose.model('Blog', blogSchema);

module.exports = blog;