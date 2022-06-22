import React,{ useState } from 'react'
import { Button, TextField } from '@mui/material'

const Interface = ({url}) => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'));
    const initialFolderState = { folderName:'', creator:'', users:[], bookmarks:[] };
    const [showAdd, setShowAdd] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [newFolder, setNewFolder] = useState(initialFolderState);

  return (
    <>
        <div style={{display:'flex',flexDirection:'row'}}>
            <Button onClick={()=>setShowAdd(!showAdd)}>+</Button>
            <Button>-</Button>
        </div>
        <div>
            {showAdd && (<>
            <Button onClick={()=>setShowCreate(!showCreate)}>Create Folder</Button>
            <Button>Edit Folder</Button>
            <Button>Add Bookmark</Button>
            </>
            )}
        </div>
        {showAdd && showCreate && (
            <div>
                <TextField 
                required
                fullWidth
                label="Folder Name"
                value={newFolder.folderName}
                onChange={(e)=>setNewFolder({...newFolder,folderName:e.target.value})}
                type='text'/>
                <Button sx={{color:'secondary.main'}} onClick={()=>{}}>Create</Button>
            </div>
        )}
    </>
  )
}

export default Interface