const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const challengeRewardSchema = new mongoose.Schema({
    challenge_id: Number,
    meta: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

challengeRewardSchema.plugin(AutoIncrement, {inc_field: 'challenge_reward_id'});
const ChallengeReward = mongoose.model('ChallengeReward', challengeRewardSchema);


async function createChallengeReward(data)
{
    if(data.challenge_id && data.meta)
        {
            const challengeReward = new ChallengeReward({
                challenge_id: data.challenge_id,
                meta: data.meta,
            });
            const result = await challengeReward.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
    
 
}
async function getChallengeReward()
{
    return await ChallengeReward.find();
}

module.exports = {createChallengeReward,getChallengeReward}
