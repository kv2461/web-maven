import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Autocomplete, Switch, FormControlLabel, InputAdornment} from '@mui/material';
import { StyledList } from './styles';

import BookmarkFolder from '../BookmarkFolder/BookmarkFolder';
import CreateFolder from '../Interface/CreateFolder/CreateFolder';

import { AddBookmark, SearchFolderById, } from '../../actions/folders';

const Bookmark = ({showBookmark, url, tab, setSelected, selected}) => {
    const dispatch = useDispatch();
    const {folders} = useSelector((state)=>state.folderSlice)
    const user = JSON.parse(localStorage.getItem('web-maven-profile'));
    const initialBookmarkState = { title:tab.title, creator:user.result._id, creatorUsername:user.result.username, likes:[], flags:[], url:url, favIconUrl: tab.favIconUrl, createdAt:new Date().toISOString()};
    const [newBookmark, setNewBookmark] = useState(initialBookmarkState);
    const [addError, setAddError] = useState('');
    const [showAddSubFolder, setShowAddSubFolder] = useState(false);
    const [folderInfo, setFolderInfo] = useState(false);

    const addBookmark = () => {
        if (selected && newBookmark) {
        dispatch(AddBookmark(selected, newBookmark)) 
        setSelected('');
        setNewBookmark(initialBookmarkState); 
        } else {
          setAddError('Need to select a folder to add to');
        }
    }

    useEffect(()=> {
      const getInfo = async () => {
        const data = await dispatch(SearchFolderById(selected));

        setFolderInfo(data);
      }

      getInfo()
        
    },[selected])

    useEffect(() => {
        setAddError('');
    },[selected, newBookmark])

    useEffect(()=> {
      setSelected('');
    },[folders])



  return (
    <>
        {showBookmark && (<div>
                <TextField 
                  required
                  fullWidth
                  label="Bookmark Title"
                  value={newBookmark.title}
                  onChange={(e)=>setNewBookmark({...newBookmark,title:e.target.value})}
                  type='text'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img style={{maxHeight:'1.1rem'}} src={newBookmark.favIconUrl} />
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledList subheader={<li />}>
                {folders && folders.map((folder,index) => (<BookmarkFolder key={index} folder={folder} parent='bookmark' setSelected={setSelected} selected={selected} level={1}/>))}
                </StyledList>

                <div style={{display:'flex', flexDirection:'column'}}>
                <Button onClick={addBookmark} sx={addError?{color:'secondary.main'}:null}>{ addError ? addError : `Add Bookmark`}</Button>
    
                {showBookmark && selected && (<Button onClick={()=>setShowAddSubFolder(!showAddSubFolder)}>{!showAddSubFolder ? 'New Subfolder' : 'Cancel'}</Button>)}
                </div>
                {showBookmark && selected && showAddSubFolder && (<CreateFolder showCreateFolder={showAddSubFolder} setShowCreateFolder={setShowAddSubFolder} mainFolder={false} folderInfo={folderInfo}/>)}
                
        </div>)}
    </>
  )
}

export default Bookmark
//should show bookmark folders have edit rights to as well as the bookmark folders inside that folder