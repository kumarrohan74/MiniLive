const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const audioSchema = new mongoose.Schema({
    user_id:String,
    name: String,
    audio_url: String,
    thumb_url: String,
    duration: Number,
    category: String,
    usage_count: Number,
    status: Number,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

audioSchema.plugin(AutoIncrement, {inc_field: 'audio_id'});
const Audio = mongoose.model('Audio', audioSchema);


async function createAudio(data)
{
    if(data.audio_url && data.duration && data.status && data.usage_count)
        {
            const audio = new Audio({
                user_id:data.user_id,
                name: data.name,
                audio_url: data.audio_url,
                thumb_url: data.thumb_url,
                duration: data.duration,
                category: data.category,
                usage_count: data.usage_count,
                status: data.status,
            });
            const result = await audio.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
    
 
}
async function getAudio()
{
    return await Audio.find();
}

async function editAudio(data,id)
{
    const updatedData = await Audio.updateOne({"audio_id":id}, {
                "user_id":data.user_id,
                "name": data.name,
                "audio_url": data.audio_url,
                "thumb_url": data.thumb_url,
                "duration": data.duration,
                "category": data.category,
                "usage_count": data.usage_count,
                "status": data.status,
    });
    if(updatedData)
    {
        return await Audio.findOne({"audio_id":id})
    }
    else {
        return {"message": "Not Updated"}
    }
}

async function deleteAudio(id)
{
    if(id)
    {
        const deleteData = await Audio.deleteOne({"audio_id":id});
        return {"message":"Data Deleted"}
    }
    return {"message":"Not Deleted"}
}

module.exports = {createAudio,getAudio,editAudio,deleteAudio}
