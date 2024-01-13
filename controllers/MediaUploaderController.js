const Vacancy = require("../models/Vacancy");
const News = require("../models/News");
const Tender = require("../models/Tender");
const Partner = require("../models/Partners");
const Gallery = require("../models/Gallery");
const Hero = require("../models/Hero");
const Report = require("../models/Report");
const Document = require("../models/Document");
const fs = require('fs');
const path = require('path');
const Executive = require("../models/Executive");
const Board = require("../models/Board");


exports.createVacancy = async (req, res) => {
  try {
    const vacancyData = req.body;
    console.log(vacancyData);
    // Create and save the vacancy in the database
    const vacancy = await Vacancy.create(vacancyData);

    // Send the newly created vacancy as JSON response
    return res
      .status(200)
      .json({ success: true, message: "Vacancy Created successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error", error: error });
  }
};

exports.getAllVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find();

    return res.status(200).json({ success: true, vacancies });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateVacancyById = async (req, res) => {
  console.log(req.body);
  try {
    //   const { id } = req.params;
    const {
      id,
      Vacancy_Number,
      Position,
      Category,
      Qualification,
      CGPA,
      Total_Experience,
      Career_level,
      Purpose_of_the_Job,
      Company_Profile,
      Generic_Functions,
      Specific_Functions,
      Place_of_work,
      Note,
      Experience,
      Employment_Type,
      DeadLine,
    } = req.body;

    const vacancy = await Vacancy.findById(id);

    if (!vacancy) {
      return res
        .status(404)
        .json({ success: false, message: "Vacancy not found" });
    }

    // Update vacancy fields
    vacancy.Vacancy_Number = Vacancy_Number;
    vacancy.Position = Position;
    vacancy.Category = Category;
    vacancy.Qualification = Qualification;
    vacancy.CGPA = CGPA;
    vacancy.Total_Experience = Total_Experience;
    vacancy.Career_level = Career_level;
    vacancy.Purpose_of_the_Job = Purpose_of_the_Job;
    vacancy.Company_Profile = Company_Profile;
    vacancy.Generic_Functions = Generic_Functions;
    vacancy.Specific_Functions = Specific_Functions;
    vacancy.Place_of_work = Place_of_work;
    vacancy.Note = Note;
    vacancy.Experience = Experience;
    vacancy.Employment_Type = Employment_Type;
    vacancy.DeadLine = DeadLine;

    // Save the updated vacancy
    await vacancy.save();

    return res.status(200).json({
      success: true,
      message: "Vacancy updated successfully",
      vacancy,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a specific vacancy by ID
exports.deleteVacancyById = async (req, res) => {
  try {
    const { _id } = req.body;
    const vacancy = await Vacancy.findByIdAndRemove(_id);

    if (!vacancy) {
      return res
        .status(404)
        .json({ success: false, message: "Vacancy not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Vacancy deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// exports.getAllVacancies = async (req, res) => {
//   try {
//     const vacancies = await Vacancy.find();

//     return res.status(200).json({ success: true, vacancies });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error" });
//   }
// };

exports.createNews = async (req, res) => {
  try {
    // Extract data from the form data
    console.log("image", req.file);
    console.log("body", req.body);
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Extract the JSON data and file information
    const { newsTitle, description } = req.body;

    // const email = Educational_Status.Email;
    const fileName = req.file.filename;

    const newss = {
      newsTitle: newsTitle,
      description: description,
      image: "http://localhost:5001" + "/news/" + fileName,
    };

    // Create a new news article
    const newNews = new News(newss);

    // Save the news article to the database
    const savedNews = await newNews.save();

    return res.status(200).json({ success: true, news: savedNews });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.createExecutive = async (req, res) => {
  try {
    // Extract data from the form data
    console.log("image", req.file);
    console.log("body", req.body);
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Extract the JSON data and file information
    const { FullName, Position } = req.body;

    // const email = Educational_Status.Email;
    const fileName = req.file.filename;

    const executive = {
      FullName: FullName,
      Position: Position,
      image: "http://localhost:5001" + "/Executive/" + fileName,
    };

    // Create a new news article
    const newExecutive = new Executive (executive);

    // Save the news article to the database
    const savedExecutive = await newExecutive.save();

    return res.status(200).json({ success: true, Executive: savedExecutive });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateExecutiveById = async (req, res) => {
  try {
    const { data } = req.body;
    // console.log(req.body);
    const ExecutiveId = data._id;
    const FullName = data.FullName;
    const Position = data.Position;

    console.log(ExecutiveId);
    // Find the news article by ID
    const executive = await Executive.findById(ExecutiveId);
    if (!executive) {
      return res
        .status(404)
        .json({ success: false, message: "executive not found" });
    }

    // Update vacancy fields
    executive.FullName = FullName;
    executive.Position = Position;

    // Save the updated vacancy
    await executive.save();

    return res
      .status(200)
      .json({ success: true, message: "executive updated successfully", executive });
    return res.status(200).json({ success: true, news: updatedNews });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
exports.deleteExecutiveById = async (req, res) => {
  try {
    const executive = req.body;
    const executiveId = executive._id;
console.log(req.body);
    // Find and delete the news article by ID
    const deletedExecutive = await Executive.findByIdAndDelete(executiveId);

    if (!deletedExecutive) {
      return res
        .status(404)
        .json({ success: false, message: "Executive article not found" });
    }

    // Get the image filename from the deleted Executive article
    const imageFileName = deletedExecutive.image; // Replace 'image' with the actual field storing the image path.

    // Clean up the image path to ensure it's a valid local file system path
    const originalPath = imageFileName;
    const parts = originalPath.split('/');
    const startIndex = parts.indexOf('Executive');
    const trimmedPath = '/' + parts.slice(startIndex).join('/');

    // Construct the cleanedImagePath with the correct Windows file path
    const publicPath = path.resolve(__dirname, '..', 'public');
    console.log("publicPath: " + publicPath);
    const cleanedImagePath = path.join(publicPath, trimmedPath);
    console.log("cleaned",cleanedImagePath);
    // Delete the image file
    fs.unlink(cleanedImagePath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Deleted image file: ${cleanedImagePath}`);
      }
    });

    return res
      .status(200)
      .json({ success: true, message: "Executive article deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
exports.getAllExecutive = async (req, res) => {
  try {
    const executive = await Executive.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, Executive: executive });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
exports.createBoard = async (req, res) => {
  try {
    // Extract data from the form data
    console.log("image", req.file);
    console.log("body", req.body);
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Extract the JSON data and file information
    const { FullName, Position } = req.body;

    // const email = Educational_Status.Email;
    const fileName = req.file.filename;

    const board = {
      FullName: FullName,
      Position: Position,
      image: "http://localhost:5001" + "/Board/" + fileName,
    };

    // Create a new news article
    const newBoard = new Board(board);

    // Save the news article to the database
    const savedBoard = await newBoard.save();

    return res.status(200).json({ success: true, Board: savedBoard });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
exports.updateBoardById = async (req, res) => {
  try {
    const { data } = req.body;
    // console.log(req.body);
    const BoardId = data._id;
    const FullName = data.FullName;
    const Position = data.Position;

    console.log(BoardId);
    // Find the news article by ID
    const board = await Board.findById(BoardId);
    if (!board) {
      return res
        .status(404)
        .json({ success: false, message: "board not found" });
    }

    // Update vacancy fields
    board.FullName = FullName;
    board.Position = Position;

    // Save the updated vacancy
    await board.save();

    return res
      .status(200)
      .json({ success: true, message: "board updated successfully", board });
    return res.status(200).json({ success: true, news: updatedNews });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
exports.deleteBoardById = async (req, res) => {
  try {
    const board = req.body;
    const boardId = board._id;

    // Find and delete the board article by ID
    const deletedBoard = await Board.findByIdAndDelete(boardId);

    if (!deletedBoard) {
      return res
        .status(404)
        .json({ success: false, message: "Board article not found" });
    }

    // Get the image filename from the deleted Board article
    const imageFileName = deletedBoard.image; // Replace 'image' with the actual field storing the image path.

    // Clean up the image path to ensure it's a valid local file system path
    const originalPath = imageFileName;
    const parts = originalPath.split('/');
    const startIndex = parts.indexOf('Board');
    const trimmedPath = '/' + parts.slice(startIndex).join('/');

    // Construct the cleanedImagePath with the correct Windows file path
    const publicPath = path.resolve(__dirname, '..', 'public');
    console.log("publicPath: " + publicPath);
    const cleanedImagePath = path.join(publicPath, trimmedPath);
    console.log("cleaned",cleanedImagePath);
    // Delete the image file
    fs.unlink(cleanedImagePath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Deleted image file: ${cleanedImagePath}`);
      }
    });

    return res
      .status(200)
      .json({ success: true, message: "Board article deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
exports.getAllBoard = async (req, res) => {
  try {
    const board = await Board.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, board: board });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.createPartner = async (req, res) => {
  try {
    // Extract data from the form data
    console.log("image", req.file);
    console.log("body", req.body);
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Extract the JSON data and file information
    const { PartnerName } = req.body;

    // const email = Educational_Status.Email;
    const fileName = req.file.filename;

    const partners = {
      PartnerName: PartnerName,
      image: "http://localhost:5001" + "/partners/" + fileName,
    };

    // Create a new news article
    const newPartner = new Partner(partners);

    // Save the news article to the database
    const savedPartner = await newPartner.save();

    return res.status(200).json({ success: true, partner: savedPartner });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.createGallery = async (req, res) => {
  try {
    // Extract data from the form data
    console.log("image", req.file);
    console.log("body", req.body);
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Extract the JSON data and file information
    const { ImageName } = req.body;

    // const email = Educational_Status.Email;
    const fileName = req.file.filename;

    const gallerys = {
      ImageName: ImageName,
      image: "http://localhost:5001" + "/Gallery/" + fileName,
    };

    // Create a new news article
    const newGallery = new Gallery(gallerys);

    // Save the news article to the database
    const savedGalery = await newGallery.save();

    return res.status(200).json({ success: true, Gallery: savedGalery });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.createHero = async (req, res) => {
  try {
    // Extract data from the form data
    console.log("image", req.file);
    console.log("body", req.body);
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Extract the JSON data and file information
    const { ImageName } = req.body;

    const fileName = req.file.filename;
    console.log("galeru", ImageName);

    const heros = {
      ImageName: ImageName,
      image: "http://localhost:5001" + "/Hero/" + fileName,
    };

    // Create a new news article
    const newHero = new Hero(heros);

    // Save the news article to the database
    const savedHero = await newHero.save();

    return res.status(200).json({ success: true, Hero: savedHero });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getHero = async (req, res) => {
  try {
    const latestHero = await Hero.find().sort({ createdAt: -1 });

    if (!latestHero) {
      return res
        .status(404)
        .json({ success: false, message: "No hero image found" });
    }

    return res.status(200).json({ success: true, hero: latestHero });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateHeroById = async (req, res) => {
  try {
    const heroData = req.body;
    console.log(heroData);
    const imageId = heroData.id;
    const imagename = heroData.ImageName;

    console.log(imageId);
    // Find the news article by ID
    const image = await Hero.findById(imageId);
    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "image not found" });
    }

    // Update vacancy fields
    image.ImageName = imagename;

    // Save the updated vacancy
    await image.save();

    return res
      .status(200)
      .json({ success: true, message: "image updated successfully", image });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteHeroById = async (req, res) => {
  try {
    const hero = req.body;
    const heroId = hero._id;
    console.log(hero);
    // Find and delete the news article by ID
    const deletedHero = await Hero.findByIdAndDelete(heroId);

    if (!deletedHero) {
      return res
        .status(404)
        .json({ success: false, message: "Image  not found" });
    }
    const imageFileName = deletedHero.image; // Replace 'image' with the actual field storing the image path.

    // Clean up the image path to ensure it's a valid local file system path
    const originalPath = imageFileName;
    const parts = originalPath.split('/');
    const startIndex = parts.indexOf('Hero');
    const trimmedPath = '/' + parts.slice(startIndex).join('/');
console.log("tr",trimmedPath);
console.log("imageFileName",imageFileName);


    // Construct the cleanedImagePath with the correct Windows file path
    const publicPath = path.resolve(__dirname, '..', 'public');
    console.log("publicPath: " + publicPath);
    const cleanedImagePath = path.join(publicPath, trimmedPath);
    console.log("cleaned",cleanedImagePath);
    // Delete the image file
    fs.unlink(cleanedImagePath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Deleted image file: ${cleanedImagePath}`);
      }
    });

   


    return res
      .status(200)
      .json({ success: true, message: "Image  deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, gallerys: gallery });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateGalleryById = async (req, res) => {
  try {
    const galleryData = req.body;
    console.log(galleryData);
    const imageId = galleryData.id;
    const imagename = galleryData.ImageName;

    console.log(imageId);
    // Find the news article by ID
    const image = await Gallery.findById(imageId);
    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "image not found" });
    }

    // Update vacancy fields
    image.ImageName = imagename;

    // Save the updated vacancy
    await image.save();

    return res
      .status(200)
      .json({ success: true, message: "image updated successfully", image });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteGalleryById = async (req, res) => {
  try {
    const gallery = req.body;
    const ImageId = gallery._id;
    console.log(gallery);
    // Find and delete the news article by ID
    const deletedGallery = await Gallery.findByIdAndDelete(ImageId);

    if (!deletedGallery) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }
    const imageFileName = deletedGallery.image; // Replace 'image' with the actual field storing the image path.

    // Clean up the image path to ensure it's a valid local file system path
    const originalPath = imageFileName;
    const parts = originalPath.split('/');
    const startIndex = parts.indexOf('Gallery');
    const trimmedPath = '/' + parts.slice(startIndex).join('/');
console.log("tr",trimmedPath);
console.log("imageFileName",imageFileName);


    // Construct the cleanedImagePath with the correct Windows file path
    const publicPath = path.resolve(__dirname, '..', 'public');
    console.log("publicPath: " + publicPath);
    const cleanedImagePath = path.join(publicPath, trimmedPath);
    console.log("cleaned",cleanedImagePath);
    // Delete the image file
    fs.unlink(cleanedImagePath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Deleted image file: ${cleanedImagePath}`);
      }
    });

   


    return res
      .status(200)
      .json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getAllPartners = async (req, res) => {
  try {
    const partner = await Partner.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, partner: partner });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updatePartnerById = async (req, res) => {
  try {
    const partnerdata = req.body;
    console.log(partnerdata);
    const partnerId = partnerdata.id;
    const partnername = partnerdata.partnername;

    console.log(partnerId);
    // Find the news article by ID
    const partner = await Partner.findById(partnerId);
    if (!partner) {
      return res
        .status(404)
        .json({ success: false, message: "partner not found" });
    }

    // Update vacancy fields
    partner.PartnerName = partnername;

    // Save the updated vacancy
    await partner.save();

    return res.status(200).json({
      success: true,
      message: "partner updated successfully",
      partner,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.deletePartnerById = async (req, res) => {
  try {
    const partner = req.body;
    const partnerId = partner._id;
    // Find and delete the news article by ID
    const deletedPartner = await Partner.findByIdAndDelete(partnerId);

    if (!deletedPartner) {
      return res
        .status(404)
        .json({ success: false, message: "Partner  not found" });
    }
    const imageFileName = deletedPartner.image; // Replace 'image' with the actual field storing the image path.

    // Clean up the image path to ensure it's a valid local file system path
    const originalPath = imageFileName;
    const parts = originalPath.split('/');
    const startIndex = parts.indexOf('partners');
    const trimmedPath = '/' + parts.slice(startIndex).join('/');
console.log("tr",trimmedPath);
console.log("imageFileName",imageFileName);


    // Construct the cleanedImagePath with the correct Windows file path
    const publicPath = path.resolve(__dirname, '..', 'public');
    console.log("publicPath: " + publicPath);
    const cleanedImagePath = path.join(publicPath, trimmedPath);
    console.log("cleaned",cleanedImagePath);
    // Delete the image file
    fs.unlink(cleanedImagePath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Deleted image file: ${cleanedImagePath}`);
      }
    });

   

    return res
      .status(200)
      .json({ success: true, message: "Partner  deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const newsArticles = await News.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, news: newsArticles });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Update a news article by ID
exports.updateNewsById = async (req, res) => {
  try {
    const { data } = req.body;
    // console.log(req.body);
    const newsId = data._id;
    const newstitle = data.newsTitle;
    const description = data.description;

    console.log(newsId);
    // Find the news article by ID
    const news = await News.findById(newsId);
    if (!news) {
      return res
        .status(404)
        .json({ success: false, message: "news not found" });
    }

    // Update vacancy fields
    news.newsTitle = newstitle;
    news.description = description;

    // Save the updated vacancy
    await news.save();

    return res
      .status(200)
      .json({ success: true, message: "news updated successfully", news });
    return res.status(200).json({ success: true, news: updatedNews });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a news article by ID

exports.deleteNewsById = async (req, res) => {
  try {
    const news = req.body;
    const newsId = news._id;

    // Find and delete the news article by ID
    const deletedNews = await News.findByIdAndDelete(newsId);

    if (!deletedNews) {
      return res
        .status(404)
        .json({ success: false, message: "News article not found" });
    }

    // Get the image filename from the deleted news article
    const imageFileName = deletedNews.image; // Replace 'image' with the actual field storing the image path.

    // Clean up the image path to ensure it's a valid local file system path
    const originalPath = imageFileName;
    const parts = originalPath.split('/');
    const startIndex = parts.indexOf('news');
    const trimmedPath = '/' + parts.slice(startIndex).join('/');

    // Construct the cleanedImagePath with the correct Windows file path
    const publicPath = path.resolve(__dirname, '..', 'public');
    console.log("publicPath: " + publicPath);
    const cleanedImagePath = path.join(publicPath, trimmedPath);
    console.log("cleaned",cleanedImagePath);
    // Delete the image file
    fs.unlink(cleanedImagePath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Deleted image file: ${cleanedImagePath}`);
      }
    });

    return res
      .status(200)
      .json({ success: true, message: "News article deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};






exports.createReport = async (req, res) => {
  try {
    // Extract data from the form data
    console.log("file", req.file);
    console.log("body", req.body);
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Extract the JSON data and file information
    const { ReportName } = req.body;

    // const email = Educational_Status.Email;
    const fileName = req.file.filename;

    const reports = {
      ReportName: ReportName,
      report: "http://localhost:5001" + "/public/Report/" + fileName,
    };

    // Create a new news article
    const newReport = new Report(reports);

    // Save the news article to the database
    const savedReport = await newReport.save();

    return res.status(200).json({ success: true, Report: savedReport });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getAllReport = async (req, res) => {
  try {
    const report = await Report.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, report: report });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateReportById = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const reportId = data._id;
    const reportName = data.reportName;

    console.log(reportId);
    // Find the news article by ID
    const report = await Report.findById(reportId);
    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "report not found" });
    }

    // Update vacancy fields
    report.ReportName = reportName;

    // Save the updated vacancy
    await report.save();

    return res
      .status(200)
      .json({ success: true, message: "report updated successfully", report });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteReportById = async (req, res) => {
  try {
    const report = req.body;
    const reportId = report._id;
    // Find and delete the news article by ID
    const deletedReport = await Report.findByIdAndDelete(reportId);

    if (!deletedReport) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found" });
    }
     // Get the image filename from the deleted news article
     const imageFileName = deletedReport.report; // Replace 'image' with the actual field storing the image path.

     // Clean up the image path to ensure it's a valid local file system path
     const originalPath = imageFileName;
     const parts = originalPath.split('/');
     const startIndex = parts.indexOf('Report');
     const trimmedPath = '/' + parts.slice(startIndex).join('/');
 console.log("tr",trimmedPath);
 console.log("imageFileName",imageFileName);


     // Construct the cleanedImagePath with the correct Windows file path
     const publicPath = path.resolve(__dirname, '..', 'public');
     console.log("publicPath: " + publicPath);
     const cleanedImagePath = path.join(publicPath, trimmedPath);
     console.log("cleaned",cleanedImagePath);
     // Delete the image file
     fs.unlink(cleanedImagePath, (err) => {
       if (err) {
         console.error(err);
       } else {
         console.log(`Deleted image file: ${cleanedImagePath}`);
       }
     });
 
    

    return res
      .status(200)
      .json({ success: true, message: "Report deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.createLegal = async (req, res) => {
  try {
    // Extract data from the form data
    console.log("file", req.file);
    console.log("body", req.body);
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Extract the JSON data and file information
    const { DocumentName } = req.body;

    // const email = Educational_Status.Email;
    const fileName = req.file.filename;

    const docs = {
      DocumentName: DocumentName,
      document: "http://localhost:5001" + "/public/Document/" + fileName,
    };

    // Create a new news article
    const newDocument = new Document(docs);

    // Save the news article to the database
    const savedDocument = await newDocument.save();

    return res.status(200).json({ success: true, Document: savedDocument });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getAllLegal = async (req, res) => {
  try {
    const document = await Document.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, document: document });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateLegalById = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const documentId = data._id;
    const documentName = data.reportName;

    console.log(documentId, documentName);
    // Find the news article by ID
    const document = await Document.findById(documentId);
    if (!document) {
      return res
        .status(404)
        .json({ success: false, message: "document not found" });
    }

    // Update vacancy fields
    document.DocumentName = documentName;

    // Save the updated vacancy
    await document.save();

    return res.status(200).json({
      success: true,
      message: "documnet updated successfully",
      document,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteLegalById = async (req, res) => {
  try {
    const document = req.body;
    const documentId = document._id;
    console.log(documentId);
    // Find and delete the news article by ID
    const deletedDocument = await Document.findByIdAndDelete(documentId);

    if (!deletedDocument) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }
    const imageFileName = deletedDocument.document; // Replace 'image' with the actual field storing the image path.

    // Clean up the image path to ensure it's a valid local file system path
    const originalPath = imageFileName;
    const parts = originalPath.split('/');
    const startIndex = parts.indexOf('Document');
    const trimmedPath = '/' + parts.slice(startIndex).join('/');
console.log("tr",trimmedPath);
console.log("imageFileName",imageFileName);


    // Construct the cleanedImagePath with the correct Windows file path
    const publicPath = path.resolve(__dirname, '..', 'public');
    console.log("publicPath: " + publicPath);
    const cleanedImagePath = path.join(publicPath, trimmedPath);
    console.log("cleaned",cleanedImagePath);
    // Delete the image file
    fs.unlink(cleanedImagePath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Deleted image file: ${cleanedImagePath}`);
      }
    });

   

    return res
      .status(200)
      .json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.createTender = async (req, res) => {
  try {
    // Extract data from the form data
    console.log("image", req.file);
    console.log("body", req.body);
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Extract the JSON data and file information
    const { TenderTitle, description } = req.body;

    // const email = Educational_Status.Email;
    const fileName = req.file.filename;

    const tenders = {
      tenderTitle: TenderTitle,
      description: description,
      image: "http://localhost:5001" + "/tender/" + fileName,
    };

    // Create a new news article
    const newTender = new Tender(tenders);

    // Save the news article to the database
    const savedTender = await newTender.save();

    return res.status(200).json({ success: true, tenders: savedTender });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getAlltender = async (req, res) => {
  try {
    const tender = await Tender.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, tender: tender });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Update a news article by ID
exports.updateTenderById = async (req, res) => {
  try {
    const data = req.body;
    // console.log(req.body);
    const tenderId = data._id;
    const tendertitle = data.tenderTitle;
    const description = data.description;

    console.log(tenderId);
    // Find the news article by ID
    const tender = await Tender.findById(tenderId);
    if (!tender) {
      return res
        .status(404)
        .json({ success: false, message: "tender not found" });
    }

    // Update vacancy fields
    tender.tenderTitle = tendertitle;
    tender.description = description;

    // Save the updated vacancy
    await tender.save();

    return res
      .status(200)
      .json({ success: true, message: "tender updated successfully", tender });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a news article by ID
exports.deleteTenderById = async (req, res) => {
  try {
    const tender = req.body;
    const tenderId = tender._id;
    // Find and delete the news article by ID
    const deletedTender = await Tender.findByIdAndDelete(tenderId);

    if (!deletedTender) {
      return res
        .status(404)
        .json({ success: false, message: "Tender not found" });
    }
    const imageFileName = deletedTender.image; // Replace 'image' with the actual field storing the image path.

  // Clean up the image path to ensure it's a valid local file system path
    const originalPath = imageFileName;
    const parts = originalPath.split('/');
    const startIndex = parts.indexOf('tender');
    const trimmedPath = '/' + parts.slice(startIndex).join('/');
    console.log("tr",trimmedPath);
    console.log("imageFileName",imageFileName);


    // Construct the cleanedImagePath with the correct Windows file path
    const publicPath = path.resolve(__dirname, '..', 'public');
    console.log("publicPath: " + publicPath);
    const cleanedImagePath = path.join(publicPath, trimmedPath);
    console.log("cleaned",cleanedImagePath);
    // Delete the image file
    fs.unlink(cleanedImagePath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Deleted image file: ${cleanedImagePath}`);
      }
    });

   


    return res
      .status(200)
      .json({ success: true, message: "Tender deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
