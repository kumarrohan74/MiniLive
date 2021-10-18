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

async function editVideoHashtags(data,id)
{
    const updateData = await VideoHashtags.updateOne({"video_hashtags_id":id},{
        "video_id": data.video_id,
        "hashtags": data.hashtags
    })

    if(updateData)
    {
        return await VideoHashtags.findOne({"video_hashtags_id": id})
    }
    else {
        return {"message":"Not Updated"}
    }
}

async function deleteVideoHashtags(id)
{
    if(id)
    {
        const deleteData = await VideoHashtags.deleteOne({"video_hashtags_id":id});
        return {"message":"Data Deleted"}
    }
    return {"message":"Not Deleted"}
}

module.exports = {createVideoHashtags,getVideoHashtags,editVideoHashtags,deleteVideoHashtags}
