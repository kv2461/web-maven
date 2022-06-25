import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { GetFolders } from '../../actions/folders';

import AddBookmark from './AddBookmark';

const BookmarkActions = ({showBookmark, url, tab}) => {
    const dispatch = useDispatch();
    const { folders } = useSelector((state)=>state.folderSlice);
    const [selected, setSelected] = useState('');
    
    useEffect(()=> {
      dispatch(GetFolders())
    },[])
    


  return (
    <>
            <AddBookmark showBookmark={showBookmark} url={url} tab={tab} folders={folders} setSelected={setSelected} selected={selected}/>
            <Button>Edit Bookmark</Button>
    </>
  )
}

export default BookmarkActions