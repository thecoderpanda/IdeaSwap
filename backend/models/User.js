const mongoose = require("mongoose")
const Schema = mongoose.Schema

const courseCompletedSchema = new Schema({         
    courseId: {   
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    completedLectures: [{
        type: Schema.Types.ObjectId,
        ref: "Lecture",
    }]
})

const UserSchema = new Schema({
    first_name: {
        type: String,
        lowercase: true,
    },
    last_name: {
        type: String,
        lowercase: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    wallet_address: [{
        type: String
    }],
    role: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: false
    },
    profile: { 
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }, 

    team_link: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
    }, 

    team_status: {
        type: Boolean,
        default: false
    }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }); //automatically add while insert or update the object

module.exports = User = mongoose.model('users', UserSchema)