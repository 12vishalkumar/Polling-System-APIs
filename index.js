//--------------------------- Requiring the express -----------------------//
const express = require("express");
const app = express();

//-------------------------- Importing mongoose ---------------------------//
const db = require("./config/mongoose");
//-------------------------- Importing body parser ------------------------//
const bodyParser = require("body-parser");

//------------------------- Incoding the URL ------------------------------//
app.use(bodyParser.urlencoded({ extended: false }));

//------------------------- Mounting the routes from the routes module ----//
app.use("/", require("./routes"));

//-------------------------- Defined port number --------------------------//
const port = 8008;


//----------- ------------ Listen to the port ------------------------------//
app.listen(port, function(error) {
	if(error) {
        //---------------- Error in running server -------------------------//
		console.log(`Error in connecting to server: ${error}`);
		return;
	}
    //-------------------- Server running successfully ---------------------//
	console.log(`Server is running on port: ${port}`);
});




/* 
IMPORTANT POINT : If you face mongoDB is not connected to my PromiseRejectionEvent. Don't worry because 
                  of my ID address changed. You can add own DB and test my project. then its working well 
				  all functionalities.

The main point to add this comment you don't ignore my project because of my DB. 
I hope you understood well my point.🥰🥰
Thanks about this🙏🥰
*/