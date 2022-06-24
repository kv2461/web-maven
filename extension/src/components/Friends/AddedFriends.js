import React, { useState, useEffect } from 'react'
import { Button, Collapse } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {GetFriends} from '../../actions/main'

import Friend from './Friend';

//this component should house the added friends section, will have smaller components inside this as well for individual friends

const AddedFriends = ({friends}) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state)=>state.mainSlice);
    const [collapseFriends, setCollapseFriends] = useState(false);

    useEffect(()=> {
        dispatch(GetFriends());

        console.log(friends)
    },[])


  return (
    <>
        <Button onClick={()=>setCollapseFriends(!collapseFriends)}> {collapseFriends ? 'Hide Friends' : 'Friends'}</Button>
        <Collapse in={collapseFriends} timeout='auto' unmountOnExit>
                  {friends.map((friend) => (<Friend key={friend} friend={friend}/>))}
        </Collapse>
   </>
  )
}

export default AddedFriends