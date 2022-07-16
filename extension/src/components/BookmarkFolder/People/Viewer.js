import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { Typography, IconButton, Container, Button } from '@mui/material'
import { RENDER } from '../../../reducers/folders';
import { PersonRemove } from '@mui/icons-material';
import { RemoveFromBookmarkFolder } from '../../../actions/folders';
import { SearchById, } from '../../../actions/main'

const Viewer = ({ folder, viewer, creator, isEditor }) => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'))
    const dispatch = useDispatch();
    const [viewerInfo, setViewerInfo] = useState('');
    const isCreator = Boolean(creator._id === user.result._id);
    const [confirmRemoveViewer, setConfirmRemoveViewer] = useState(false);
    const [deleted, setDeleted] = useState(false);

    useEffect(()=> {
        const getInfo = async () => {
          const data = await dispatch(SearchById(viewer));
  
          setViewerInfo(data);
        }
        
        getInfo()
          
      },[viewer])

    const removeFromBookmarkFolder = async () => {
      await dispatch(RemoveFromBookmarkFolder(viewer, folder, 'viewer'));
      await dispatch(RENDER());
      await setConfirmRemoveViewer(false);
      await setDeleted(true);
    }

    
  return (
    !deleted ?
    <>
    <Container sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:1, marginBottom:1}}>
      <Typography>{viewerInfo.username}</Typography>
      {isCreator && 
          <IconButton onClick={()=>{setConfirmRemoveViewer(true)}} edge='end'>
              <PersonRemove />
          </IconButton>}
    </Container>
    {confirmRemoveViewer && 
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Typography sx={{color:'red'}}>Kick?</Typography>
            <div>
              <Button onClick={()=>removeFromBookmarkFolder()}>Yes</Button>
              <Button onClick={()=>{setConfirmRemoveViewer(false)}}>No</Button>
            </div>
          </div>}
    </> : null
  )
}

export default Viewer