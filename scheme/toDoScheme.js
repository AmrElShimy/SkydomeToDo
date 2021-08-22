const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const toDoScheme = Schema({
  toDoName: {
    type: String,
    required: true,
    unique: true,
  },
});

toDoScheme.plugin(uniqueValidator);

module.exports = mongoose.model("toDos", toDoScheme);
