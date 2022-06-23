import React, {useState, useEffect} from 'react'
import { TextField, InputAdornment, IconButton, Typography, Box, Button } from '@mui/material';
import { Search, AddOutlined, DoNotDisturbAlt } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { SearchByUsername, SendFriendRequest, GetFriendStatus, CancelFriendRequest, } from '../../actions/main';

import Sent from './Sent';

const Friends = () => {
  const user = JSON.parse(localStorage.getItem('web-maven-profile'))
  const dispatch = useDispatch();
  const [rerender, setRerender] = useState(false);
  const [usernameQuery, setUsernameQuery] = useState('');
  const { searchedFriend, searchedFriendError, sendFriendReqError, sent, inventory, loading } = useSelector((state)=>state.mainSlice);
  const isSelf = Boolean(searchedFriend._id === user.result._id);
  const sentAlready = Boolean(sent.filter(friendStatus => friendStatus.recipient === searchedFriend._id).length > 0);

  const searchByUsername = (usernameQuery) => {
    setRerender(!rerender);
    dispatch(SearchByUsername(usernameQuery));
  }

  const sendFriendRequest = (friend) => {
    setRerender(!rerender);
    dispatch(SendFriendRequest(friend));
  }

  const cancelFriendRequest = (friend) => {
    setRerender(!rerender);
    dispatch(CancelFriendRequest(friend));
  }

  useEffect(()=> {
    dispatch(GetFriendStatus())
  },[rerender, loading])



  return (
    <>
      <TextField value={usernameQuery} variant='outlined' label='Search Username' onChange={(e)=>setUsernameQuery(e.target.value)} type='text'
        InputProps={{endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={()=>searchByUsername(usernameQuery)} edge='end'>
              <Search />
            </IconButton>
          </InputAdornment>
        )}}
      />
      { Object.keys(searchedFriend).length !== 0 && (
      <Box display='flex' flexDirection='row' sx={{p:2}}>
        <Typography sx={{color:'primary.main'}}>{searchedFriend.username}</Typography>
        {sentAlready && (
          (<IconButton onClick={()=>cancelFriendRequest(searchedFriend)} edge='end'>
            <DoNotDisturbAlt />
          </IconButton>)
        )}
        {!isSelf && !sentAlready && 
        (<IconButton onClick={()=>sendFriendRequest(searchedFriend)} edge='end'>
              <AddOutlined />
              { sendFriendReqError && (<Typography sx={{color:'secondary.main'}}>{sendFriendReqError}</Typography>)}
        </IconButton>)}             
      </Box>)}
      { searchedFriendError && (<Typography sx={{color:'secondary.main'}}>{searchedFriendError}</Typography>)}
      
      {sent?.length>0 && (sent.map((friendReq) => (<Sent key={friendReq._id} friendReq={friendReq}/>)))}
    </>
  )
}

export default Friends