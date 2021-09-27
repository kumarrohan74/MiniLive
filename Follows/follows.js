const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const followsSchema = new mongoose.Schema({
    parent_id:String,
    user_id: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

followsSchema.plugin(AutoIncrement, {inc_field: 'follows_id'});
const Follows = mongoose.model('Follows', followsSchema);

async function createFollows(data)
{
    if(data.parent_id && data.user_id)
        {
            const follows = new Follows({
                parent_id:data.parent_id,
                user_id: data.user_id
            });
            const result = await follows.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
    
 
}

async function getFollows()
{
    return await Follows.find();
}

module.exports = {createFollows,getFollows}
