import React,{ useState, useEffect } from 'react';
import { IconButton, Typography } from '@mui/material';
import { DoNotDisturbAlt, PersonAdd } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { SearchById } from '../../actions/main';

import { DenyFriendRequest, AcceptFriendRequest } from '../../actions/main';

const Recieved = ({ friendReq }) => {
    const dispatch = useDispatch();
    const [friend, setFriend] = useState('');

    useEffect(()=> {
      const getInfo = async () => {
        const data = await dispatch(SearchById(friendReq.requester));

        setFriend(data);
        
      }

      getInfo()
        
    },[])

  return (
    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
      <Typography>{friend.username}</Typography>
      <div>
        <IconButton onClick={()=>dispatch(DenyFriendRequest(friend))}>
          <DoNotDisturbAlt />
        </IconButton>
        <IconButton onClick={()=>dispatch(AcceptFriendRequest(friend))}>
          <PersonAdd />
        </IconButton>
      </div>
    </div>
  )
}

export default Recieved