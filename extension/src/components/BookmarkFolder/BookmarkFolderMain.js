import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GetFolders} from '../../actions/folders';

import BookmarkFolder from './BookmarkFolder';

const BookmarkFolderMain = () => {
  const dispatch = useDispatch();
  const { folders, sentFolders, recievedFolders } = useSelector((state)=>state.folderSlice)

  useEffect(()=> {
    dispatch(GetFolders())
    console.log(folders)
    console.log(sentFolders)
    console.log(recievedFolders)
  },[])
  return (
    <div>
      <p>Bookmark Folder REQUESTS AND SENT</p>
      <p>Bookmark Folder CREATED</p>
      {folders && folders.map((folder,index) => (<BookmarkFolder key={index} folder={folder}/>))}
    </div>
  )
}

export default BookmarkFolderMain

//i want collapsing and recursion

//this should also be a list