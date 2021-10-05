const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const challengesSchema = new mongoose.Schema({
    user_id: String,
    name: String,
    details: String,
    thumb: String,
    status: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

challengesSchema.plugin(AutoIncrement, {inc_field: 'challenge_id'});
const Challenge = mongoose.model('Challenge', challengesSchema);


async function createChallenge(data)
{
    if(data.name && data.user_id && data.status && data.details)
        {
            const challenge = new Challenge({
                user_id: data.user_id,
                name: data.name,
                details: data.details,
                thumb: data.thumb,
                status: data.status,
            });
            const result = await challenge.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
    
 
}
async function getChallenge()
{
    return await Challenge.find();
}

async function editChallenge(data,id)
{
    const updateData = await Challenge.updateOne({"challenge_id":id},{
        "user_id": data.user_id,
                "name": data.name,
                "details": data.details,
                "thumb": data.thumb,
                "status": data.status,
    })

    if(updateData)
    {
        return await Challenge.findOne({"challenge_id": id})
    }
    else {
        return {"message":"Not Updated"}
    }
}

async function deleteChallengeReward(id)
{
    if(id)
    {
        const deleteData = await Challenge.deleteOne({"challenge_id":id});
        return {"message":"Data Deleted"}
    }
    return {"message":"Not Deleted"}
}

module.exports = {createChallenge,getChallenge}
