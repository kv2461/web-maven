import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, ListItem, ButtonBase, Collapse, Button } from '@mui/material';
import { Folder } from '@mui/icons-material';
import { SearchById } from '../../actions/main';
import { SearchFolderById } from '../../actions/folders';


const Requests = ({selected, setSelected, inviteToFolder}) => {
  const dispatch = useDispatch();
  const [folderInfo, setFolderInfo] = useState();
  const [friendInfo, setFriendInfo] = useState();
  const [folderId, setFolderId] = useState(1);
  const [collapseInvite, setCollapseInvite] = useState(false);

  useEffect(()=> {
    const getInfo = async () => {
      const data = await dispatch(SearchFolderById(inviteToFolder.bookmarkFolderId));

      setFolderInfo(data);
    }

    getInfo()

  },[inviteToFolder])

  useEffect(()=> {
    if (folderInfo && folderInfo.creator) {
      const getInfo = async () => {
        const data = await dispatch(SearchById(folderInfo?.creator,'friends'));

        setFriendInfo(data);
      }
    getInfo()
    }
  },[folderInfo])

  const selectFolder = () => {
    setFolderId(folderInfo._id);
    setSelected(inviteToFolder.bookmarkFolderId);
    setCollapseInvite(!collapseInvite);
  }

  useEffect(()=> {
    if (selected!==folderInfo?._id) {
    setCollapseInvite(false);
  }
  },[selected, folderInfo])


  const accept = () => {
    console.log(inviteToFolder._id)
    console.log(folderId)
  }

  const deny = () => {
    console.log(inviteToFolder._id)
  }



  return (
    <div style={{margin:0,padding:0, display:'flex', flexDirection:'row'}}>
    <ListItem sx={{m:0,p:0, marginLeft:0, display:'flex', flexDirection:'column', alignItems:'flex-start'}} >
      <ButtonBase  sx={{m:0,p:0, marginLeft:0, display:'flex', flexDirection:'column', alignItems:'flex-start'}} onClick={selectFolder}>
        <div>
          <Folder sx={{fontSize:'1.2rem', color:'#F8ECD1'}}/>    
          <Typography sx={selected === folderId ?{color:'primary.main'}:null}variant='h8'><strong>{folderInfo?.title}</strong></Typography>
        </div>
         <Typography variant='h10'>from {friendInfo?.username}</Typography>
      </ButtonBase>
         
      
    <Collapse sx={{m:0,p:0}} in={collapseInvite} timeout="auto" unmountOnExit>
      <Typography>-an invitation to <strong>{inviteToFolder?.rights.slice(0,4).toUpperCase()}</strong></Typography>
    </Collapse>
    </ListItem>

    {collapseInvite && (
    <Box sx={{margin:0,padding:0, display:'flex', flexDirection:'row'}}>
      <Button onClick={accept}>Accept</Button>
      <Button onClick={deny}>Deny</Button>
    </Box>)}
  </div>
  )

}

export default Requests
