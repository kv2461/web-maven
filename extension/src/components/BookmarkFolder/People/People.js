import React, { useState, useEffect } from 'react'
import { Typography, Container, Collapse, Button, Autocomplete, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { SearchById } from '../../../actions/main';
import Editor from './Editor';

const People = ({ folderInfo, friends }) => {
    const dispatch = useDispatch();
    const { friendArray } = useSelector((state)=>state.mainSlice);
    const [creatorInfo, setCreatorInfo] = useState({});
    const [collapseEditors, setCollapseEditors] = useState(false);
    const [collapseViewers, setCollapseViewers] = useState(false);
    const [editors, setEditors] = useState([]);


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

      useEffect(() => {
        console.log(folderInfo.editors)
        console.log(friendArray)
      },[friendArray])

  return (
    <Container>
        <Typography>Created by {creatorInfo.username}</Typography>
        {folderInfo.editors.length > 0 &&  <Button onClick={()=>{setCollapseEditors(!collapseEditors);setCollapseViewers(false);}}> {collapseEditors ? 'Hide Editors' : `Editors (${folderInfo.editors.length})`}</Button>}
        {folderInfo.viewers.length > 0 &&  <Button onClick={()=>{setCollapseViewers(!collapseViewers);setCollapseEditors(false);}}> {collapseViewers ? 'Hide Viewers' : `Viewers (${folderInfo.viewers.length})`}</Button>}
        <Collapse in={collapseEditors} timeout='auto' unmountOnExit>
            {folderInfo.editors.map((editor)=> (<Editor key={editor} editor={editor} creator={creatorInfo}/>))}
            <Autocomplete style={{margin:'0 5px 5px 5px'}}
                multiple
                disablePortal
                id="invite-editors"
                options={friendArray.filter((friend) => folderInfo.editors.indexOf(friend._id) === -1 )}
                value={editors}
                onChange={(event,value)=>setEditors(value)}
                getOptionLabel={option => option.username}
                fullWidth
                noOptionsText={'No Friends'}
                renderInput={(params) => <TextField {...params} label="Invite Editors" placeholder="Invite Editors"/>}
             />
        </Collapse>
    </Container>
  )
}

export default People