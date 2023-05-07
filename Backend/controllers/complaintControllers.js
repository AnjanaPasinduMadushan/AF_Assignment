const Complaint = require("../model/complaint");

const fetchComplaints = async (req, res) => {
  // Find the complaints   
  const complaints = await Complaint.find({isApproved:true});

  // Respond with them
  res.json({ complaints });
};

const fetchComplaint = async (req, res) => {
  // Get id off the url
  const complaintId = req.params.id;

  // Find the complaint using that id
  const complaint = await Complaint.findById(complaintId);

  // Respond with the complaint
  res.json({ complaint });
};

const getByUserID = async(req ,res ,next) => {
  const id = req.userId;
  let complaints;
  try{
    complaints = await Complaint.find({userId:id});
  }catch (err) {
      console.log(err);
    }
    if (!complaints) {
      return res.status(404).json({ message: "No Complaints found" });
    }else{
      return res.status(200).json({ complaints });
    }
    
  };

const createComplaint = async (req, res) => {
  // Get the sent in data off request body
  const { title, description, image } = req.body;
  const userId = req.userId;
let complaint;
  try{
 // Create a complaint with it
complaint = await Complaint.create({
  userId,
  title,
  description,
  date: Date.now(),
  image,
  vote: 0,
  status: "pending",
  feedback: "",
  isApproved: false
});
  }catch(err){
    console.log(err)
  }
 

  if(!complaint){
    return res.status(404).status("not found")
  }

  // respond with the new complaint
  res.json({ complaint });
};


const getNewComplaints = async(req, res, next)=>{


  let complaints;
  try{
    complaints =  await Complaint.find({isApproved:false})
    }catch(err){
      console.log(err)
      return res.status(500).json("error in fetching complaints")   
    }

      if(!complaints){
        return res.status(404).json({message:'Complaints are not found'})
      }
      else{
        return res.status(200).json({complaints})
      }

}

const verifyComplaint = async(req, res, next)=>{

  const complaintId = req.params.id;

  try{
      const complaint =  await Complaint.findByIdAndUpdate(complaintId, {
          $set:{isApproved:req.body.isApproved}
      }, {new:true}
      )

      if(!complaint){
        return res.status(404).json({message:'Complaint is not found'})
      }

      // let msgs = 'Your account request is verified. Login to your account using your creditials'
      // emailsent.sendVerificationEmail(complaint.email, msgs, function(err, msg){
      //     if(err){
      //     console.log(err)
      //     }else{
      //       console.log(msg);
      //     }
      //   })
        
      return res.status(200).json({message:'Complaint is verified'})
     
  }catch(err){
    console.log(err)
    return res.status(500).json("error in update checking in")
      
  }

}

const unverifyComplaint = async(req, res, next) =>{

  const complaintId = req.params.id;

  try{
      const complaint =await Complaint.findByIdAndDelete(complaintId)

      if(!complaint){
        return res.status(404).json({message:'Complaint is not found'})
      }
      // let msgs = `Your account creation request is unverified. Check your entered NIC (${user.NIC}) again and request`
      // emailsent.sendVerificationEmail(user.email, msgs, function(err, msg){
      //     if(err){
      //     console.log(err)
      //     }else{
      //       console.log(msg);
      //     }
      //   })
      return res.status(200).json({message:"Complaint unverified successfull!!!"})
  }catch(err){
    console.log(err)
    return res.status(500).json({message:"Error in unveried complaint"})
      
  }
}

const updateStatus = async(req, res, next)=>{

  const complaintId = req.params.id;

  try{
      const complaint =  await Complaint.findByIdAndUpdate(complaintId, {
          $set:{status:req.body.status}
      }, {new:true}
      )

      if(!complaint){
        return res.status(404).json({message:'Complaint is not found'})
      }


        
      return res.status(200).json({message:'Complaint status is updated'})
     
  }catch(err){
    console.log(err)
    return res.status(500).json("error in update status")
      
  }

}

// Complaint creator update complaint
const updateComplaint = async (req, res) => {
  // Get the id off the url
  const complaintId = req.params.id;

  // Get the data off the req body
  const { title, description, image } = req.body;

  // Find and update the record
  const updatedComplaint = await Complaint.findByIdAndUpdate(complaintId, {
    title,
    description,
    image,
  }, { new: true });

  // Respond with it
  res.json({ updatedComplaint });
};

const deleteComplaint = async (req, res) => {
  // get id off url
  const complaintId = req.params.id;

  // Delete the record
  try {
    await Complaint.deleteOne({ _id: complaintId });
    res.status(200).json({ success: "Record deleted" });
  } catch (e) {
    res.status(500).json({ error: "Could not delete" });
  }
};

module.exports = {
  fetchComplaints,
  fetchComplaint,
  createComplaint,
  updateComplaint,
  deleteComplaint,
  getByUserID,
  getNewComplaints,
  verifyComplaint,
  unverifyComplaint,
  updateStatus
};