import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Typography, IconButton, Container } from '@mui/material'
import { PersonRemove, RemoveEditor, } from '@mui/icons-material';
import { SearchById, } from '../../../actions/main'

const Editor = ({ editor, creator, }) => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'))
    const dispatch = useDispatch();
    const [editorInfo, setEditorInfo] = useState('');
    const isCreator = Boolean(creator._id === user.result._id);

    useEffect(()=> {
        const getInfo = async () => {
          const data = await dispatch(SearchById(editor));
  
          setEditorInfo(data);
        }

        console.log(isCreator);
  
        getInfo()
          
      },[editor])

    const removeEditor = (friendInfo) => {
        // dispatch(RemoveEditor(friendInfo)); need to make this route still
    }


  return (
    <Container sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:1, marginBottom:1}}>
    <Typography>{editorInfo.username}</Typography>
    {isCreator && 
        <IconButton onClick={()=>{removeEditor(friendInfo)}} edge='end'>
            <PersonRemove />
        </IconButton>}
    </Container>
  )
}

export default Editor