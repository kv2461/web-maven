import React,{ useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { DoNotDisturbAlt } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { SearchById } from '../../actions/main';

import { DenyFriendRequest } from '../../actions/main';

const Recieved = ({friendReq}) => {
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
    <>
      <div>{friend.username}</div>
      <IconButton onClick={()=>dispatch(DenyFriendRequest(friend))}>
        <DoNotDisturbAlt />
      </IconButton>
    </>
  )
}

export default Recieved