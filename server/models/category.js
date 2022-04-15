const mongoose = require('mongoose');

const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    images: [{
        img: String,
        desc: String
    }],
    slug: {
        type: String,
        unique: true,
        slug: 'name',
    },

});

module.exports = mongoose.model('Category', categorySchema);