import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type:String,
        required:true,
    },
    friends: {
        type:[String],
        default:[]
    },
    bookmarkfolders: {
        type:[Object],
        default:[]
    },
    favoriteFolders: {
        type:[Object],
        default:[]
    },
    favoriteBookmarks: {
        type:[Object],
        default:[]
    }

})

const User = mongoose.model('User', userSchema);

export default User;