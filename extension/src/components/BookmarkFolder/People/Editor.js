import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Typography, IconButton, } from '@mui/material'
import { PersonRemove } from '@mui/icons-material';
import { SearchById, RemoveFriend, } from '../../../actions/main'

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

    // const removeFriend = (friendInfo) => {
    //     dispatch(RemoveFriend(friendInfo));
    // }


  return (
    <>
    <Typography>{editorInfo.username}</Typography>
    {/* <IconButton onClick={()=>{removeFriend(friendInfo)}} edge='end'>
            <PersonRemove />
    </IconButton> */}
    </>
  )
}

export default Editor