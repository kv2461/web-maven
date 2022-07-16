import React, {useState, useEffect} from 'react'
import { TextField, InputAdornment, IconButton, Typography, Box, Button, Collapse } from '@mui/material';
import { Search, AddOutlined, DoNotDisturbAlt, Cancel, PersonRemove } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { SearchByUsername, SendFriendRequest, GetFriendStatus, CancelFriendRequest, GetFriends, RemoveFriend } from '../../actions/main';
import { CLEAR } from '../../reducers/main';

import Sent from './Sent';
import Recieved from './Recieved';
import Friend from './Friend';

const Friends = () => {
  const user = JSON.parse(localStorage.getItem('web-maven-profile'))
  const dispatch = useDispatch();
  const [rerender, setRerender] = useState(false);
  const [usernameQuery, setUsernameQuery] = useState('');
  const { searchedFriend, searchedFriendError, sendFriendReqError, sent, inventory, loading, friends } = useSelector((state)=>state.mainSlice);
  const isSelf = Boolean(searchedFriend._id === user.result._id);
  const sentAlready = Boolean(sent.filter(friendStatus => friendStatus.recipient === searchedFriend._id).length > 0);
  const sentCompleted = sent.filter((request) => request.status !== 'completed');
  const uncompleted = inventory.filter((request) => request.status !== 'completed');
  const friendAlready = Boolean(friends.findIndex((friend) => friend === searchedFriend._id) !== -1);

  const [collapseSent, setCollapseSent] = useState(false);
  const [collapseFriendRequests, setCollapseFriendRequests] = useState(false);
  const [collapseFriends, setCollapseFriends] = useState(false);

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

  const removeFriend = (friend) => {
    setRerender(!rerender);
    dispatch(RemoveFriend(friend));
  }

  const clear = () => {
    dispatch(CLEAR());
    setUsernameQuery('');
  }

  useEffect(()=> {
    dispatch(GetFriendStatus());
    dispatch(GetFriends());
  },[rerender, loading])



  return (
    <>
      <TextField value={usernameQuery} variant='outlined' fullWidth label='Search Username' onChange={(e)=>setUsernameQuery(e.target.value)} type='text'
        InputProps={{endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={()=>searchByUsername(usernameQuery)} edge='end'>
              <Search />
            </IconButton>
            <IconButton onClick={()=>clear()} edge='end'>
              <Cancel />
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
        
        {!isSelf && !sentAlready && !friendAlready &&
        (<IconButton onClick={()=>sendFriendRequest(searchedFriend)} edge='end'>
              <AddOutlined />
              { sendFriendReqError && (<Typography sx={{color:'secondary.main'}}>{sendFriendReqError}</Typography>)}
        </IconButton>)}

        {!isSelf && !sentAlready && friendAlready &&
        (<IconButton onClick={()=>removeFriend(searchedFriend)} edge='end'>
              <PersonRemove />
              { sendFriendReqError && (<Typography sx={{color:'secondary.main'}}>{sendFriendReqError}</Typography>)}
        </IconButton>)}              
      </Box>)}
      { searchedFriendError && (<Typography sx={{color:'secondary.main'}}>{searchedFriendError}</Typography>)}
      
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
      {sentCompleted?.length>0 && 
        (<>
        <Button onClick={()=>{setCollapseSent(!collapseSent);setCollapseFriendRequests(false);setCollapseFriends(false);}}> {collapseSent ? 'Hide Pending' : `Sent Pending (${sentCompleted.length})`}</Button>
        </>)
      }

      {uncompleted?.length>0 && 
        (<>
        <Button onClick={()=>{setCollapseFriendRequests(!collapseFriendRequests);setCollapseSent(false);setCollapseFriends(false)}}> {collapseFriendRequests ? 'Hide Friend Requests' : `Friend Requests (${uncompleted.length})`}</Button>
        </>)
      }

        
        
      
      {friends?.length > 0 && (<Button onClick={()=>{setCollapseFriends(!collapseFriends);setCollapseFriendRequests(false);setCollapseSent(false)}}> {collapseFriends ? 'Hide Friends' : `Friends (${friends?.length})`}</Button>)} 
      </div>
      
      <div>
        <Collapse in={collapseSent} timeout='auto' unmountOnExit>
                  {sentCompleted.map((friendReq) => (<Sent key={friendReq._id} friendReq={friendReq}/>))}
        </Collapse>
        <Collapse in={collapseFriendRequests} timeout='auto' unmountOnExit>
                  {uncompleted.map((friendReq) => (<Recieved key={friendReq._id} friendReq={friendReq}/>))}
        </Collapse>
        <Collapse in={collapseFriends} timeout='auto' unmountOnExit>
                  {friends.map((friend) => (<Friend key={friend} friend={friend}/>))}
        </Collapse>
      </div>

      {(friends?.length === 0 && uncompleted?.length === 0 && sent?.length === 0) && (<Typography sx={{color:'secondary.main', textAlign:'center'}}>You currently have no friends, search their username!</Typography>)}
    </>
  )
}

export default Friends