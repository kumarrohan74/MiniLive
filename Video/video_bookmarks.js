const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const videoBookmarkSchema = new mongoose.Schema({
    user_id:String,
    video_id: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

videoBookmarkSchema.plugin(AutoIncrement, {inc_field: 'video_bookmark_id'});
const VideoBookmark = mongoose.model('VideoBookmark', videoBookmarkSchema);

async function createVideoBookmark(data)
{
    if(data.user_id && data.video_id)
        {
            const videosBookmark = new VideoBookmark({
                user_id: data.user_id,
                video_id: data.video_id
            });
            const result = await videosBookmark.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
}

async function getVideosBookmark()
{
    return await VideoBookmark.find();
}

async function editVideoBookmark(data,id)
{
    const updateData = await VideoBookmark.updateOne({"video_bookmark_id":id},{
        "user_id": data.user_id,
                "video_id": data.video_id
    })

    if(updateData)
    {
        return await VideoBookmark.findOne({"video_bookmark_id": id})
    }
    else {
        return {"message":"Not Updated"}
    }
}

async function deleteVideoBookmark(id)
{
    if(id)
    {
        const deleteData = await VideoBookmark.deleteOne({"video_bookmark_id":id});
        return {"message":"Data Deleted"}
    }
    return {"message":"Not Deleted"}
}

module.exports = {createVideoBookmark,getVideosBookmark,editVideoBookmark,deleteVideoBookmark}
