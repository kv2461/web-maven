import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {Typography, IconButton} from '@mui/material'
import { PersonRemove } from '@mui/icons-material';
import { SearchById, RemoveFriend } from '../../actions/main';

const Friend = ({ friend }) => {
    const dispatch = useDispatch();
    const [friendInfo, setFriendInfo] = useState('');

    useEffect(()=> {
        const getInfo = async () => {
          const data = await dispatch(SearchById(friend,'friends'));
  
          setFriendInfo(data);
        }
  
        getInfo()
          
      },[friend])

    const removeFriend = (friendInfo) => {
        dispatch(RemoveFriend(friendInfo));
    }


  return (
    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
    <Typography>{friendInfo.username}</Typography>
    <IconButton onClick={()=>removeFriend(friendInfo)} edge='end'>
            <PersonRemove />
    </IconButton>
    </div>
  )
}

export default Friend