import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Autocomplete, Switch, FormControlLabel, Typography, Container } from '@mui/material';

import { CreateNewFolder } from '../../../actions/folders';

const CreateFolder = ({ showCreateFolder , mainFolder, folderInfo, setShowCreateFolder }) => {
    const dispatch = useDispatch();
    const { friendArray } = useSelector((state)=>state.mainSlice)
    const user = JSON.parse(localStorage.getItem('web-maven-profile'));
    const initialFolderState = { title:'', creator:user.result._id, editors:[], viewers:[], mainFolder:mainFolder, availableToFriends:false};
    const [newFolder, setNewFolder] = useState(initialFolderState);
    const [editors, setEditors] = useState([]);
    const [viewers, setViewers] = useState([]);


    useEffect(()=> {
      if (!mainFolder) {
        
        setNewFolder({ title:'', creator:user.result._id, mainFolder:mainFolder, subFolders:[], parentFolders:[...folderInfo?.parentFolders,folderInfo?._id], parentFolder:folderInfo._id });
      }
    },[])

    const createNewFolder = () => {
      dispatch(CreateNewFolder(newFolder, editors, viewers));
      setShowCreateFolder(false);
      if (!mainFolder) {
        setNewFolder({ title:'', creator:user.result._id, mainFolder:mainFolder, subFolders:[], parentFolders:[...folderInfo?.parentFolders,folderInfo?._id], parentFolder:folderInfo._id });
      }
    }

    const handleViewable = () => {
      setNewFolder({...newFolder, availableToFriends:!newFolder.availableToFriends})
    }

    useEffect(()=>{
      if (!newFolder.availableToFriends) {
        setViewers([]);
      }
    },[newFolder.availableToFriends])

  return (
    <>
      <div style={{padding:'1px 0 10px 0'}}>
      {mainFolder && (<Typography sx={{color:'#35A7FF'}} variant='h6'>Create Bookmark Folder</Typography>)}
      {!mainFolder && (<Typography sx={{color:'#35A7FF'}} variant='h6'>Create Subfolder</Typography>)}
      {/* <Typography sx={{color:'#35A7FF', paddingLeft:'5px'}} variant='p'>and invite some friends!</Typography> */}
      </div>

        {!mainFolder && showCreateFolder && (<div> 
            <TextField 
            fullWidth
              required
              label="Folder Name"
              value={newFolder.title}
              onChange={(e)=>setNewFolder({...newFolder,title:e.target.value})}
              type='text'
            />

            <Button sx={{color:'secondary.main'}} onClick={createNewFolder} disabled={Boolean(newFolder.title.trim() === '')}>Create</Button>
          </div>)}


        {showCreateFolder && mainFolder && (<div style={{margin:'0 9px 0 0'}}>
                <TextField style={{margin:'0 5px 5px 5px'}}
                  fullWidth
                  required
                  label="Folder Name"
                  value={newFolder.title}
                  onChange={(e)=>setNewFolder({...newFolder,title:e.target.value})}
                  type='text'
                />
              
                <Autocomplete style={{margin:'0 5px 5px 5px'}}
                  multiple
                  disablePortal
                  id="invite-editors"
                  options={friendArray}
                  value={editors}
                  onChange={(event,value)=>setEditors(value)}
                  getOptionLabel={option => option.username}
                  fullWidth
                  noOptionsText={'No Friends'}
                  renderInput={(params) => <TextField {...params} label="Invite Editors" placeholder="Invite Editors"/>}
                 /> 

               <FormControlLabel control={<Switch style={{margin:'0 5px 5px 5px'}} value={newFolder.availableToFriends} onChange={handleViewable}/>} label={newFolder.availableToFriends ? 'Available to all friends' : 'Private viewers optional'} />


                {!newFolder.availableToFriends  && (<Autocomplete style={{margin:'0 5px 5px 5px'}}
                  multiple
                  disablePortal
                  id="invite-viewers"
                  options={friendArray}
                  value={viewers}
                  onChange={(event,value)=>setViewers(value)}
                  getOptionLabel={option => option.username}
                  fullWidth
                  renderInput={(params) => <TextField {...params} label="Invite Viewers" placeholder="Invite Viewers"/>}

                  
                />)}
                
                
                <Button sx={{color:'secondary.main'}}  onClick={createNewFolder} disabled={Boolean(newFolder.title.trim() === '')}>Create</Button>


        </div>)}
    </>
  )
}

export default CreateFolder