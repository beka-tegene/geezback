const express = require('express');
const router = express.Router();
const News = require('../models/News'); // Import the News model
// const Image = require('../models/Image'); // Import the Image model
const Vacancy = require('../models/Vacancy'); // Import the Vacancy model
const User = require('../models/User'); // Import the User model
const MediaUploaderController = require('../controllers/MediaUploaderController')




const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/news", // Specify your desired destination folder
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLocaleLowerCase().split(" ").join("-");
    cb(null, Date.now() + fileName);
  },
});

const upload = multer({ storage: storage });


router.post("/postNews", upload.single("image"), MediaUploaderController.createNews);

const storageex = multer.diskStorage({
  destination: "./public/Executive", // Specify your desired destination folder
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLocaleLowerCase().split(" ").join("-");
    cb(null, Date.now() + fileName);
  },
});

const uploadex = multer({ storage: storageex });


router.post("/postExecutive", uploadex.single("image"), MediaUploaderController.createExecutive);





const storagebo = multer.diskStorage({
  destination: "./public/Board", // Specify your desired destination folder
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLocaleLowerCase().split(" ").join("-");
    cb(null, Date.now() + fileName);
  },
});

const uploadbo = multer({ storage: storagebo });


router.post("/postBoard", uploadbo.single("image"), MediaUploaderController.createBoard);


const storageb = multer.diskStorage({
  destination: "./public/recipe", // Specify your desired destination folder
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLocaleLowerCase().split(" ").join("-");
    cb(null, Date.now() + fileName);
  },
});

const uploadb = multer({ storage: storageb });

router.post("/createRecipe", uploadb.single("image"), MediaUploaderController.createRecipe);







const storagePa = multer.diskStorage({
  destination: "./public/partners", // Specify your desired destination folder
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLocaleLowerCase().split(" ").join("-");
    cb(null, Date.now() + fileName);
  },
});


const uploadPa = multer({ storage: storagePa });

router.post("/postPartners", uploadPa.single("image"), MediaUploaderController.createPartner);





const storageGa = multer.diskStorage({
  destination: "./public/Gallery", // Specify your desired destination folder
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLocaleLowerCase().split(" ").join("-");
    cb(null, Date.now() + fileName);
  },
});


const uploadGa = multer({ storage: storageGa });

router.post("/postPhotos", uploadGa.single("image"), MediaUploaderController.createGallery);




const storagehe = multer.diskStorage({
  destination: "./public/Hero", // Specify your desired destination folder
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLocaleLowerCase().split(" ").join("-");
    cb(null, Date.now() + fileName);
  },
});


const uploadhe = multer({ storage: storagehe });

router.post("/postHero", uploadhe.single("image"), MediaUploaderController.createHero);



const storageRe = multer.diskStorage({
  destination: "./public/Report", // Specify your desired destination folder
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLocaleLowerCase().split(" ").join("-");
    cb(null, Date.now() + fileName);
  },
});


const uploadRe = multer({ storage: storageRe });

router.post("/postReport", uploadRe.single("file"), MediaUploaderController.createReport);





const storageDo = multer.diskStorage({
  destination: "./public/Document", // Specify your desired destination folder
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLocaleLowerCase().split(" ").join("-");
    cb(null, Date.now() + fileName);
  },
});


const uploadDo = multer({ storage: storageDo });

router.post("/postDocument", uploadDo.single("file"), MediaUploaderController.createLegal);




// upload tender route 

const storagete = multer.diskStorage({
  destination: "./public/tender", // Specify your desired destination folder
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLocaleLowerCase().split(" ").join("-");
    cb(null, Date.now() + fileName);
  },
});

const uploadte = multer({ storage: storagete });


router.post("/postTender", uploadte.single("image"), MediaUploaderController.createTender);









// Upload vacancy route
router.post("/Createvacancies", MediaUploaderController.createVacancy);
router.get("/getVacancies", MediaUploaderController.getAllVacancies);
router.post("/updateVacancies", MediaUploaderController.updateVacancyById);
router.post("/deleteVacancies", MediaUploaderController.deleteVacancyById);
router.get("/getAllVacancies", MediaUploaderController.getAllVacancies);

router.post("/updateNews", MediaUploaderController.updateNewsById);
router.post("/deleteNews", MediaUploaderController.deleteNewsById);
router.get("/getNews", MediaUploaderController.getAllNews);

router.get("/getPartners", MediaUploaderController.getAllPartners);
router.post("/updatePartner", MediaUploaderController.updatePartnerById);
router.post("/deletePartner", MediaUploaderController.deletePartnerById);

router.get("/getGallery", MediaUploaderController.getAllGallery);
router.post("/updateGallery", MediaUploaderController.updateGalleryById);
router.post("/deleteGallery", MediaUploaderController.deleteGalleryById);


router.post("/updateHero", MediaUploaderController.updateHeroById);
router.get("/getHero", MediaUploaderController.getHero);
router.post("/deleteHero", MediaUploaderController.deleteHeroById);

router.get("/getReport", MediaUploaderController.getAllReport);
router.post("/updateReport", MediaUploaderController.updateReportById);
router.post("/deleteReport", MediaUploaderController.deleteReportById);


router.get("/getDocument", MediaUploaderController.getAllLegal);
router.post("/updateDocument", MediaUploaderController.updateLegalById);
router.post("/deleteDocument", MediaUploaderController.deleteLegalById);

//handele tender 
router.post("/updateTender", MediaUploaderController.updateTenderById);
router.post("/deleteTender", MediaUploaderController.deleteTenderById);
router.get("/getTender", MediaUploaderController.getAlltender);

//handele board
router.post("/updateBoard", MediaUploaderController.updateBoardById);
router.post("/deleteBoard", MediaUploaderController.deleteBoardById);
router.get("/getBoard", MediaUploaderController.getAllBoard);

//handele excutive
router.post("/updateExecutive", MediaUploaderController.updateExecutiveById);
router.post("/deleteExecutive", MediaUploaderController.deleteExecutiveById);
router.get("/getExecutive", MediaUploaderController.getAllExecutive);






module.exports = router;
