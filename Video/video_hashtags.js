const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const videoHashtagsSchema = new mongoose.Schema({
   video_id:String,
   hashtags: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

videoHashtagsSchema.plugin(AutoIncrement, {inc_field: 'video_hashtags_id'});
const VideoHashtags = mongoose.model('VideoHashtags', videoHashtagsSchema);

async function createVideoHashtags(data)
{
    if(data.video_id && data.hashtags)
        {
            const videoHashtags = new VideoHashtags({
                video_id: data.video_id,
                hashtags: data.hashtags
            });
            const result = await videoHashtags.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
}

async function getVideoHashtags()
{
    return await VideoHashtags.find();
}

module.exports = {createVideoHashtags,getVideoHashtags}
