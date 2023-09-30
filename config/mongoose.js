//-------------------- importing mongo DB -----------------------//
const mongoose = require("mongoose");


//-------------------- mongo db url ----------------------------//
// const password = "12345";
const DB_URL = `mongodb+srv://vk131474:BfUXvqeNYqM7aufe@polling-api.wjzinzg.mongodb.net/?retryWrites=true&w=majority`;

//------------------- connecting to the mongo db ---------------//
mongoose.connect(DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;

//------------------ error massage in mongo db -----------------//
db.on('error', console.error.bind(console, "Error in connecting to MongoDB" ));

//------------------ running mongo db -------------------------//
db.once('open', function () {
	console.log("Connected to Database :: MongoDB");
});

//------------------ exporting db -----------------------------//
module.exports = mongoose;
