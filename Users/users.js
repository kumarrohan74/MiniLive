const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const usersSchema = new mongoose.Schema({
    username:String,
    is_trending:Number,
    name: String,
    profile_pic: String,
    phone: Number,
    email: String,
    bio: String,
    login_type: String,
    token : String,
    firebase_token: String,
    meta: String,
    like_count: Number,
    status: Number,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

usersSchema.plugin(AutoIncrement, {inc_field: 'user_id'});
const Users = mongoose.model('Users', usersSchema);

async function createUsers(data)
{
    if(data.is_trending && data.like_count && data.status)
        {
            const users = new Users({
                username:data.username,
                is_trending:data.is_trending,
                name: data.name,
                profile_pic: data.profile_pic,
                phone: data.phone,
                email: data.email,
                bio: data.bio,
                login_type: data.login_type,
                token : data.token,
                firebase_token: data.firebase_token,
                meta: data.meta,
                like_count: data.like_count,
                status: data.status
            });
            const result = await users.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
}

async function getUsers()
{
    return await Users.find();
}

module.exports = {createUsers,getUsers}
