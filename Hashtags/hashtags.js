const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const hashtagsSchema = new mongoose.Schema({
    name:String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

hashtagsSchema.plugin(AutoIncrement, {inc_field: 'hashtags_id'});
const Hashtags = mongoose.model('Hashtags', hashtagsSchema);

async function createHashtags(data)
{
    if(data.name)
        {
            const hashtags = new Hashtags({
                name:String
            });
            const result = await hashtags.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
    
 
}

async function getHashtags()
{
    return await Hashtags.find();
}

module.exports = {createHashtags,getHashtags}
