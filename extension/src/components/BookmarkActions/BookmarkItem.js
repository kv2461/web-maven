import React from 'react'
import { ListItem, ListItemText, Box, Link, IconButton } from '@mui/material';
import { DeleteForever } from '@mui/icons-material';

const BookmarkItem = ({ bookmark, level, textColor, folder, isFolderCreator, isMainCreator, isEditor }) => {
  const user = JSON.parse(localStorage.getItem('web-maven-profile'))
  const isBookmarkCreator = Boolean(bookmark?.creator === user.result._id);
  //need to make it so that only creator of bookmark folder, maincreator of parent folder, or creator of bookmark can delete
  //need an info button, which shows delete button and actual url and created by 

  //should make a way to have a favorite bookmark folder for users - favorite can be done by everyone


  const deleteBookmark = () => {
    console.log(bookmark);
    console.log(folder);
    console.log(isFolderCreator);
    console.log(isMainCreator);
    console.log(isBookmarkCreator);
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