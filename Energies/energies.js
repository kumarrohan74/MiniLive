const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const energiesSchema = new mongoose.Schema({
    energisable_type:String,
    energisable_id: String,
    amount: Number,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

energiesSchema.plugin(AutoIncrement, {inc_field: 'energies_id'});
const Energies = mongoose.model('Energies', energiesSchema);

async function createEnergies(data)
{
            const energies = new Energies({
                energisable_type:data.energisable_type,
                energisable_id: data.energisable_id,
                amount: data.amount,
            });
            const result = await energies.save();
            return result;
        
    
 
}

async function getEnergies()
{
    return await Energies.find();
}

async function editEnergies(data,id)
{
    const updateData = await Energies.updateOne({"energies_id":id},{
        "energisable_type":data.energisable_type,
                "energisable_id": data.energisable_id,
                "amount": data.amount,
    })

    if(updateData)
    {
        return await Energies.findOne({"energies_id": id})
    }
    else {
        return {"message":"Not Updated"}
    }
}

async function deleteEnergies(id)
{
    if(id)
    {
        const deleteData = await Energies.deleteOne({"energies_id":id});
        return {"message":"Data Deleted"}
    }
    return {"message":"Not Deleted"}
}

module.exports = {createEnergies,getEnergies,editEnergies,deleteEnergies}
