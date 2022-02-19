const Product = require('../models/product.js')


const create = async (req, res) => {
    const product = new Product(req.body);

    try {
        const savedProduct = await product.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}


const get = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        res.status(201).json(product)
    } catch (error) {
        res.status(500).json(error)

    }
}

const getAll = async (req, res) => {

    const match = {}
    const sort = {}

    if (req.query.keyword) {
        match.name = {
            $regex: req.query.keyword,
            $options: "i"
        }
    }

    if (req.query.size) {
        let sizes = req.query.size.split("&")
            .map(a => a.trim())
            .map(a => new RegExp("^" + a + "$", "i"))

        match.size = {
            $in: sizes
        }
    }

    if (req.query.color) {
        let colors = req.query.color
            .split("&")
            .map(a => a.trim())
            .map(a => new RegExp(a, "i"))

        match.color = {
            $in: colors
        }
    }

    if (req.query.minPrice) {
        let minPrice = req.query.minPrice
        match.price = {
            $gte: minPrice
        }
    }

    if (req.query.maxPrice) {
        let maxPrice = req.query.maxPrice
        match.price = {
            $lte: maxPrice
        }
    }

    if (req.query.sortBy) {
        sort[req.query.sortBy] = -1
    }


    try {
        const product = await Product.find(match, null, sort)

        res.status(200).json(product)

    } catch (error) {
        res.status(500).json(error)

    }
}


const update = async (req, res) => {

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body

        }, {
            new: true,
        })

        res.status(200).json(product)

    } catch (error) {
        res.status(500).json(error)

    }
}

const destroy = async (req, res) => {

    try {
        const product = await Product.findByIdAndDelete(req.params.id)

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