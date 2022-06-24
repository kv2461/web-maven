import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Autocomplete, Switch, FormControlLabel } from '@mui/material';

const CreateFolder = ({showAdd}) => {
    const dispatch = useDispatch();
    const { friendArray } = useSelector((state)=>state.mainSlice)
    const user = JSON.parse(localStorage.getItem('web-maven-profile'));
    const initialFolderState = { title:'', creator:user.result._id, users:[], mainFolder:true, availableToFriends:false };
    const [newFolder, setNewFolder] = useState(initialFolderState);
    const [showCreate, setShowCreate] = useState(false);
    const [editors, setEditors] = useState([]);
    const [viewers, setViewers] = useState([]);

    const handleViewable = () => {
      setNewFolder({...newFolder, availableToFriends:!newFolder.availableToFriends})
    }

    useEffect(()=>{
      if (!newFolder.availableToFriends) {
        setViewers([]);
      }
    },[newFolder.availableToFriends])

    useEffect(()=>{
      if (!showCreate) {
        setViewers([])
        setEditors([])
        setNewFolder(initialFolderState);
      }
    },[showCreate])


  return (
    <>
    <Button onClick={()=>setShowCreate(!showCreate)}>Create Folder</Button>
        {showAdd && showCreate && (<div>
                <TextField 
                  required
                  label="Folder Name"
                  value={newFolder.folderName}
                  onChange={(e)=>setNewFolder({...newFolder,title:e.target.value})}
                  type='text'
                />

                <Autocomplete
                  multiple
                  disablePortal
                  id="invite-editors"
                  options={friendArray}
                  value={editors}
                  onChange={(event,value)=>setEditors(value)}
                  getOptionLabel={option => option.username}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Invite Editors" placeholder="Invite Editors"/>}
                 />

                <FormControlLabel control={<Switch value={newFolder.availableToFriends} onChange={handleViewable}/>} label="All Friends Can View" />

                {newFolder.availableToFriends && (<Autocomplete
                  multiple
                  disablePortal
                  id="invite-editors"
                  options={friendArray}
                  value={viewers}
                  onChange={(event,value)=>setViewers(value)}
                  getOptionLabel={option => option.username}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Invite Viewers" placeholder="Invite Viewers"/>}
                />)}
                

                <Button sx={{color:'secondary.main'}} onClick={()=>{}}>Create</Button>
        </div>)}
    </>
  )
}

export default CreateFolder