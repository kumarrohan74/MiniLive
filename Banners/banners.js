const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const bannerSchema = new mongoose.Schema({
    img_url:String,
    name: String,
    action: String,
    type: String,
    status: Number,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

bannerSchema.plugin(AutoIncrement, {inc_field: 'banner_id'});
const Banner = mongoose.model('Banner', bannerSchema);


async function createBanner(data)
{
    if(data.name && data.img_url && data.action && data.type && data.status)
        {
            const banner = new Banner({
                img_url:data.img_url,
                name: data.name,
                action: data.action,
                type: data.type,
                status: data.status,
            });
            const result = await banner.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
    
 
}
async function getBanner()
{
    return await Banner.find();
}

async function editBanner(data,id)
{
    const updatedData = await Banner.updateOne({"banner_id":id}, {
                "img_url":data.img_url,
                "name": data.name,
                "action": data.action,
                "type": data.type,
                "status": data.status,
    })
    if(updatedData)
    {
        return await Banner.findOne({"banner_id":id})
    }
    else {
        return {"message":"Not Updated"}
    }
}

async function deleteBanner(id)
{
    if(id)
    {
        const deleteData = await Banner.deleteOne({"banner_id":id});
        return {"message":"Data Deleted"}
    }
    return {"message":"Not Deleted"}
}

module.exports = {createBanner,getBanner,editBanner,deleteBanner}
