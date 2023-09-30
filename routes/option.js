//--------------------- Importing express ------------------------------//
const express = require("express");
const router = express.Router();


//---------------------- Importing option model ------------------------//
const Option = require("../models/option");

//---------------------- Importing option controller --------------------//
const optionController = require("../controller/option_controller"); 


//---------------------- Creating a new option for question -------------//
router.post("/:id/create", optionController.create); 
//---------------------- Deleting to option with the ID -----------------//
router.delete("/:id/delete", optionController.delete);
//---------------------- Adding a vote to the option the ID -------------//
router.get("/:id/add_vote", optionController.addVote);


//---------------------- Exportinng the router --------------------------//
module.exports = router;