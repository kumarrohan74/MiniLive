const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const videoCategoryUsersSchema = new mongoose.Schema({
    device_id:String,
    categories: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

videoCategoryUsersSchema.plugin(AutoIncrement, {inc_field: 'video_category_user_id'});
const Videocategoryusers = mongoose.model('Videocategoryusers', videoCategoryUsersSchema);

async function createVideocategoryUser(data)
{
    if(data.device_id && data.categories)
        {
            const videoCategoryUser = new Videocategoryusers({
                device_id: data.device_id,
                categories: data.categories
            });
            const result = await videoCategoryUser.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
}

async function getVideoCategoryUser()
{
    return await Videocategoryusers.find();
}

async function editVideoCategoryUser(data,id)
{
    const updateData = await Videocategoryusers.updateOne({"video_category_user_id":id},{
        "device_id": data.device_id,
                "categories": data.categories
    })

    if(updateData)
    {
        return await Videocategoryusers.findOne({"video_category_user_id": id})
    }
    else {
        return {"message":"Not Updated"}
    }
}

async function deleteVideoCategoryUser(id)
{
    if(id)
    {
        const deleteData = await Videocategoryusers.deleteOne({"video_category_user_id":id});
        return {"message":"Data Deleted"}
    }
    return {"message":"Not Deleted"}
}

module.exports = {createVideocategoryUser,getVideoCategoryUser,editVideoCategoryUser,deleteVideoCategoryUser}
