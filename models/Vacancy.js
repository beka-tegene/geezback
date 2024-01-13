const mongoose = require("mongoose");



const AppliedPeopleSchema = new mongoose.Schema({

    Id:{ type: String,}
  });

const vacancySchema = new mongoose.Schema(
  {
    Vacancy_Number: {
    type: String,
    required: true,
    unique:true,
  },
    Position: {
      type: String,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    Qualification: {
      type: String,
      required: true,
    },
    CGPA: {
      type: String,
      required: true,
    },
    Total_Experience: {
      type: Number,
      required: true,
    },
    Career_level:  {
      type: String,
      required: true,
    },
    Purpose_of_the_Job:  {
      type: String,
      required: true,
    },
    Company_Profile:  {
      type: String,
      required: true,
    },
    Generic_Functions:  {
      type: String,
      required: true,
    },
    Specific_Functions:  {
      type: String,
      required: true,
    },
    Place_of_work: {
      type: String,
      required: true,
    },
    Note: {
      type: String,
      required: true,
    },
    Experience: {
      type: String,
      required: true,
    },
    Employment_Type: {
      type: String, // You can use an array to store multiple requirements
      required: true,
    },
    AppliedPeople: [AppliedPeopleSchema],
    posted_Date: {
      type: Date,
      default: Date.now,
    },
    DeadLine: {
        type: Date,
        required: true,
      },
      
  },
  {
    collection: "Vacancies", // You can specify the collection name here
  }
);

const Vacancy = mongoose.model("Vacancy", vacancySchema);

module.exports = Vacancy;

