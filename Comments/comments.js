const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commentSchema = new mongoose.Schema({
    video_id:String,
    user_id: String,
    content: String,
    parent_id: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date},
    deleted_at: {type: Date}
});

commentSchema.plugin(AutoIncrement, {inc_field: 'comment_id'});
const Comment = mongoose.model('Comment', commentSchema);

async function createComment(data)
{
    if(data.video_id && data.user_id && data.content)
        {
            const comment = new Comment({
                video_id:data.video_id,
                user_id: data.user_id,
                content: data.content,
                parent_id: data.parent_id,
            });
            const result = await comment.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
    
 
}

async function getComment()
{
    return await Comment.find();
}

module.exports = {createComment,getComment}
