const docModel = require("../models/docModel");
const userModel = require("../models/userModel");
const mongoose = require('mongoose');

const getCurrDoc = async (req, res) => {
  const { docId, userId } = req.body;

  if (!userId || !docId) {
    return res.status(400).json({ success: false, message: "User ID and Document ID are required." });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid user" });
    }

    const doc = await docModel.findById(docId);
    if (!doc) {
      return res.status(404).json({ success: false, message: "Invalid document" });
    }

    return res.json({
      success: true,
      message: "Document fetched successfully",
      doc: doc,
    });

  } catch (error) {
    console.error("Error fetching document:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const createDocs = async (req, res) => {
  const { userId, docName,desc } = req.body;

  // Check if userId is provided
  if (!userId) {
    console.error("User ID is required.");
    return res.status(400).json({ success: false, message: "User ID is required." });
  }

  try {
    // Validate if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      console.error("Invalid user ID:", userId);
      return res.status(404).json({ success: false, message: "Invalid user" });
    }

    // Create the document
    const doc = await docModel.create({
      uploadedBy: userId,
      title: docName,
      desc
    });

    console.log("Document created successfully:", doc._id);
    return res.status(201).json({
      success: true,
      message: "Document created successfully",
      docId: doc._id,
    });
  } catch (error) {
    console.error("Error creating document:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


const updateDoc = async (req, res) => {
  const { userId, content, docId } = req.body;

  if (!userId || !docId) {
    return res.status(400).json({ success: false, message: "User ID and Document ID are required." });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid user" });
    }

    const doc = await docModel.findByIdAndUpdate(docId, {
      content: content,
      lastUpdate: new Date()
    }, { new: true });

    if (!doc) {
      return res.status(404).json({ success: false, message: "Document not found" });
    }

    return res.json({ success: true, message: "Document updated successfully",doc:doc });

  } catch (error) {
    console.error("Error updating document:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const AllDocs = async (req, res) => {
  const { userId } = req.body;

  // Validate if userId is provided and is a valid ObjectId
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: "Invalid or missing user ID." });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const docs = await docModel.find({ uploadedBy: userId });
    return res.status(200).json({
      success: true,
      message: "Documents fetched successfully",
      docs: docs,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const DeleteDoc=async(req,res)=>{
  let {userId,docId} = req.body;
  let user = await userModel.findById(userId);
  if(user){
    let doc = await docModel.findByIdAndDelete(docId);
    return res.json({success:true,message:"Document deleted successfully"});
  }
  else{
    return res.json({success:false,message:"Invalid user"})
  }
}

module.exports = { getCurrDoc, DeleteDoc ,createDocs, updateDoc, AllDocs };
