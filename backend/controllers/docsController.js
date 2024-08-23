const docModel = require("../models/docModel");
const userModel = require("../models/userModel");

const getCurrDoc = async (req, res) => {
  const { docId, userId } = req.body;

  // Check if docId and userId are provided
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
  let { userId, docName } = req.body;
  let user = userModel.findById(userId);
  if (user) {
    let doc = await docModel.create({
      uploadedBy: userId,
      title: docName,
    });
    return res.json({
      success: true,
      message: "Document created Successfully",
      docId: doc._id,
    });
  } else {
    return res.json({ success: false, message: "invalid user" });
  }
};

const updateDoc = async (req, res) => {
  let { userId, content, docId } = req.body;
  let user = userModel.findById(userId);
  if (user) {
    let doc = await docModel.findByIdAndUpdate(docId, {
      content: content,
    });
    return res.json({ success: true, message: "doc updated successfully" });
  } else {
    return res.json({ success: false, message: "invalid user" });
  }
};

const AllDocs=async(req,res)=>{

}
module.exports = { getCurrDoc, createDocs, updateDoc,AllDocs };
