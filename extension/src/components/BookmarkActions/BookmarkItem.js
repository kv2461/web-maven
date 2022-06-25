import React from 'react'
import { ListItem, ListItemText, Box, Link} from '@mui/material';

const BookmarkItem = ({bookmark, level}) => {


  return (
    <>
    <ListItem sx={{marginLeft: `${level*5}px`}} key={bookmark.createdAt}>
              {bookmark.favIconUrl && (<Box component='img' sx={{maxHeight:'1.1rem'}} src={bookmark.favIconUrl}/>)}
                <ListItemText 
                  disableTypography 
                  primary={<Link href={bookmark.url} target='_blank' >{bookmark.title}</Link>}
                  />
    </ListItem>
  </>
  )
}

export default BookmarkItem