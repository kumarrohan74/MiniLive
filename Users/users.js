const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var UsernameGenerator = require('username-generator');

const usersSchema = new mongoose.Schema({
    username:String,
    is_trending:Number,
    name: String,
    profile_pic: String,
    phone: Number,
    email: String,
    bio: String,
    languages: [],
    interests: [],
    login_type: String,
    token : String,
    firebase_token: String,
    meta: String,
    like_count: Number,
    status: Number,
    device_id:Number,
    IsSignIn:Number,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

usersSchema.plugin(AutoIncrement, {inc_field: 'user_id'});
const Users = mongoose.model('Users', usersSchema);

async function createUsers(data)
{
    // if((data.is_trending >= 0) && (data.like_count >= 0) && (data.status === 0 || data.status === 1))
    //     {
    //         const users = new Users({
    //             username:data.username,
    //             is_trending:data.is_trending,
    //             name: data.name,
    //             profile_pic: data.profile_pic,
    //             phone: data.phone,
    //             email: data.email,
    //             bio: data.bio,
    //             login_type: data.login_type,
    //             token : data.token,
    //             firebase_token: data.firebase_token,
    //             meta: data.meta,
    //             like_count: data.like_count,
    //             status: data.status
    //         });
    //         const result = await users.save();
    //         return result;
    //     }
    //     return "Please Add All the Mandatory fields";
}

async function getUsers()
{
    return await Users.find();
}

async function getUseById(data)
{
    return await Users.find({"user_id":data});
}

async function editUsers(data,id)
{
    var updateData = await Users.updateOne({"user_id": id}, {
        //"username":data.username,
                "is_trending":data.is_trending,
                "name": data.name,
                "profile_pic": data.profile_pic,
                "phone": data.phone,
                "email": data.email,
                "languages": data.languages,
                "interests": data.interests,
                "bio": data.bio,
                "login_type": data.login_type,
                "token" : data.token,
                "firebase_token": data.firebase_token,
                "meta": data.meta,
                "like_count": data.like_count,
                "status": data.status,
                "IsSignIn":1
    });
    if(updateData)
    {
        return await Users.findOne({"user_id": id});
    }
    else {
        return {"message": "Not Updated"}
        
    }
}

async function UserExists(phone)
{
    const user = await Users.findOne({"phone":phone});
    if(user)
    {
        var updateData = await Users.updateOne({"user_id": user.user_id}, {
            "IsSignIn":1
        });
        return {"user_id":user.user_id};
    }
    else {
        return false;
    }
}

async function signOut(id)
{
    if(id)
    {
        var updateData = await Users.updateOne({"user_id": id}, {
            "IsSignIn":0
        });
        return {"message": "Successfully logout"}
    }
    else {
        return {"message": "Unable to logout"}
    }
    
}

async function isSignIn(id)
{
    const user = await Users.findOne({"user_id":id});
    if(user)
    {
        if(user.IsSignIn === 1)
        {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return {"message": "User doesn't exist"};
    }
}

async function deleteUser(id)
{
    if(id)
    {
        const deleteData = await Users.deleteOne({"user":id});
        return {"message":"Data Deleted"}
    }
    return {"message":"Not Deleted"}
}

async function firstTimeUser(data)
{
    if(data.device_id)
    {
        var username = UsernameGenerator.generateUsername();
        const users = new Users({
            username:username,
            device_id:data.device_id,
            languages: data.languages,
            interests: data.interests,
            IsSignIn:0
        });
        const result = await users.save();
        return result;
    }
    else {
        return "Please Add All the Mandatory fields";
    }
}

async function getIdByDeviceId(device_id)
{
    const user = await Users.findOne({"device_id":device_id});
    if(user)
    {
        return {"user_id":user.user_id};
    }
    else {
        return {"message":"User doesnt exist"}
    }
}

module.exports = {createUsers,getUsers,getUseById,editUsers,deleteUser,firstTimeUser,UserExists,signOut,isSignIn,getIdByDeviceId}
