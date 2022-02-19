const Category = require('../models/category.js')
const Product = require('../models/product.js')


const create = async (req, res) => {
    const category = new Category(req.body);

    try {
        const savedCategory = await category.save();
        res.status(200).json(savedCategory);
    } catch (err) {
        res.status(500).json(err);
    }
}


const get = async (req, res) => {
    try {
        const category = await Category.findOne({
            slug: req.params.slug
        })
        const products = await Product.find({
            'category.id': category.id
        }, '-category')


        res.status(201).json({
            category: category,
            products: products
        })
    } catch (error) {
        res.status(500).json(error)

    }
}

const getAll = async (req, res) => {

    try {
        const category = await Category.find(null, null, {
            name: 1
        })

        res.status(200).json(category)

    } catch (error) {
        res.status(500).json(error)

    }
}


const update = async (req, res) => {

    try {
        const category = await Category.findByIdAndUpdate(req.params.id, {
            $set: req.body

        }, {
            new: true,
        })

        res.status(200).json(category)

    } catch (error) {
        res.status(500).json(error)

    }
}

const destroy = async (req, res) => {

    try {
        const category = await Category.findByIdAndDelete(req.params.id)

        res.status(200).json("data has been deleted")

    } catch (error) {
        res.status(500).json(error)

    }
}

module.exports = {
    create,
    get,
    getAll,
    update,
    destroy
}