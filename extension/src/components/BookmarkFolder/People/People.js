import React, { useState, useEffect } from 'react'
import { Typography, Container, Collapse, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { SearchById } from '../../../actions/main';
import Editor from './Editor';

const People = ({ folderInfo }) => {
    const dispatch = useDispatch();
    const [creatorInfo, setCreatorInfo] = useState({});
    const [collapseEditors, setCollapseEditors] = useState(false);
    const [collapseViewers, setCollapseViewers] = useState(false);


    useEffect(()=> {
        const getInfo = async () => {
          const data = await dispatch(SearchById(folderInfo.creator));
  
          setCreatorInfo(data);
        }
  
        getInfo()
          
      },[folderInfo])

  return (
    <Container>
        <Typography>Created by {creatorInfo.username}</Typography>
        {folderInfo.editors.length > 0 &&  <Button onClick={()=>{setCollapseEditors(!collapseEditors);setCollapseViewers(false);}}> {collapseEditors ? 'Hide Editors' : `Editors (${folderInfo.editors.length})`}</Button>}
        {folderInfo.viewers.length > 0 &&  <Button onClick={()=>{setCollapseViewers(!collapseViewers);setCollapseEditors(false);}}> {collapseViewers ? 'Hide Viewers' : `Viewers (${folderInfo.viewers.length})`}</Button>}
        <Collapse in={collapseEditors} timeout='auto' unmountOnExit>
            {folderInfo.editors.map((editor)=> (<Editor key={editor} editor={editor} creator={creatorInfo}/>))}
        </Collapse>
    </Container>
  )
}

export default People