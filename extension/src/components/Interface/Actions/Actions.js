import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button} from '@mui/material';
import CreateFolder from '../CreateFolder/CreateFolder';
import { SearchById } from '../../../actions/main';
import { GetFolders } from '../../../actions/folders';


const Actions = ({showAdd}) => {
    const dispatch = useDispatch();
    const { friends } = useSelector((state)=>state.mainSlice);
    
    useEffect(() => {
      for (let i=0; i<friends.length; i++) {
        dispatch(SearchById(friends[i],'friends'))
      }

    }, [])

    useEffect(()=> {
      dispatch(GetFolders())
    },[])
    


  return (
    <>
            <CreateFolder showAdd={showAdd} mainFolder={true}/>
            <Button>Edit Folder</Button>
    </>
  )
}

export default Actions