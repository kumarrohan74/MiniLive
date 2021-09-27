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

module.exports = {createVerification,getVerification}
