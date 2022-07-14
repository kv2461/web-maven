import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, ListItemText, Box, Link, IconButton, Typography } from '@mui/material';
import { DeleteForever } from '@mui/icons-material';
import { DeleteBookmark } from '../../actions/folders';
import { CLEAR_BOOKMARK_ERROR } from '../../reducers/folders'

const BookmarkItem = ({ bookmark, level, textColor, folder, isFolderCreator, isMainCreator, isEditor, setCollapseFolder, collapseFolder }) => {
  const user = JSON.parse(localStorage.getItem('web-maven-profile'))
  const dispatch = useDispatch();
  const isBookmarkCreator = Boolean(bookmark?.creator === user.result._id);

  //need an info button, which shows delete button and actual url and created by 

  //should make a way to have a favorite bookmark folder for users - favorite can be done by everyone


  const deleteBookmark = async() => {
    dispatch(CLEAR_BOOKMARK_ERROR());
    dispatch(DeleteBookmark(folder._id, bookmark));
  }


  return (
    <>
    <ListItem sx={{ m:0, p:0, paddingLeft: `${(level*6)}px`}} key={bookmark.createdAt}>
              {bookmark.favIconUrl && (<Box component='img' sx={{maxHeight:'1.1rem'}} src={bookmark.favIconUrl}/>)}
                <ListItemText 
                  disableTypography 
                  primary={<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <Link sx={textColor} href={bookmark.url} target='_blank' >{bookmark.title}</Link>
                            {(isFolderCreator || isMainCreator || isBookmarkCreator) && <IconButton onClick={()=>{deleteBookmark()}}>
                              <DeleteForever sx={{color:'#35A7FF', fontSize:'1.2rem'}}/>
                            </IconButton>}
                            </div>}
                  />
                  
    </ListItem>
  </>
  )
}

export default BookmarkItem