const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: [true, "Please provide the answer!"],
    lowercase: true,
    select: false,
  },
  question: {
    type: String,
    min: 0,
    unique: true,
    required: [true, "Please provide level number!"],
  },
}, { collection: 'answers' });

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
