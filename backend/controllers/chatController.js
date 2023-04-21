// const asyncHandler = require("express-async-handler");
const Chat = require("../models/chat");
const User = require("../models/user");
const ErrorHandler = require('../utils/errorHandler');


//@description     Create or fetch One to One Chat
//@route           POST /api/v1/chat/
//@access          Protected
exports.accessChat = async (req, res, next) => {
  console.log(req.body);
  const  userId = req.body.userId;
const inquiry_id = req.body.inquiry_id
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: req.body.chatName,
      users: [req.user._id, userId],
      inquiry_id: inquiry_id
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }

}


//@description     Fetch all chats for a user
//@route           GET /api/v1/chat/
//@access          Protected
exports.fetchChats = async (req, res, next) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("inquiry_id")
      //   .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (chats) => {
        chats = await User.populate(chats, {
          path: "latestMessage.sender",
          select: "name avatar email",
        });
        res.status(200).json({
          success: true,
          chats
        })




        // .send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}


