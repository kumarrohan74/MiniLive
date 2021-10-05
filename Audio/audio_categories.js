const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const audioCategorySchema = new mongoose.Schema({
    name: String,
    thumbnail: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

audioCategorySchema.plugin(AutoIncrement, {inc_field: 'audio_category_id'});
const AudioCategory = mongoose.model('AudioCategory', audioCategorySchema);


async function createAudioCategory(data)
{
    if(data.name && data.thumbnail)
        {
            const audioCategory = new AudioCategory({
                name: data.name,
                thumbnail: data.thumbnail,
            });
            const result = await audioCategory.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
    
 
}
async function getAudioCategory()
{
    return await AudioCategory.find();
}

async function editAudioCategory(data,id)
{
    const updateData = await AudioCategory.updateOne({"audio_category_id":id},{
        "name": data.name,
        "thumbnail": data.thumbnail,
    });
    if(updateData)
    {
        return await AudioCategory.findOne({"audio_category_id":id});
    }
    else {
        return {"message":"Not Updated"}
    }
}

async function deleteAudioCategory(id)
{
    if(id)
    {
        const deleteData = await AudioCategory.deleteOne({"audio_category_id":id});
        return {"message":"Data Deleted"}
    }
    return {"message":"Not Deleted"}
}

module.exports = {createAudioCategory,getAudioCategory,editAudioCategory,deleteAudioCategory}
