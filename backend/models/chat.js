const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

  chatName: { type: String, trim: true },
  users:
    [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },

},
  { timestamps: true }
)

module.exports = mongoose.model('Chat', chatSchema);


// users = [noelanfe(63428bc505d15578996809fa), ]
// latestMessage = ("palitan ng message_Id")
