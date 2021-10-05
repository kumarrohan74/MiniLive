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

async function editVideoReports(data,id)
{
    const updateData = await VideoReports.updateOne({"video_reports_id":id},{
        "user_id": data.user_id,
        "video_id": data.video_id
    })

    if(updateData)
    {
        return await VideoReports.findOne({"video_reports_id": id})
    }
    else {
        return {"message":"Not Updated"}
    }
}

async function deleteVideoReports(id)
{
    if(id)
    {
        const deleteData = await VideoReports.deleteOne({"video_reports_id":id});
        return {"message":"Data Deleted"}
    }
    return {"message":"Not Deleted"}
}

module.exports = {createVideoReports,getVideosReports,editVideoReports,deleteVideoReports}
