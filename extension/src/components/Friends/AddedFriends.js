import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {GetFriends} from '../../actions/main'


//this component should house the added friends section, will have smaller components inside this as well for individual friends

const AddedFriends = () => {
    const dispatch = useDispatch();
    const {friends, loading} = useSelector((state)=>state.mainSlice);

    useEffect(()=> {
        dispatch(GetFriends());

        console.log(friends)
    },[])
  return (
    <div>AddedFriends</div>
  )
}

export default AddedFriends