import React, { useState, useEffect } from 'react'
import { Typography, Container, Collapse, Button, Autocomplete, TextField, IconButton } from '@mui/material';
import { DeleteForever, Logout } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { SendEditorRequest, SendViewerRequest } from '../../../actions/folders';
import { SearchById } from '../../../actions/main';
import { CLEAR_EDITOR_ERROR, CLEAR_VIEWER_ERROR } from '../../../reducers/folders';
import Editor from './Editor';
import Viewer from './Viewer';

const People = ({ folderInfo, friends, selected, collapsePeople, level, isMainCreator, deleteBookmarkFolder, removeFromBookmarkFolder }) => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'))
    const dispatch = useDispatch();
    const { friendArray } = useSelector((state)=>state.mainSlice);
    const { addEditorError, addViewerError } = useSelector((state)=>state.folderSlice);
    const [creatorInfo, setCreatorInfo] = useState({});
    const [collapseEditors, setCollapseEditors] = useState(false);
    const [collapseViewers, setCollapseViewers] = useState(false);
    const [addEditors, setAddEditors] = useState(false);
    const [addViewers, setAddViewers] = useState(false);
    const [editors, setEditors] = useState([]);
    const [viewers, setViewers] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [confirmRemove, setConfirmRemove] = useState(false);
    const availableEditors = friendArray.filter((friend) => folderInfo.editors.indexOf(friend._id) === -1 && creatorInfo._id !== friend._id);
    const availableViewers = availableEditors.filter((friend) => folderInfo.viewers.indexOf(friend._id) === -1 );
    const isCreator = Boolean(folderInfo.creator === user.result._id);
    const isEditor = Boolean(folderInfo.editors.indexOf(user.result._id) !== -1);


    useEffect(() => {
        const getInfo = async () => {
          const data = await dispatch(SearchById(folderInfo.creator));
  
          setCreatorInfo(data);
        }
  
        getInfo()
          
      },[folderInfo])

      useEffect(() => {
        const getInfo = async (friend) => {
          const data = await dispatch(SearchById(friend,'friends'));
  
        }
  
        friends.map((friend) => getInfo(friend));
          
      },[friends])


      const sendEditorRequest = async () => {        
        for (let i=0; i < editors.length; i++) {
            await dispatch(SendEditorRequest(editors[i],folderInfo._id));
        }
        setAddEditors(false);
      }

      const sendViewerRequest = async () => {
        for (let i=0; i < viewers.length; i++) {
          await dispatch(SendViewerRequest(viewers[i],folderInfo._id));
      }
      setAddViewers(false);
      }

      useEffect(() => {
        dispatch(CLEAR_EDITOR_ERROR());
      },[collapseEditors, editors, selected, collapsePeople])

      useEffect(() => {
        dispatch(CLEAR_VIEWER_ERROR());
      },[collapseViewers, viewers, selected, collapsePeople])
      
 
  return (
    <Container>
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <Typography>Created by {creatorInfo.username}</Typography>
        <div>
          {(isCreator || isMainCreator) && 
          <IconButton onClick={()=>{setConfirmDelete(!confirmDelete)}}>
            <DeleteForever sx={{color:'#35A7FF', fontSize:'1.2rem'}}/>
          </IconButton>}
        
          {level === 1 && !isCreator && <IconButton onClick={()=>{setConfirmRemove(true)}}>
                  <Logout sx={{color:'#35A7FF', fontSize:'1.2rem'}}/>
          </IconButton>}
        </div>
      </div>

      {confirmDelete && 
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Typography sx={{color:'red'}}>Confirm Delete?</Typography>
            <div>
              <Button onClick={()=>deleteBookmarkFolder(folderInfo)}>Yes</Button>
              <Button onClick={()=>{setConfirmDelete(false)}}>No</Button>
            </div>
          </div>}

          {confirmRemove && 
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Typography sx={{color:'red'}}>Leave Folder?</Typography>
            <div>
              <Button onClick={()=>removeFromBookmarkFolder(user.result._id)}>Yes</Button>
              <Button onClick={()=>{setConfirmRemove(false)}}>No</Button>
            </div>
          </div>}

        {level === 1 && (<><Button onClick={()=>{setCollapseEditors(!collapseEditors);setCollapseViewers(false);}}> {collapseEditors ? 'Hide Editors' : `Editors (${folderInfo.editors.length})`}</Button>
        <Button onClick={()=>{setCollapseViewers(!collapseViewers);setCollapseEditors(false);}}> {collapseViewers ? 'Hide Viewers' : `Viewers (${folderInfo.viewers.length})`}</Button>
        <Collapse in={collapseEditors} timeout='auto' unmountOnExit>
          {folderInfo.editors.map((editor)=> (<Editor folder={folderInfo._id} key={editor} editor={editor} creator={creatorInfo}/>))}
          {(isCreator || isEditor) && <Button onClick={()=>{setAddEditors(!addEditors)}}>{addEditors ? 'Cancel' : 'Add Editors '}</Button>}
          {addEditorError && addEditorError.map((err,i) => (<Typography sx={{color:'secondary.main'}} key={i}>{err}</Typography>))}
          {addEditors && (
            <>
              <Autocomplete style={{margin:'0 5px 5px 5px'}}
                multiple
                disablePortal
                id="invite-editors"
                options={availableEditors}
                value={editors}
                onChange={(event,value)=>setEditors(value)}
                getOptionLabel={option => option.username}
                fullWidth
                noOptionsText={'No Friends'}
                renderInput={(params) => 
                <TextField {...params} label="Invite Editors" placeholder="Invite Editors"/>}
                />
                <Button onClick={()=>{sendEditorRequest()}}>Add Editors</Button>
            </>)}
            
        </Collapse>

        <Collapse in={collapseViewers} timeout='auto' unmountOnExit>
            {folderInfo.viewers.map((viewer)=> (<Viewer folder={folderInfo._id} key={viewer} viewer={viewer} creator={creatorInfo} isEditor={isEditor}/>))}
            {(isCreator || isEditor) && <Button onClick={()=>{setAddViewers(!addViewers)}}>{addViewers ? 'Cancel' : 'Add Viewers'}</Button>}
            {addViewerError && addViewerError.map((err,i) => (<Typography sx={{color:'secondary.main'}} key={i}>{err}</Typography>))}
            {addViewers && (
            <>
                <Autocomplete style={{margin:'0 5px 5px 5px'}}
                    multiple
                    disablePortal
                    id="invite-editors"
                    options={availableViewers}
                    value={viewers}
                    onChange={(event,value)=>setViewers(value)}
                    getOptionLabel={option => option.username}
                    fullWidth
                    noOptionsText={'No Friends'}
                    renderInput={(params) => <TextField {...params} label="Invite Viewers" placeholder="Invite Viewers"/>}
                />
                <Button onClick={()=>{sendViewerRequest()}}>Add Viewers</Button>
            </>)}
            
        </Collapse>
</>)}
        
    </Container>
  )
}

export default People