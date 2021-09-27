const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const likesSchema = new mongoose.Schema({
    video_id:String,
    user_id:String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

likesSchema.plugin(AutoIncrement, {inc_field: 'likes_id'});
const Likes = mongoose.model('Likes', likesSchema);

async function createLikes(data)
{
    if(data.video_id && data.user_id)
        {
            const likes = new Likes({
                video_id: data.video_id,
                user_id:  data.user_id
            });
            const result = await likes.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
}

async function getLikes()
{
    return await Likes.find();
}

module.exports = {createLikes,getLikes}
