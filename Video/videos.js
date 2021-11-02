const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const VideoDetails = require('../Video/video_details');

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
                mp4_url: data.mp4_url,
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
            const videoDetailsData = {
                "video_id": result.video_id,
                "country": data.country,
                "region": data.region,
                "city": data.city,
                "user_ip": data.user_ip,
                "latitude": data.latitude,
                "longitude": data.longitude,
            }
            const createDetails = await VideoDetails.createVideoDetails(videoDetailsData);
            return result;
        }
        return "Please Add All the Mandatory fields";
}

async function getVideos()
{
    return await Videos.find();
}

async function getUserVideos(data)
{
    const getVideo = await Videos.find({"user_id": data});
    return getVideo;
}

async function editVideos(data,id)
{
    const updateData = await Videos.updateOne({"video_id":id},{
        user_id: data.user_id,
                "video_path":data.video_path,
                "mp4_url": data.mp4_url,
                "video_thumbnail": data.video_thumbnail,
                "trending": data.trending,
                "audio_id": data.audio_id,
                "use_audio": data.use_audio,
                "description": data.description,
                "hashtags" : data.hashtags,
                "video_tag": data.video_tag,
                "language_id": data.language_id,
                "category_id": data.category_id,
                "challenge_id": data.challenge_id,
                "challenge_name": data.challenge_name,
                "sub_category_id": data.sub_category_id,
                "is_viewed": data.is_viewed,
                "like_count": data.like_count,
                "comment_count": data.comment_count,
                "share_count": data.share_count,
                "view_count": data.view_count,
                "view_duration": data.view_duration,
                "upvotes": data.upvotes,
                "downvotes": data.downvotes,
                "rating": data.rating,
                "report_count": data.report_count,
                "file_size": data.file_size,
                "status": data.status,
                "dash_status": data.dash_status,
                "mp4_status": data.mp4_status,
                "parent_video_id": data.parent_video_id
    })

    if(updateData)
    {
        return await Videos.findOne({"video_id": id})
    }
    else {
        return {"message":"Not Updated"}
    }
}

async function deleteVideos(id)
{
    if(id)
    {
        const deleteData = await Videos.deleteOne({"video_id":id});
        return {"message":"Data Deleted"}
    }
    return {"message":"Not Deleted"}
}

async function recommendedVideos()
{
    const data = [];
    const videos = await Videos.find().sort({created_at:-1});
    const map = new Map();
    videos.forEach(element => {
        var points = (element.share_count * 6) + (element.comment_count * 4) + (element.like_count * 2);
        map.set(element.video_id,points); 

    });
    const mapSort1 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    for (var [key, value] of mapSort1) {
        const video = await Videos.findOne({"video_id":key},{"like_count":1,"upvotes":1,"downvotes":1,"comment_count":1,"mp4_url":1});
        data.push(video);
    }
    const returnObject = {
        "resultCode":100,
        "resultMessage": "Success",
        "data": data
    }
    return returnObject;
}

module.exports = {createVideos,getVideos,getUserVideos,editVideos,deleteVideos,Videos,recommendedVideos}
