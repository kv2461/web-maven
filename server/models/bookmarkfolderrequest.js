import mongoose from 'mongoose';

const bookmarkFolderSchema = new mongoose.Schema({
    requester: {
        type: String,
        required: true,
    },
    recipient: {
        type: String,
        required: true,
    },
    rights: {
        type:String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    bookmarkFolderId: {
        type: String,
        required: true, 
    }
})

const BookmarkFolder = mongoose.model('BookmarkFolder', bookmarkFolderSchema);

export default BookmarkFolder;