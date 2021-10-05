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

async function editVideoViews(data,id)
{
    const updateData = await VideoViews.updateOne({"video_views_id":id},{
        "device_id": data.device_id,
        "video_id": data.video_id
    })

    if(updateData)
    {
        return await VideoViews.findOne({"video_views_id": id})
    }
    else {
        return {"message":"Not Updated"}
    }
}

async function deleteVideoViews(id)
{
    if(id)
    {
        const deleteData = await VideoViews.deleteOne({"video_views_id":id});
        return {"message":"Data Deleted"}
    }
    return {"message":"Not Deleted"}
}

module.exports = {createVideoViews,getVideosViews,editVideoViews,deleteVideoViews}
