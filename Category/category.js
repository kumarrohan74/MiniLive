const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const categorySchema = new mongoose.Schema({
    name: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

categorySchema.plugin(AutoIncrement, {inc_field: 'category_id'});
const Category = mongoose.model('Category', categorySchema);


async function createCategory(data)
{
    if(data.name)
        {
            const category = new Category({
                name: data.name
            });
            const result = await category.save();
            return result;
        }
        return "Please Add All the Mandatory fields";
    
 
}
async function getCategory()
{
    return await Category.find();
}

async function editCategory(data,id)
{
    const updateData = await Category.updateOne({"category_id":id},{
        "name": data.name,
    })

    if(updateData)
    {
        return await Category.findOne({"category_id": id})
    }
    else {
        return {"message":"Not Updated"}
    }
}

async function deleteCategory(id)
{
    if(id)
    {
        const deleteData = await Category.deleteOne({"category_id":id});
        return {"message":"Data Deleted"}
    }
    return {"message":"Not Deleted"}
}

module.exports = {createCategory,getCategory,editCategory,deleteCategory}
