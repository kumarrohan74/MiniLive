const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const languagesSchema = new mongoose.Schema({
    thumb_url:String,
    name:String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

languagesSchema.plugin(AutoIncrement, {inc_field: 'languages_id'});
const Languages = mongoose.model('Languages', languagesSchema);

async function createLanguages(data)
{
    console.log(data)
    if(data.thumb_url && data.name)
        {
            const languages = new Languages({
                thumb_url: data.thumb_url,
                name:data.name
            });
            const result = await languages.save();
            console.log(result)
            return result;
        }
        return "Please Add All the Mandatory fields";
}

async function getLanguages()
{
    const result = await Languages.find();
    const returnObject = {
        "resultCode":100,
        "resultMessage": "Success",
        "data": result
    }
    return returnObject;
}

module.exports = {createLanguages,getLanguages}
