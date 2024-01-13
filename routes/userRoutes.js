const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/educational",
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLocaleLowerCase().split(" ").join("-");
    cb(null, Date.now() + fileName);
  },
});

const upload = multer({ storage: storage });

// User profile route
router.post(
  "/edustatus",
  upload.single("file"),
  UserController.Educational_Status
);

router.post("/pi", UserController.PersonalInfo);
router.post("/workexp", UserController.WorkExperience);
/**
 * @openapi
 * '/user/getVacancies':
 *  get:
 *     tags:
 *     - user
 *     summary: Get all vacancy
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                
 *       500:
 *         description: Bad request
 */
router.get("/getVacancies", UserController.getAllVacancies);
router.post("/ApplyVacancy", UserController.Apply);
router.post("/getbyid", UserController.getUserbyId);
router.get("/getNews", UserController.getAllNews);

// Feedback submission route
router.post("/Sendfeedback", UserController.createFeedback);
router.get("/getall", UserController.getAllCurrency);

module.exports = router;
