const Feedback = require('../models/Feedback');


exports.getAllFeedback = async (req, res) => {
    try {
      const feedbackList = await Feedback.find().sort({ createdAt: -1 });
  
      return res.status(200).json({ success: true, feedback: feedbackList });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  