import React from 'react'
import { ListItem, ListItemText, Box, Link} from '@mui/material';

const BookmarkItem = ({bookmark, level,textColor}) => {


  return (
    <>
    <ListItem sx={{ m:0, p:0, marginLeft: `${(level*6)}px`}} key={bookmark.createdAt}>
              {bookmark.favIconUrl && (<Box component='img' sx={{maxHeight:'1.1rem'}} src={bookmark.favIconUrl}/>)}
                <ListItemText 
                  disableTypography 
                  primary={<Link sx={textColor} href={bookmark.url} target='_blank' >{bookmark.title}</Link>}
                  />
    </ListItem>
  </>
  )
}

export default BookmarkItem