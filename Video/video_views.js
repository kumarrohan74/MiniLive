const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const videoViewsSchema = new mongoose.Schema({
    device_id:String,
    video_id: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

videoViewsSchema.plugin(AutoIncrement, {inc_field: 'video_views_id'});
const VideoViews = mongoose.model('VideoViews', videoViewsSchema);

async function createVideoViews(data)
{
    if(data.device_id && data.video_id)
        {
            const videoViews = new VideoViews({
                device_id: data.device_id,
                video_id: data.video_id
            });
            const result = await videoViews.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
}

async function getVideosViews()
{
    return await VideoViews.find();
}

module.exports = {createVideoViews,getVideosViews}
