//------------------------ importing required libaries ---------------------------//
const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;
const Option = require("../models/option");
const Question = require("../models/question");


//----------------------- create the option for a given question -----------------//
module.exports.create = async function (req, res) {
  let question = await Question.findById(req.params.id);
  //--------------------- question checking --------------------------------------//
  if (question) {
    try {
      //----------------- Creating option with the provided text -----------------//
      let option = await Option.create({
        text: req.body.text, 
        votes: req.body.votes
      })
      //----------------- Setting up the link to vote for the option ------------//
      option.link_to_vote = `http://localhost:8008/options/${option._id}/add_vote`;
      option.save();
      //----------------- Push the option in the question array -----------------//
      question.options.push(option._id);
      question.save();
      //----------------- Return the created option -----------------------------//
      return res.status(200).json({ 
        message: "Option created successfully!", 
        data: option 
      });
      // return res.json(option);
    } catch (err) {
      console.log("Error", err);
      return res.status(500).json({
        error: "Internal server error"
      });
    }
  } else {
    //------------------ Return an error, If the question doesn't exist. -------//
    return res.status(404).json({
      error: "Question not found."
    });
  }
}

//--------------------- function to delete an option ---------------------------//
module.exports.delete = async function (req, res) {
  try {
    //----------------- Finding the option with the provided ID ----------------//
    let option = await Option.findById(req.params.id);
    if (option) {
      //--------------- Check if the option for votes --------------------------//
      if (option.votes < 1) {
        //------------- Finding the question that contains the option ----------//
        let question = await Question.findOne({ options: { $elemMatch: { $eq: req.params.id }}});
        if (question) {

          //----------- Delete the option and remove it from array -------------//
          await Option.findByIdAndDelete(req.params.id);
          await Question.updateOne({ _id: question._id }, { $pull: { options: { $in: [new mongoose.Types.ObjectId(req.params.id)] }}});
          return res.json({ message: "Option deleted Successfully!", data: option });
        }
      } else {
        //------------ return an error, If the option has votes. ---------------//
        return res.status(403).json({
          error: "Opps! This option have votes. You can't able to delete this option."
        });
      }
    } else {
      //-------------- return an error, If the option doesn't exist. ----------//
      return res.status(404).json({
        error: "Option not found."
      });
    }
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
}

//------------------ function to add a vote ----------------------------------//
module.exports.addVote = async function (req, res) {
  try {
    //-------------- Finding the option with the provided ID -----------------//
    let option = await Option.findById(req.params.id);
    if (option) {
      //----------- increase thr vote count and save it ----------------------//
      option.votes += 1;
      option.save();
      return res.json({ message: "Vote added successfully in option", data: option });
    } else {
      //----------- Return an error, If the option doesn't exist. ------------//
      return res.status(404).json({
        error: "Option not found"
      });
    }
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
}