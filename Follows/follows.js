const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Videos = require('../Video/videos');
const Users = require('../Users/users');

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

async function getFollwingVideos(userId)
{
    const users = await Follows.find({"user_id":userId});
    const userArray = [];
    for(var element of users) {
        const videoUser = await Videos.Videos.find({"user_id":element.parent_id},{"like_count":1,"upvotes":1,"downvotes":1,"comment_count":1,"mp4_url":1});
        const userdetails = await Users.Users.findOne({"user_id":element.parent_id},{"name":1,"username":1});
        userArray.push({"user": userdetails, "videos": videoUser});
    }
    return userArray;
}

module.exports = {createFollows,getFollows,getFollwingVideos}
