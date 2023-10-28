var mongoose = require('mongoose');

const ProductsModel = require('./products');

var CategorySchema = mongoose.Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
    },
});

CategorySchema.pre('remove', async function (next) {
    const categoryId = this._id;
    await ProductsModel.deleteMany({ category: categoryId });
    next();
});

const CategoriesModel = mongoose.model('categories', CategorySchema, 'categories');
module.exports = CategoriesModel;