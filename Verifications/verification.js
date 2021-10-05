const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const verificationSchema = new mongoose.Schema({
   user_id:String,
   otp: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

verificationSchema.plugin(AutoIncrement, {inc_field: 'verification_id'});
const Verification = mongoose.model('Verification', verificationSchema);

async function createVerification(data)
{
    if(data.user_id && data.otp)
        {
            const verification = new Verification({
                user_id: data.user_id,
                otp: data.otp
            });
            const result = await verification.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
}

async function getVerification()
{
    return await Verification.find();
}

async function editVerification(data,id)
{
    const updateData = await Verification.updateOne({"verification_id":id},{
        "user_id": data.user_id,
                "otp": data.otp
    })

    if(updateData)
    {
        return await Verification.findOne({"verification_id": id})
    }
    else {
        return {"message":"Not Updated"}
    }
}

async function deleteVerification(id)
{
    if(id)
    {
        const deleteData = await Verification.deleteOne({"verification_id":id});
        return {"message":"Data Deleted"}
    }
    return {"message":"Not Deleted"}
}

module.exports = {createVerification,getVerification,editVerification,deleteVerification}
