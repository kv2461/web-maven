import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const BookmarkFolder = () => {
  const { folders, sentFolders, recievedFolders } = useSelector((state)=>state.folderSlice)

  useEffect(()=> {
    console.log(folders)
    console.log(sentFolders)
    console.log(recievedFolders)
  },[])
  return (
    <div>BookmarkFolder</div>
  )
}

export default BookmarkFolder