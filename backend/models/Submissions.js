/* eslint-disable no-undef */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const SubmissionsSchema = new Schema({
    no: {
        type: Number,
        required: false
    },


    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    questid: {
        type: Schema.Types.ObjectId,
        ref: 'Quest'
    },

    answers:
    {
        type: String,
    },

    verified: {
        type: Boolean,
        default: false
    },
}, { timestamps: { uploadedAt: 'created_at' } });

module.exports = Submissions = mongoose.model('Submissions', SubmissionsSchema)
