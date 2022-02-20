/* eslint-disable no-undef */
const User = require('../models/user.js')
const CryptoJS = require('crypto-js')

const getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error)

    }
}

const getAll = async (req, res) => {
    try {
        const users = await User.find({
            id: {
                $ne: req.user.id
            }
        }, '-password')

        res.status(200).json(users)

    } catch (error) {
        res.status(500).json(error)

    }
}

const getStat = async (req, res) => {
    try {
        const user = await User.findById(req.user.id, '-password')

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)

    }
}

const update = async (req, res) => {

    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try {
        const user = await User.findByIdAndUpdate(req.user.id, {
            $set: req.body

        }, {
            new: true,
            runValidators: true
        })

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)

    }
}

module.exports = {
    getById,
    getAll,
    getStat,
    update
}