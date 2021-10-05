const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const appLogSchema = new mongoose.Schema({
    version_code: Number,
    log_type: String,
    page: String,
    message: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

appLogSchema.plugin(AutoIncrement, {inc_field: 'app_log_id'});
const AppLog = mongoose.model('AppLog', appLogSchema);


async function createAppLog(data)
{
    if(data.message)
        {
            const applog = new AppLog({
                version_code: data.version_code,
                log_type: data.log_type,
                page: data.page,
                message: data.message,
            });
            const result = await applog.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
    
 
}
async function getAppLog()
{
    return await AppLog.find();
}



module.exports = {createAppLog,getAppLog}
