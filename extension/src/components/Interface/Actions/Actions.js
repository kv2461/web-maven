import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button} from '@mui/material';
import CreateFolder from '../CreateFolder/CreateFolder';
import { SearchById } from '../../../actions/main';


const Actions = ({showAdd}) => {
    const dispatch = useDispatch();
    const { friends } = useSelector((state)=>state.mainSlice);
    
    useEffect(() => {
      for (let i=0; i<friends.length; i++) {
        dispatch(SearchById(friends[i],'friends'))
      }

    }, [])
    


  return (
    <>
            <CreateFolder showAdd={showAdd} />
            <Button>Edit Folder</Button>
            <Button>Add Bookmark</Button>
    </>
  )
}

export default Actions