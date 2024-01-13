const mongoose= require("mongoose");

const educationalScehma = new mongoose.Schema(
    {
        Current_Educational_Status:String,
        Field_of_Study:String,
        CGPA:String,
        Year_of_Graduation:Date,
        Academic_Institution:String,
        Attach_Updated_Documents:String,
        Exit_Exam_Result:String,
      
    }
  )

const personalInfoScehma = new mongoose.Schema(
    {
      First_Name:String,
      Middle_Name:String,
      Last_Name:String,
      Email:String,
      Gender:String, 
      Marita_Status:String,
      Mobile:String,
      Alternative_Mobile:String,
      Date_of_Birth:Date,
      Current_Address:String,
      Current_Organiazation:String,
      Total_Working_Experience:String,
      Current_Gross_Salary:String,
      Educational_Status:[educationalScehma],
            
    }
  )
 
  const WorkExperience = new mongoose.Schema(
    {
      Orginization:String,
      Position:String,
      From_Date:Date,
      To_Date:Date,
      
    }
  )


  const UserDetailsScehma = new mongoose.Schema(
    {
      email:{ type: String,
        unique: true},      
      password: String,
      personalInfo:[personalInfoScehma],
      WorkExperience:[WorkExperience],

      role: String,      
    },
    {
        collection: "Users",

    }

);
const User = mongoose.model("Users", UserDetailsScehma);
module.exports = User;