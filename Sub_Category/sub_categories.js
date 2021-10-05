const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const subcategorySchema = new mongoose.Schema({
    category_id:String,
    name: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

subcategorySchema.plugin(AutoIncrement, {inc_field: 'subcategory_id'});
const SubCategory = mongoose.model('SubCategory', subcategorySchema);


async function createSubCategory(data)
{
    if(data.name && data.category_id)
        {
            const subcategory = new SubCategory({
                category_id: data.category_id,
                name: data.name
            });
            const result = await subcategory.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
}

async function getSubCategory()
{
    return await SubCategory.find();
}

async function editSubCategory(data,id)
{
    const updateData = await SubCategory.updateOne({"subcategory_id":id},{
        "category_id": data.category_id,
                "name": data.name
    })

    if(updateData)
    {
        return await SubCategory.findOne({"subcategory_id": id})
    }
    else {
        return {"message":"Not Updated"}
    }
}

async function deleteSubCategory(id)
{
    if(id)
    {
        const deleteData = await SubCategory.deleteOne({"subcategory_id":id});
        return {"message":"Data Deleted"}
    }
    return {"message":"Not Deleted"}
}

module.exports = {createSubCategory,getSubCategory,editSubCategory,deleteSubCategory}
