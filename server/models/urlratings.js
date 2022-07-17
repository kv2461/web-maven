import mongoose from 'mongoose';

const urlRatingsSchema = new mongoose.Schema({
    
    url: {
        type:String,
        required:true,
    },
    ratings: {
        type: [String],
        required: true,
    },
    raters: {
        type:[String],
        required: true,
    }
    
})

const UrlRatings = mongoose.model('UrlRatings', urlRatingsSchema);

export default UrlRatings;