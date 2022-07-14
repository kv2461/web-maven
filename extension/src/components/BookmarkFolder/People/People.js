import React, { useState, useEffect } from 'react'
import { Typography, Container, Collapse, Button, Autocomplete, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { SendEditorRequest } from '../../../actions/folders';
import { SearchById } from '../../../actions/main';
import { CLEAR_EDITOR_ERROR } from '../../../reducers/folders';
import Editor from './Editor';

const People = ({ folderInfo, friends, selected, collapsePeople }) => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'))
    const dispatch = useDispatch();
    const { friendArray } = useSelector((state)=>state.mainSlice);
    const { addEditorError } = useSelector((state)=>state.folderSlice);
    const [creatorInfo, setCreatorInfo] = useState({});
    const [collapseEditors, setCollapseEditors] = useState(false);
    const [collapseViewers, setCollapseViewers] = useState(false);
    const [addEditors, setAddEditors] = useState(false);
    const [editors, setEditors] = useState([]);
    const availableEditors = friendArray.filter((friend) => folderInfo.editors.indexOf(friend._id) === -1 && creatorInfo._id !== friend._id)
    const isCreator = Boolean(folderInfo.creator === user.result._id);
    const isEditor = Boolean(folderInfo.editors.indexOf(user.result._id) !== -1)


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

      useEffect(() => {
        dispatch(CLEAR_EDITOR_ERROR());
      },[collapseEditors, editors, selected, collapsePeople])
 
  return (
    <Container>
        <Typography>Created by {creatorInfo.username}</Typography>
        <Button onClick={()=>{setCollapseEditors(!collapseEditors);setCollapseViewers(false);}}> {collapseEditors ? 'Hide Editors' : `Editors (${folderInfo.editors.length})`}</Button>
        <Button onClick={()=>{setCollapseViewers(!collapseViewers);setCollapseEditors(false);}}> {collapseViewers ? 'Hide Viewers' : `Viewers (${folderInfo.viewers.length})`}</Button>
        <Collapse in={collapseEditors} timeout='auto' unmountOnExit>
            {folderInfo.editors.map((editor)=> (<Editor key={editor} editor={editor} creator={creatorInfo}/>))}
            {(isCreator || isEditor) && <Button onClick={()=>{setAddEditors(!addEditors)}}>{addEditors ? 'Cancel' : 'Add Editors '}</Button>}
            {addEditorError && addEditorError.map((err) => (<Typography sx={{color:'secondary.main'}}>{err}</Typography>))}
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
                    renderInput={(params) => <TextField {...params} label="Invite Editors" placeholder="Invite Editors"/>}
                />
                <Button onClick={()=>{sendEditorRequest()}}>Add Editors</Button>
            </>)}
            
        </Collapse>
    </Container>
  )
}

export default People