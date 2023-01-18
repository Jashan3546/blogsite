const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
        comment: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    },
    {
        timestamps: true
    }
)

const comment = mongoose.model('Comment', commentSchema);

module.exports = comment;