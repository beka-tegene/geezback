const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User'); // Import the User model
const AuthController = require('../controllers/AuthController')
// User registration route
router.post("/signup", AuthController.signUp);
/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *     - user
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: User not found or Invalid Password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.post("/login", AuthController.loginUser);

router.post("/forgotPassword", AuthController.forgotPassword);
router.post("/reset", AuthController.ResetPassword);




module.exports = router;
