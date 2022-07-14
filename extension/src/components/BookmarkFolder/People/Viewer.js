import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Typography, IconButton, Container } from '@mui/material'
import { PersonRemove, RemoveEditor, } from '@mui/icons-material';
import { SearchById, } from '../../../actions/main'

const Viewer = ({ viewer, creator, isEditor }) => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'))
    const dispatch = useDispatch();
    const [viewerInfo, setViewerInfo] = useState('');
    const isCreator = Boolean(creator._id === user.result._id);

    useEffect(()=> {
        const getInfo = async () => {
          const data = await dispatch(SearchById(viewer));
  
          setViewerInfo(data);
        }

        console.log(isEditor)
        
        getInfo()
          
      },[viewer])


    
  return (
    <Container sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:1, marginBottom:1}}>
    <Typography>{viewerInfo.username}</Typography>
    {/* {isCreator && 
        <IconButton onClick={()=>{removeEditor(friendInfo)}} edge='end'>
            <PersonRemove />
        </IconButton>} */}
    </Container>
  )
}

export default Viewer