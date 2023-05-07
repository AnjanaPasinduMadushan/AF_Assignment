const Feedback = require("../model/feedback");

//Get all feedbacks
const getAllFeedback = async(req, res ,next) => {
    let feedback;
    try{
        feedback = await Feedback.find();
    }catch (err){
        console.log(err);
    }if (!feedback){
        return res.status(404).json({message: "Nothing found"})
    }
        return res.status(200).json(feedback);
};


//Get feedback by userID
const getByUserID = async(req ,res ,next) => {
  const id = req.userId;
  console.log("saf"+id)
  let feedback;
  try{
      feedback = await Feedback.find({commentorId:id});
  }catch (err) {
      console.log(err);
    }
    if (!feedback) {
      return res.status(404).json({ message: "No feedback found" });
    }else{
      return res.status(200).json({feedback});
    }
    
  };

//Get feedback by ID
const getByID = async(req ,res ,next) => {
    const id = req.params.id;
    let feedback;
    try{
        feedback = await Feedback.findById(id);
    }catch (err) {
        console.log(err);
      }
      if (!feedback) {
        return res.status(404).json({ message: "No feedback found" });
      }else{
        return res.status(200).json({feedback});
      }
      
    };



      //update Feddback
const updateFeedback = async (req, res, next) => {
    const id = req.params.id;
    const { feedback } = req.body;
    let feedbacks;
    try {
        feedbacks = await Feedback.findByIdAndUpdate(id,
           {
        feedback
      });
      
    } catch (err) {
      console.log(err);
    }
    if (!feedbacks) {
      return res.status(404).json({ message: "Unable to Update by id" });
    }
    return res.status(200).json({ feedbacks });
  };

  //add Feedback
const addFeedback = async (req, res, next) => {
      const { feedback } =
        req.body;

        const complaintId = req.params.complaintId;
        const commentorId = req.userId;
      let feed;
      try {
        feed = new Feedback({
          feedback ,
          complaintId ,
          commentorId
        });
        await feed.save();
      } catch (err) {
        console.log(err);
        return res.status(500).json({msg:"Error when adding"})
      }
      if (!feed) {
        return res.status(500).json({ message: "Unable to add" });
      }
      return res.status(201).json({feed});
    };

    exports.addFeedback = addFeedback;
    exports.getAllFeedback = getAllFeedback;
    exports.getByID = getByID;
    exports.updateFeedback = updateFeedback;
    exports.getByUserID =  getByUserID