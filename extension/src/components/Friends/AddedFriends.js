import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {GetFriends} from '../../actions/main'


//this component should house the added friends section, will have smaller components inside this as well for individual friends

const AddedFriends = ({friends}) => {
    const dispatch = useDispatch();
    const {loading} = useSelector((state)=>state.mainSlice);

    useEffect(()=> {
        dispatch(GetFriends());

        console.log(friends)
    },[])
  return (
    <>
        <Button onClick={()=>setCollapseFriendRequests(!collapseFriendRequests)}> {collapseFriendRequests ? 'Hide Friend Requests' : 'Friend Requests'}</Button>
        <Collapse in={collapseFriendRequests} timeout='auto' unmountOnExit>
                  {inventory.map((friendReq) => (<Recieved key={friendReq._id} friendReq={friendReq}/>))}
        </Collapse>
   </>
  )
}

export default AddedFriends