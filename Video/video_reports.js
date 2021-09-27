const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const videoReportsSchema = new mongoose.Schema({
    user_id:String,
    video_id: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

videoReportsSchema.plugin(AutoIncrement, {inc_field: 'video_reports_id'});
const VideoReports = mongoose.model('VideoReports', videoReportsSchema);

async function createVideoReports(data)
{
    if(data.user_id && data.video_id)
        {
            const videoReports = new VideoReports({
                user_id: data.user_id,
                video_id: data.video_id
            });
            const result = await videoReports.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
}

async function getVideosReports()
{
    return await VideoReports.find();
}

module.exports = {createVideoReports,getVideosReports}
