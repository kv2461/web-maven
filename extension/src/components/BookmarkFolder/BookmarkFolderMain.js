import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, List, Container } from '@mui/material';
import { StyledList } from './styles';
import {GetFolders} from '../../actions/folders';

import BookmarkFolder from './BookmarkFolder';

const BookmarkFolderMain = () => {
  const dispatch = useDispatch();
  const { folders, sentFolders, recievedFolders } = useSelector((state)=>state.folderSlice)
  const [showRequests, setShowRequests] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showFolders, setShowFolders] = useState(false);
  const [selected, setSelected] = useState('');

  useEffect(()=> {
    dispatch(GetFolders())
  },[])


  return (

    <Container sx={{display:'flex',flexDirection:'column'}}>
      <Button>Requests</Button>
      <Button>Favorites</Button>
      <Button onClick={()=>setShowFolders(!showFolders)}>Folders</Button>
      <StyledList subheader={<li />}>
        {showFolders && folders && folders.map((folder,index) => (<BookmarkFolder key={index} folder={folder} level={1} selected={selected} setSelected={setSelected}/>))}
      </StyledList>
    </Container>
  )
}

export default BookmarkFolderMain

//i want collapsing and recursion

//this should also be a list

{/* <li key={itemKey}>
<ul>
   {index > 0 ? <Divider sx={{borderBottomWidth:3}} /> : null}
    { subgenre === 'foodRecipe' ? 
      <ListSubheader sx={{fontWeight:700 ,lineHeight:1, p:2}} >{`${name?.charAt(0).toUpperCase()}${name?.slice(1)}`}</ListSubheader>
     : <ListSubheader sx={{fontWeight:700 ,lineHeight:1, p:2}} >{index + 1} - {name}</ListSubheader>
    }

    <ListItem key={itemKey}>
      {subgenre === 'foodRecipe' && image !== null && (<Box component='img' sx={{m:1,p:1, maxHeight:'40px', maxWidth:'40px'}} src={image}/>)}
        <ListItemText 
          disableTypography 
          primary={ <> */}