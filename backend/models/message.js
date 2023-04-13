const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "user" 
    },
  content: { 
      type: String, 
      trim: true 
    },
  chat: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Chat" 
    },
  readBy: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "user" 
    }],
},
  { timestamps: true }
)

module.exports = mongoose.model("Message", messageSchema);

// sender = noelanfe(63428bc505d15578996809fa)
// content = "hello po"
// chat = ('palitan ng chat_Id')
// readBy = [user1, user2]