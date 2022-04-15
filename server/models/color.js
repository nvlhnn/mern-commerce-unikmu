const mongoose = require('mongoose');

const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    hex: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        slug: 'name',
    },

});

module.exports = mongoose.model('Color', colorSchema);