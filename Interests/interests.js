const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const interestsSchema = new mongoose.Schema({
    thumb_url:String,
    name:String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

interestsSchema.plugin(AutoIncrement, {inc_field: 'interests_id'});
const Interests = mongoose.model('Interests', interestsSchema);

async function createInterests(data)
{
    if(data.thumb_url && data.name)
        {
            const interests = new Interests({
                thumb_url: data.thumb_url,
                name:data.name
            });
            const result = await interests.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
    
 
}

async function getInterests()
{
    const result = await Interests.find();
    const returnObject = {
        "resultCode":100,
        "resultMessage": "Success",
        "data": result
    }
    return returnObject;
}

module.exports = {createInterests,getInterests}
