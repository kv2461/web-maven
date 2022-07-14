import mongoose from 'mongoose';

const bookmarkFolderSchema = new mongoose.Schema({
    
    title: {
        type:String,
        required:true,
    },
    creator: {
        type: String,
        required: true,
    },
    editors: {
        type:[String],
        default:[]
    },
    viewers: {
        type:[String],
        default:[]
    },
    createdAt: {
        type:Date,
        default:new Date(),
    },
    availableToFriends: {
        type:Boolean,
        default:false,
    },
    bookmarks: {
        type:[Object],
        default:[],
    },
    mainFolder: {
        type:Boolean,
        required:true,
    },
    subFolders: {
        type:[String],
        default:[]
    },
    parentFolders: {
        type:[String],
    },
    parentFolder: {
        type:String,
    },
    mainParentFolder:{
        type:String,
    },
    mainCreator:{
        type:String,
    }
    
})

const BookmarkFolder = mongoose.model('BookmarkFolder', bookmarkFolderSchema);

export default BookmarkFolder;