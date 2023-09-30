//--------------------------- Importing the Mongoose library ---------------------------//
const mongoose = require("mongoose");


//--------------------------- Define the question schema --------------------------------//
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Option",
    }]
});

//------------------------- Creating a model --------------------------------------------//
const Question = mongoose.model("Question", questionSchema);
//------------------------- Exporting the Question model ---------------------------------//
module.exports = Question;