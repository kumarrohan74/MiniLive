const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const videosSchema = new mongoose.Schema({
    user_id:String,
    video_path:String,
    mp4_url: String,
    video_thumbnail: String,
    trending: Number,
    audio_id: Number,
    use_audio: Number,
    description: String,
    hashtags : String,
    video_tag: String,
    language_id: String,
    category_id: Number,
    challenge_id: Number,
    challenge_name: String,
    sub_category_id: String,
    is_viewed: Number,
    like_count: Number,
    comment_count: Number,
    share_count: Number,
    view_count: Number,
    view_duration: Number,
    upvotes: Number,
    downvotes: Number,
    rating: Number,
    report_count: Number,
    file_size: Number,
    status: Number,
    dash_status: Number,
    mp4_status: Number,
    parent_video_id: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

videosSchema.plugin(AutoIncrement, {inc_field: 'video_id'});
const Videos = mongoose.model('Videos', videosSchema);

async function createVideos(data)
{
    if(data.user_id)
        {
            const videos = new Videos({
                user_id: data.user_id,
                video_path:data.video_path,
                mp4_url: data.mp4_status,
                video_thumbnail: data.video_thumbnail,
                trending: data.trending,
                audio_id: data.audio_id,
                use_audio: data.use_audio,
                description: data.description,
                hashtags : data.hashtags,
                video_tag: data.video_tag,
                language_id: data.language_id,
                category_id: data.category_id,
                challenge_id: data.challenge_id,
                challenge_name: data.challenge_name,
                sub_category_id: data.sub_category_id,
                is_viewed: data.is_viewed,
                like_count: data.like_count,
                comment_count: data.comment_count,
                share_count: data.share_count,
                view_count: data.view_count,
                view_duration: data.view_duration,
                upvotes: data.upvotes,
                downvotes: data.downvotes,
                rating: data.rating,
                report_count: data.report_count,
                file_size: data.file_size,
                status: data.status,
                dash_status: data.dash_status,
                mp4_status: data.mp4_status,
                parent_video_id: data.parent_video_id
            });
            const result = await videos.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
}

async function getVideos()
{
    return await Videos.find();
}

module.exports = {createVideos,getVideos}
