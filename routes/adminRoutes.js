const express = require('express');
const router = express.Router();
const Vacancy = require('../models/Vacancy'); // Import the Vacancy model
const User = require('../models/User'); // Import the User model
const AdminController = require('../controllers/AdminController')


// Create a new vacancy
router.post('/vacancies', async (req, res) => {
  try {
    const vacancyData = req.body;

    // Create and save the new vacancy in the database
    const vacancy = await Vacancy.create(vacancyData);

    // Send the newly created vacancy as JSON response
    res.status(201).json(vacancy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a vacancy by ID
router.put('/vacancies/:vacancyId', async (req, res) => {
  try {
    const vacancyId = req.params.vacancyId;
    const updatedVacancyData = req.body;

    // Update the vacancy data in the database
    const updatedVacancy = await Vacancy.findByIdAndUpdate(vacancyId, updatedVacancyData, { new: true });

    if (!updatedVacancy) {
      return res.status(404).json({ error: 'Vacancy not found' });
    }

    // Send the updated vacancy as JSON response
    res.json(updatedVacancy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// CRUD routes for users and media uploader

// Add more admin-related routes as needed
router.get("/Getfeedback",AdminController.getAllFeedback );


module.exports = router;
