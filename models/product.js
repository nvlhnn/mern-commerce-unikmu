const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true,
        slug: 'name',
    },
    desc: {
        type: String,
        required: true,
    },
    category: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        slug: {
            type: String,
            required: true
        }
    },
    price: {
        type: Number,
        required: true
    },
    images: [String],
    data: [{
        code: {
            type: String,
            unique: true,
            required: true,
        },
        img: {
            type: String,
            required: true
        },
        hex: {
            type: String,
            required: true
        },
        colorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Color",
            required: true
        },
        stocks: [{
            size: String,
            stock: Number
        }]
    }],

}, {
    timestamps: true
});

module.exports = mongoose.model("Product", ProductSchema);