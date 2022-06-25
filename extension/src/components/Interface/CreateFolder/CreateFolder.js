import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Autocomplete, Switch, FormControlLabel } from '@mui/material';

import { CreateNewFolder } from '../../../actions/folders';

const CreateFolder = ({ showAdd, mainFolder,folderInfo, setShowAddSubFolder, setShowAdd }) => {
    const dispatch = useDispatch();
    const { friendArray } = useSelector((state)=>state.mainSlice)
    const user = JSON.parse(localStorage.getItem('web-maven-profile'));
    let initialFolderState = { title:'', creator:user.result._id, editors:[], viewers:[], mainFolder:mainFolder, availableToFriends:false};
    const [newFolder, setNewFolder] = useState(initialFolderState);
    const [editors, setEditors] = useState([]);
    const [viewers, setViewers] = useState([]);

    if (mainFolder === false) {
      initialFolderState = { title:'', creator:user.result._id, mainFolder:mainFolder, subFolders:[], parentFolders:[...folderInfo.parentFolders,folderInfo._id], parentFolder:folderInfo._id };
    }

    const createNewFolder = () => {
      dispatch(CreateNewFolder(newFolder, editors, viewers));
      setShowAdd(false);
      if (!mainFolder) {
        setShowAddSubFolder(false);
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

    useEffect(()=>{
      if (!showAdd) {
        setViewers([])
        setEditors([])
        setNewFolder(initialFolderState);
      }
    },[showAdd])


  return (
    <>
        {!mainFolder && showAdd && (<div>
            <TextField 
              required
              label="Folder Name"
              value={newFolder.title}
              onChange={(e)=>setNewFolder({...newFolder,title:e.target.value})}
              type='text'
            />

            <Button sx={{color:'secondary.main'}} onClick={createNewFolder} disabled={Boolean(newFolder.title.trim() === '')}>Create</Button>
          </div>)}

        {showAdd && (<div>
                <TextField 
                  required
                  label="Folder Name"
                  value={newFolder.title}
                  onChange={(e)=>setNewFolder({...newFolder,title:e.target.value})}
                  type='text'
                />
              
                {mainFolder && (<Autocomplete
                  multiple
                  disablePortal
                  id="invite-editors"
                  options={friendArray}
                  value={editors}
                  onChange={(event,value)=>setEditors(value)}
                  getOptionLabel={option => option.username}
                  sx={{ width: 300 }}
                  noOptionsText={'No Friends'}
                  renderInput={(params) => <TextField {...params} label="Invite Editors" placeholder="Invite Editors"/>}
                 /> )}

                {mainFolder && (<FormControlLabel control={<Switch value={newFolder.availableToFriends} onChange={handleViewable}/>} label={newFolder.availableToFriends ? 'Available to all friends' : 'Private viewers optional'} />)}


                {!newFolder.availableToFriends && mainFolder && (<Autocomplete
                  multiple
                  disablePortal
                  id="invite-viewers"
                  options={friendArray}
                  value={viewers}
                  onChange={(event,value)=>setViewers(value)}
                  getOptionLabel={option => option.username}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Invite Viewers" placeholder="Invite Viewers"/>}

                  
                />)}
                

                <Button sx={{color:'secondary.main'}} onClick={createNewFolder} disabled={Boolean(newFolder.title.trim() === '')}>Create</Button>


        </div>)}
    </>
  )
}

export default CreateFolder