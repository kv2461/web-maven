import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button} from '@mui/material';

import Bookmark from './Bookmark';

const BookmarkActions = () => {
    const dispatch = useDispatch();
    const { folders } = useSelector((state)=>state.folderSlice);
    
    // useEffect(() => {
    //   for (let i=0; i<friends.length; i++) {
    //     dispatch(SearchById(friends[i],'friends'))
    //   } this was from similar actions page, saving the folder infos searched by id might be a good idea also here so  that bookmarking can build subfolders per recursive load since
    //they only have access to the id of first folder they have rights to, but have right  to save over any  subfolders lower than  theirs

    // }, [])
    


  return (
    <>
            <Bookmark />
            <Button>Edit Folder</Button>
            <Button>Add Bookmark</Button>
    </>
  )
}

export default BookmarkActions