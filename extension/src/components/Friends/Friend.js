import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Typography, IconButton, Button } from '@mui/material'
import { PersonRemove } from '@mui/icons-material';
import { SearchById, RemoveFriend } from '../../actions/main';

const Friend = ({ friend }) => {
    const dispatch = useDispatch();
    const [friendInfo, setFriendInfo] = useState('');
    const [confirmRemove, setConfirmRemove] = useState(false);

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
    <>
    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
    <Typography>{friendInfo.username}</Typography>
    <IconButton onClick={()=>setConfirmRemove(!confirmRemove)} edge='end'>
            <PersonRemove />
    </IconButton>
    </div>

    {confirmRemove && 
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Typography sx={{color:'red'}}>Are you sure you want to unfriend?</Typography>
            <div>
              <Button onClick={()=>removeFriend(friendInfo)}>Yes</Button>
              <Button onClick={()=>{setConfirmRemove(false)}}>No</Button>
            </div>
          </div>}
    </>
    
  )
}

export default Friend