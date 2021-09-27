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

module.exports = {createCategory,getCategory}
