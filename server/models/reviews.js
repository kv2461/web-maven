import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    
    url: {
        type:String,
        required:true,
    },
    userId: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    createdAt: {
        type:Date,
        default:new Date(),
    },
    rating: {
        type: String,
    },
    approval: {
        type: Number,
        default:0
    },
    voters: {
        type: [String],
        default:[]
    },
    downVoters: {
        type: [String],
        default:[]
    }

    
})

const Review = mongoose.model('Review', reviewSchema);

export default Review;