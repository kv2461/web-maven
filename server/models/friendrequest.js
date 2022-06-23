import mongoose from 'mongoose';

const friendRequestSchema = new mongoose.Schema({
    requester: {
        type: String,
        required: true,
    },
    recipient: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    }
})

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

export default FriendRequest;