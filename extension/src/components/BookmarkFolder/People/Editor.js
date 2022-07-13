import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Typography, IconButton, Autocomplete, TextField } from '@mui/material'
import { PersonRemove } from '@mui/icons-material';
import { SearchById, RemoveFriend, } from '../../../actions/main'

const Editor = ({ editor, creator, }) => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'))
    const { friendArray } = useSelector((state)=>state.mainSlice);
    const dispatch = useDispatch();
    const [editorInfo, setEditorInfo] = useState('');
    const [editors, setEditors] = useState([]);
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

    <Autocomplete style={{margin:'0 5px 5px 5px'}}
        multiple
        disablePortal
        id="invite-editors"
        options={friendArray}
        value={editors}
        onChange={(event,value)=>setEditors(value)}
        getOptionLabel={option => option.username}
        fullWidth
        noOptionsText={'No Friends'}
        renderInput={(params) => <TextField {...params} label="Invite Editors" placeholder="Invite Editors"/>}
    /> 
    </>
  )
}

export default Editor