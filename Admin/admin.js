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

module.exports = {createAdmin,getAdmin}
