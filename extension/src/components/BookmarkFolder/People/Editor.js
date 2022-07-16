import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { Typography, IconButton, Container, Button } from '@mui/material'
import { PersonRemove } from '@mui/icons-material';
import { RENDER } from '../../../reducers/folders';
import { RemoveFromBookmarkFolder } from '../../../actions/folders';
import { SearchById } from '../../../actions/main';

const Editor = ({ editor, creator, folder }) => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'))
    const dispatch = useDispatch();
    const [editorInfo, setEditorInfo] = useState('');
    const isCreator = Boolean(creator._id === user.result._id);
    const [confirmRemoveEditor, setConfirmRemoveEditor] = useState(false);
    const [deleted, setDeleted] = useState(false);

    useEffect(()=> {
        const getInfo = async () => {
          const data = await dispatch(SearchById(editor));
  
          setEditorInfo(data);
        }

        getInfo()
          
      },[editor])

      const removeFromBookmarkFolder = async () => {
          await dispatch(RemoveFromBookmarkFolder(editor, folder, 'editor'));
          await dispatch(RENDER());
          await setConfirmRemoveEditor(false);
          await setDeleted(true);
      }


  return (
    !deleted ?
    <>
    <Container sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:1, marginBottom:1}}>
      <Typography>{editorInfo.username}</Typography>
      {isCreator && 
          <IconButton onClick={()=>{setConfirmRemoveEditor(true)}} edge='end'>
              <PersonRemove />
          </IconButton>}
    </Container>
    {confirmRemoveEditor && 
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Typography sx={{color:'red'}}>Kick?</Typography>
            <div>
              <Button onClick={()=>removeFromBookmarkFolder()}>Yes</Button>
              <Button onClick={()=>{setConfirmRemoveEditor(false)}}>No</Button>
            </div>
          </div>}
    </> : null
  )
}

export default Editor