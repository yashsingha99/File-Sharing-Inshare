const User = require("../Model/user.model");
const File = require("../Model/file.model");

const addFile = async (req, res) => {
  try
   {
    const { user, snapshot, downloadURL } = req.body;
    if (!snapshot || !downloadURL || !user)
      return res.status(400).json({ message: "Insufficient data" });

    const username = user.username;
    const email = user.emailAddresses.emailAddress;

    const checkUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!checkUser) {
      return res.status(400).json({ message: "User doesn't found" });
    }

    const newFile = await File.create({
      filename: snapshot.fileName,
      path: downloadURL,
      size: snapshot.fileSize,
      sender: checkUser._id,
      type : snapshot.type
    });

    const updatedUser = await User.findByIdAndUpdate(
      checkUser._id,
      {
        $addToSet: { files: newFile },
        $inc: { 
          leftFiles: 1,
          leftData: snapshot.fileSize / 1000000 
        }
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      data: { newFile, updatedUser },
      message: "successfully File created",
    });

    
  } catch (error) {
    console.log("addFile => ", error);
  }
};

const updatePassword = async (req, res) => {
  try 
  {

    const { fileId, password } = req.body;
    if (!fileId || !password)
      return res.status(400).json({ message: "Insufficient data" });


    const respond = await File.findByIdAndUpdate(
      fileId,
      {
        password,
      },
      {
        new: true,
      }
    );

    if (!respond) return res.status(400).json({ message: "File doesn't find" });
    res.status(200).json({ respond, message: "Successfully updated" });


  } catch (error) {
    console.log("updatePassword => ", error);
  }
};

const fetchFile = async (req, res) => {
  try {
    const val = req.body;
    if (!val) return res.status(400).json({ message: "Insufficient data" });


    const respond = await File.findById(val.id);
    if (!respond) return res.status(400).json({ message: "File doesn't find" });


    res.status(200).json({ respond });


  } catch (error) {
    console.log("fetchFile => ", error);
  }
};

const userFiles = async (req, res) => {
  try {
    const user = req.body;
    if (!user) return res.status(400).json({ message: "Insufficient data" });

    const email = user.emailAddresses[0].emailAddress;
    const username = user.username;

    const respond = await User.findOne({
      $or: [{ email, username }],
    }).populate("files");

    if (!respond) res.status(400).json({ message: "User doesn't exist" });


    const allFiles = respond.files;
    res
      .status(200)
      .json({
        data: allFiles,
        message: "Sucessfully fetched all user's files",
      });


  } catch (error) {
    console.log(error);
  }
};

const unActiveFile = async (req, res) => {
  try {
    const {fileId} = req.body;
    console.log(fileId);
    if (!fileId) return res.status(400).json({ message: "Insufficient data" });
    const updateFile = await File.findByIdAndUpdate(
      fileId,
      {
        status: false,
      },
      {
        new: true,
      }
    );
    if (!updateFile)
      return res.status(400).json({ message: "file doesn't exist" });
    res.status(200).json({ updateFile, message: "sucessfully updated status" });
  } catch (error) {
    console.log(" unActiveFile ", error);
  }
};

module.exports = {
  addFile,
  updatePassword,
  fetchFile,
  userFiles,
  unActiveFile,
};
