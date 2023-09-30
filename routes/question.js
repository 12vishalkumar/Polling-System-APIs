//------------------------- importing express -------------------------------//
const express = require("express");
const router = express.Router();



//------------------------ Importin question module --------------------------//
const Question = require("../models/question");
//------------------------ Importing question controller ---------------------//
const questionController = require("../controller/question_controller");


//------------------------- Route for creating a new question ----------------//
router.post("/create", questionController.create);
//------------------------- Route for creating question ----------------------//
router.get("/:id", questionController.getQuestion);
//------------------------- Route for deleting a question --------------------//
router.delete("/:id/delete",  questionController.delete);


//------------------------- Mount the options router as a sub-router ---------//
router.use("/options", require("./option"));


//------------------------ exporting the route -------------------------------//
module.exports = router;