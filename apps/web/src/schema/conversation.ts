import mongoose from "mongoose";

const conversationModel = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    roomId: {
        type: String,
        required: true,
    },
    embeddedMessages: {
        type: Array,
        default: []
    },
}, {
    timestamps: true,
});

// Check if model already exists to prevent OverwriteModelError
const Conversation = mongoose.models.Conversation || mongoose.model("Conversation", conversationModel);

export default Conversation;