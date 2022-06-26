import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Typography } from '@mui/material';
import { StyledList } from './styles';
import {GetFolders} from '../../actions/folders';

import BookmarkFolder from './BookmarkFolder';
import Requests from './Requests';

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

  const toggleShowRequests = () => {
    setShowRequests(!showRequests);
    setShowFavorites(false);
    setShowFolders(false);
  }

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
    setShowRequests(false);
    setShowFolders(false);
  }

  const toggleShowFolders = () => {
    setShowFolders(!showFolders);
    setShowFavorites(false);
    setShowRequests(false);
  }


  return (

    <Container sx={{display:'flex',flexDirection:'column'}}>
      <Button onClick={toggleShowRequests}>Requests</Button>
      <Button onClick={toggleShowFavorites}>Favorites</Button>
      <Button onClick={toggleShowFolders}>Folders</Button>
      <StyledList subheader={<li />}>
        {showFolders && folders && folders.length === 0 && (<Typography sx={{color:'secondary.main'}}>You currently have no bookmark folders created or joined</Typography>)}
        {showFolders && folders && folders.map((folder,index) => (<BookmarkFolder key={index} folder={folder} level={1} selected={selected} setSelected={setSelected}/>))}

        {showRequests && recievedFolders && recievedFolders.map((inviteToFolder,index) => (<Requests key={index} inviteToFolder={inviteToFolder} selected={selected} setSelected={setSelected}/>))}
        {showRequests && recievedFolders && recievedFolders.length === 0 && (<Typography sx={{color:'secondary.main'}}>You currently have no requests to join a bookmark folder</Typography>)}

        {showFavorites && (<Typography sx={{color:'secondary.main'}}>You currently have no favorite bookmark folders</Typography>)}
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

          //to see if an editor or viewer is pending, the folder's info via hover info box or edit will show it