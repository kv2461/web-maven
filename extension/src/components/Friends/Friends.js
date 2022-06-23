import React, {useState, useEffect} from 'react'
import { TextField, InputAdornment, IconButton, Typography, Box } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { SearchByUsername } from '../../actions/main';

const Friends = () => {
  const dispatch = useDispatch();
  const [usernameQuery, setUsernameQuery] = useState('');
  const { searchedFriend, searchedFriendError } = useSelector((state)=>state.mainSlice)

  const search = (usernameQuery) => {
    dispatch(SearchByUsername(usernameQuery));
  }



  return (
    <>
      <TextField value={usernameQuery} variant='outlined' label='Search Username' onChange={(e)=>setUsernameQuery(e.target.value)} type='text'
        InputProps={{endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={()=>search(usernameQuery)} edge='end'>
              <Search />
            </IconButton>
          </InputAdornment>
        )}}
      />
      { searchedFriend && (<Box sx={{p:2}}><Typography sx={{color:'primary.main'}}>{searchedFriend.username}</Typography></Box>)}
      { searchedFriendError && (<Typography sx={{color:'secondary.main'}}>{searchedFriendError}</Typography>)}
    </>
  )
}

export default Friends