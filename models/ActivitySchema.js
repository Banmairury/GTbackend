const mongoose = require('mongoose');
//const { Schema } = mongoose;

const activitySchema = new mongoose.Schema({
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    title: {
        type: String,
        required: true
    },
    activity_type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    note: String,
    // calories: Number,
},{timestamps:true});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;