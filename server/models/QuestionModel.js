const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: [true, "Please provide the answer!"],
    lowercase: true,
  },
  question: {
    type: String,
    min: 0,
    unique: true,
    required: [true, "Please provide level number!"],
  },
  statement: {
    type: String,
    min: 0,
    unique: false,
    required: [true, "Please provide statement"],
  },
}, { collection: 'questions' });

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
