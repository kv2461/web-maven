import React,{ useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { DoNotDisturbAlt } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { SearchById } from '../../actions/main';

import { CancelFriendRequest } from '../../actions/main';

//this is the component that will show pending sent friend requests

const Sent = ({friendReq}) => {
    const dispatch = useDispatch();
    const [friend, setFriend] = useState('');

    useEffect(()=> {
      const getInfo = async () => {
        const data = await dispatch(SearchById(friendReq.recipient));

        setFriend(data);
      }

      getInfo()
        
    },[])

  return (
    <>
      <div>{friend.username}</div>
      <IconButton onClick={()=>dispatch(CancelFriendRequest(friend))}>
        <DoNotDisturbAlt />
      </IconButton>
    </>
  )
}

export default Sent