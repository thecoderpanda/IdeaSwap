/* eslint-disable no-undef */

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const QuestSchema = new Schema({
    no: {
        type: Number,
        required: false
    },
    title: {
        type: String,
        required: true
    },

    answer: {
        type: String,
        required: true
    },
    //have two types of assignments, multiple choice and single line answers

    description: {
        type: String,
    },

    enrolledUsers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
      }],

    //lectureId: { type: Schema.Types.ObjectId, ref: 'Lecture' },

    //store multiple choice questions in an array and store the correct answer
    //in the correctAnswer field
    
}, { timestamps: { uploadedAt: 'created_at' } });

module.exports = Quests = mongoose.model('Quests', QuestSchema)
