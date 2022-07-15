import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Typography } from '@mui/material';
import { StyledList } from './styles';
import {GetFolders} from '../../actions/folders';

import BookmarkFolder from './BookmarkFolder';
import Requests from './Requests';

const BookmarkFolderMain = () => {
  const dispatch = useDispatch();
  const { folders, sentFolders, recievedFolders, favoriteFolders } = useSelector((state)=>state.folderSlice)
  const [showRequests, setShowRequests] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showFolders, setShowFolders] = useState(false);
  const [selected, setSelected] = useState('');

  const recievedFoldersPending = recievedFolders.filter((invite) => invite.status === 'unseen');
  

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

    <Container sx={{display:'flex',flexDirection:'column', margin:0, padding:0}}>
      <Button onClick={toggleShowRequests}>Requests ({recievedFoldersPending.length})</Button>
      <Button onClick={toggleShowFavorites}>Favorites ({favoriteFolders.length})</Button>
      <Button onClick={toggleShowFolders}>Folders ({folders.length})</Button>
      <StyledList subheader={<li />}>
        {showFolders && folders && folders.length === 0 && (<Typography sx={{color:'secondary.main'}}>You currently have no bookmark folders created or joined</Typography>)}
        {showFolders && folders && folders.map((folder,index) => (<BookmarkFolder key={index} folder={folder} level={1} selected={selected} setSelected={setSelected}/>))}

        {showRequests && recievedFoldersPending && recievedFoldersPending.map((inviteToFolder,index) => (<Requests key={index} inviteToFolder={inviteToFolder} selected={selected} setSelected={setSelected}/>))}
        {showRequests && recievedFoldersPending && recievedFoldersPending.length === 0 && (<Typography sx={{color:'secondary.main'}}>You currently have no requests to join a bookmark folder</Typography>)}

        {showFavorites && favoriteFolders.length === 0 && (<Typography sx={{color:'secondary.main'}}>You currently have no favorite bookmark folders</Typography>)}
        {showFavorites && favoriteFolders && favoriteFolders.map((folder,index) => (<BookmarkFolder key={index} folder={folder} level={1} selected={selected} setSelected={setSelected}/>))}


      </StyledList>
    </Container>
  )
}

export default BookmarkFolderMain
