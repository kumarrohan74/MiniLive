const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    remember_token: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

adminSchema.plugin(AutoIncrement, {inc_field: 'admin_id'});
const Admin = mongoose.model('Admin', adminSchema);


async function createAdmin(data)
{
    if(data.name && data.email && data.password)
        {
            const admin = new Admin({
                name: data.name,
                email: data.email,
                password: data.password,
                remember_token: data.remember_token,
            });
            const result = await admin.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
}

async function getAdmin()
{
    return await Admin.find();
}

async function editAdmin(data,id)
{
    const updateData = await Admin.updateOne({"admin_id":id},{
        "name": data.name,
        "email": data.email,
        "password": data.password,
        "remember_token": data.remember_token,
    })

    if(updateData)
    {
        return await Admin.findOne({"admin_id": id})
    }
    else {
        return {"message":"Not Updated"}
    }
}

async function deleteAdmin(id)
{
    if(id)
    {
        const deleteData = await Admin.deleteOne({"admin_id":id});
        return {"message":"Data Deleted"}
    }
    return {"message":"Not Deleted"}
}

module.exports = {createAdmin,getAdmin,editAdmin,deleteAdmin}
