import mongoose from 'mongoose';

const bookmarkFolderRequestSchema = new mongoose.Schema({
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

const BookmarkFolderRequest = mongoose.model('BookmarkFolderRequest', bookmarkFolderRequestSchema);

export default BookmarkFolderRequest;