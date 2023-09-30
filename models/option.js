//--------------------------- Importing the Mongoose library -------------------------//
const mongoose = require("mongoose");


//-------------------------- Defining a schema for the Option model ------------------//
const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    default: 0,
    type: Number
  },
  link_to_vote: {
    type: String,
  }
});

//-------------------------- Creating a model based on the schema ------------------//
const Option = mongoose.model("Option", optionSchema);
//-------------------------- Exporting the model ----------------------------------//
module.exports = Option;