//--------------------------- importing required libaries ---------------------------//
const mongoose = require("mongoose");
const Question = require("../models/question");
const Option = require("../models/option");
const internal = require("stream");


//--------------------------- Function to create a new question ---------------------//
module.exports.create = async function(req, res) {
  try {
    //----------------------- Create a new question with the title ------------------//
    let question = await Question.create({
      title: req.body.title
    })
    //----------------------- Return successfully response to created question ------//
    return res.status(200).json({ 
      message: "Question created successfully!", 
      data: question 
    })
  } catch (err) {
    console.log("Error", err);
    //------------------------ Return error -----------------------------------------//
    return res.status(500).json({
      error: "Internal server error"
    });
  }
}


//--------------------------- Function to delete a question -------------------------//
module.exports.delete = async function (req, res) {
  try {
    //--------------------- Find the question ---------------------------------------//
    const question = await Question.findById(req.params.id).populate('options');
    if (!question) {
      //-------------------- Return error response to question not found ------------//
      return res.status(404).json({
        error: "Question not found",
      });
    }

    //---------------------- Check if any option has votes -----------------------------//
    const hasVotes = question.options.some((opt) => opt.votes >= 1);
    if (hasVotes) {
      return res.status(403).json({
        error: "Opps! You are not able to delete this question because it has votes",
      });
    }
    //---------------------- Delete all the options from the question -------------------//
    await Option.deleteMany({ _id: { $in: question.options } });
    //---------------------- Delete the question itself -----------------------------//
    await Question.findByIdAndDelete(req.params.id);
    //---------------------- Return successfully response to deleted question -------//
    return res.status(200).json({
      message: "Question deleted successfully!",
      data: question,
    });
  } catch (err) {
    console.log("Error", err);
    //---------------------- Return error response for any server errors ------------//
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};


module.exports.getQuestion = async function(req, res) {
  try {
    const question = await Question.findById(req.params.id).populate("options");
    if (question) {
      return res.status(200).json({
        message: "Question and associted options get successfully!",
        question
      });
    } else {
      //-------------------- Return error, question not found -----------------------//
      return res.status(404).json({
        message: "Question not found"
      });
    }

  } catch(err) {
    //---------------------- Return internal server error ---------------------------//
    return res.status(500).json({
      message:"Internal server error" 
    });
  }
}