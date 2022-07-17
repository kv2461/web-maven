import mongoose from 'mongoose';

const userUrlRatingsSchema = new mongoose.Schema({
    
    url: {
        type:String,
        required:true,
    },
    rating: {
        type: Number,
        required: true,
    },
    userId: {
        type:String,
        required: true,
    },
    createdAt: {
        type:Date,
        default:new Date(),
    },
    review: {
        type: String,
    }

    
})

const UserUrlRatings = mongoose.model('UserUrlRatings', userUrlRatingsSchema);

export default UserUrlRatings;