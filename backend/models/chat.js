const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

  chatName: 
    { 
      type: String, 
      trim: true 
    },
    // Added this so that it would be bound by an model (Inquiry or Offer)
  inquiry_id:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inquiry",
      required: false
    },
  offer_id:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      required: false
    },
  users:
    [{
      
    type: mongoose.Schema.Types.ObjectId,
      
    ref: "user"
    
  }],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  isArchived:{
    type: Boolean,
    default: false
  }

},
  { timestamps: true }
)

module.exports = mongoose.model('Chat', chatSchema);


// users = [noelanfe(63428bc505d15578996809fa), ]
// latestMessage = ("palitan ng message_Id")
