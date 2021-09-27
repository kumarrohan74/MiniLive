const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commentLikesSchema = new mongoose.Schema({
    comment_id:String,
    user_id: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date},
    deleted_at: {type: Date}
});

commentLikesSchema.plugin(AutoIncrement, {inc_field: 'comment_likes_id'});
const CommentLikes = mongoose.model('CommentLikes', commentLikesSchema);

async function createCommentLikes(data)
{
    if(data.comment_id && data.user_id)
        {
            const commentLikes = new CommentLikes({
                comment_id:data.comment_id,
                user_id: data.user_id,
            });
            const result = await commentLikes.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
    
 
}

async function getCommentLikes()
{
    return await CommentLikes.find();
}

module.exports = {createCommentLikes,getCommentLikes}
