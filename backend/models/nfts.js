/* eslint-disable no-undef */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NFTSchema = new Schema({
    no: {
        type: Number,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },

    image: {  type: String },
    description: { type: String },
    ownerwallet : { type: String },

}, { timestamps: { uploadedAt: 'created_at' } });

module.exports = NFT = mongoose.model('NFTs', NFTSchema)
