const bcrypt = require("bcryptjs");
const User = require('../models/User');
const Feedback = require('../models/Feedback');
const Vacancy = require('../models/Vacancy');
const News = require('../models/News');


const { json } = require("express");

 
exports.PersonalInfo = async (req, res) => {
  try {
    const { data} = req.body;
    console.log(data);
    const email = data.Email;
    console.log(email);
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      // Handle the case where the user with the specified email is not found
      return res.status(404).json({ success: false, message: 'User not found' });
      
    }

    // Push the personalInfoData into the personalInfo array
    user.personalInfo.push(data);

    // Save the updated user document
    await user.save();
    return res.status(200).json({ success: true, message: 'Personal info data updated successfully' });
    
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });

  }
}

exports.Educational_Status = async (req, res) => {
  try {
    // Check if a file was uploaded
    // console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Extract the JSON data and file information
    const { email,Current_Educational_Status,Field_of_Study,CGPA,Year_of_Graduation,Academic_Institution,Exit_Exam_Result } = req.body;
    console.log(req.file);
    console.log(req.body);
    // const email = Educational_Status.Email;
    const fileName = req.file.filename;
   
    

    // console.log(fileName);
    // Find the user by email
    const user = await User.findOne({ email });
    
    // console.log(user);
    if (!user) {
      // Handle the case where the user with the specified email is not found
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const educationalStatus = {
      Current_Educational_Status: Current_Educational_Status,
      Field_of_Study: Field_of_Study,
      CGPA: CGPA,
      Year_of_Graduation: Year_of_Graduation,
      Academic_Institution: Academic_Institution,
      Attach_Updated_Documents: "http://localhost:5000" + "/public/" + fileName, // Format the file path
      Exit_Exam_Result: Exit_Exam_Result,
    };

    user.personalInfo[0].Educational_Status.push(educationalStatus);
    await user.save();

    return res.status(200).json({ success: true, message: 'Personal info data updated successfully' });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


exports.getUserbyId = async (req,res) => {

  try {
    const data = req.body;
    var userId =data.UserId;
    console.log(userId);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send the user data as JSON response
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}


exports.WorkExperience = async (req, res) => {
  try {
    const { WorkExperience } = req.body;
    console.log(WorkExperience);
    const email = WorkExperience.email;
    console.log(email);
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      // Handle the case where the user with the specified email is not found
      return res.status(404).json({ success: false, message: 'User not found' });
      
    }

    // Push the personalInfoData into the personalInfo array
    user.WorkExperience.push(WorkExperience);

    // Save the updated user document
    await user.save();
    return res.status(200).json({ success: true, message: 'Personal info data updated successfully' });
    
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });

  }
}

exports.createFeedback = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    // Create a new feedback document
    const feedback = new Feedback(data);

    // Save the feedback document to the database
    await feedback.save();

    return res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getAllVacancies = async (req, res) => {
  console.log("hello");
  try {
    const vacancies = await Vacancy.find();

    return res.status(200).json({ success: true, vacancies });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


exports.Apply = async (req, res) => {
  const { UserId, VacancyId } = req.body;
  console.log(UserId, VacancyId);

  try {
    // Attempt to update the Vacancy document
    await Vacancy.updateOne(
      { _id: VacancyId },
      { $addToSet: { AppliedPeople: { Id: UserId } } }
    ).exec();

    // If there are no errors up to this point, it means the update was successful
    res.json({ status: "success", message: "Application successful" });
  } catch (error) {
    // Handle and capture any errors that occur
    console.error(error);

    // Return an error response with the error message
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const fetch = require('node-fetch');


exports.getAllCurrency = async (req, res) => {
  try {
    const url = 'http://api.exchangeratesapi.io/v1/latest';
    const accessKey = '6491ba091f6228b7cd253f7cec019e51';
    const baseCurrency = 'USD';
    const symbols = 'USD,CAD,GBP'; // Add more currencies if needed

    const params = new URLSearchParams({
      access_key: accessKey,
      // base: baseCurrency,
      symbols: symbols,
    });

    // console.log(url+"?"+params);
    const response = await fetch(`${url}?${params}`);
    
    if (!response.ok) {
      const errorMessage = `Failed to fetch exchange rates. Status code: ${response.status}`;
      console.error(errorMessage);
      return res.status(500).json({ success: false, message: errorMessage });
    }

    const data = await response.json();

    if (data.success) {
      const exchangeRates = data.rates;
      return res.status(200).json({ success: true, exchangeRates });
    } else {
      const errorMessage = `Failed to fetch exchange rates. API error: ${data.error.info}`;
      console.error(errorMessage);
      return res.status(500).json({ success: false, message: errorMessage });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const newsArticles = await News.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, news: newsArticles });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



// exports.PersonalInfo = async (req, res) => {
//   try {
//     const { data } = req.body;
//     // Find the user by email
//     const email = "johndoe@example.com";
//   console.log(data.First_Name);
//     const user = await User.findOne({ email });

//     if (!user) {
//       // Handle the case where the user with the specified email is not found
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     // Update the entire personalInfo object with the new data
//     user.personalInfo = data;

//     // Save the updated user document
//     await user.save();

//     return res.status(200).json({ success: true, message: 'Personal info data updated successfully' });
//   } catch (error) {
//     // Handle any other errors that may occur during the process
//     console.error(error);
//     return res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// }




// exports.PersonalInfo = async (req, res) => {
//     const { email, password } = req.body;
//     const role = "user";
//     // const Creator =email;
  
//     const encreptedPassword = await bcrypt.hash(password, 10);
  
//     console.log("hello");
  
//     try {
        
//       await User.create({
//         email,
//         password: encreptedPassword,
//         role,
//       });
    
//       console.log("success");
    
//       res.send({ status: "ok" });
//     } catch (error) {
//       if (error.code === 11000 || error.code === 16460) {
//         // Duplicate key error or unique key constraint violation
//         res.send({ status: "error", error: "Duplicate data" });
//         console.log("Duplicate data");
//       } else if (error.code === 17140) {
//         // Missing expected field error
//         res.send({ status: "error", error: "Missing expected field" });
//         console.log("Missing expected field");
//       } else if (error.code === 20250) {
//         // Invalid document or field name error
//         res.send({ status: "error", error: "Invalid document or field name" });
//         console.log("Invalid document or field name");
//       } else if (error.code === 21328) {
//         // Maximum index key length exceeded error
//         res.send({ status: "error", error: "Maximum index key length exceeded" });
//         console.log("Maximum index key length exceeded");
//       } else {
//         // Generic error handling
//         res.send({ status: "error", error: error.message });
//         console.log(error.message);
//       }
//     }
    
    
//   }