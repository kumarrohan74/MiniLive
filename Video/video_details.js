const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Distance = require('geo-distance');

const videoDetailsSchema = new mongoose.Schema({
    video_id:String,
    country: String,
    region: String,
    city: String,
    user_ip: String,
    latitude: String,
    longitude: String,
});

videoDetailsSchema.plugin(AutoIncrement, {inc_field: 'video_details_id'});
const VideoDetails = mongoose.model('VideoDetails', videoDetailsSchema);

async function createVideoDetails(data)
{
    if(data.video_id)
        {
            const videosDetails = new VideoDetails({
                video_id:data.video_id,
                country: data.country,
                region: data.region,
                city: data.city,
                user_ip: data.user_ip,
                latitude: data.latitude,
                longitude: data.longitude,
            });
            const result = await videosDetails.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
}

async function getVideosDetails()
{
    return await VideoDetails.find();
}

async function editVideosDetails(data,id)
{
    const updateData = await VideoDetails.updateOne({"video_details_id":id},{
        "video_id":data.video_id,
                "country": data.country,
                "region": data.region,
                "city": data.city,
                "user_ip": data.user_ip,
                "latitude": data.latitude,
                "longitude": data.longitude,
    })

    if(updateData)
    {
        return await VideoDetails.findOne({"video_details_id": id})
    }
    else {
        return {"message":"Not Updated"}
    }
}

async function deleteVideosDetails(id)
{
    if(id)
    {
        const deleteData = await VideoDetails.deleteOne({"video_details_id":id});
        return {"message":"Data Deleted"}
    }
    return {"message":"Not Deleted"}
}



module.exports = {createVideoDetails,getVideosDetails,editVideosDetails,deleteVideosDetails,VideoDetails}
