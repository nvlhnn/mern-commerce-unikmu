const Color = require('../models/color.js')

const create = async (req, res) => {
    const color = new Color(req.body);

    try {
        const savedColor = await color.save();
        res.status(200).json(savedColor);
    } catch (err) {
        res.status(500).json(err);
    }
}


const get = async (req, res) => {
    try {
        const color = await Color.findById(req.params.id) 
        res.status(201).json(color)
    } catch (error) {
        res.status(500).json(error)

    }
}

const getAll = async (req, res) => {

    try {
        const color = await Color.find(null, null, {
            name: 1,
            hex: 1
        })

        res.status(200).json(color)

    } catch (error) {
        res.status(500).json(error)

    }
}


const update = async (req, res) => {

    try {
        const color = await Color.findByIdAndUpdate(req.params.id, {
            $set: req.body

        }, {
            new: true,
        })

        res.status(200).json(color)

    } catch (error) {
        res.status(500).json(error)

    }
}

const destroy = async (req, res) => {

    try {
        await Color.findByIdAndDelete(req.params.id)

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