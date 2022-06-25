import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Autocomplete, Switch, FormControlLabel, InputAdornment} from '@mui/material';
import { StyledList } from './styles';

import BookmarkFolder from '../BookmarkFolder/BookmarkFolder';
import CreateFolder from '../Interface/CreateFolder/CreateFolder';

import { AddBookmark, SearchFolderById } from '../../actions/folders';

const Bookmark = ({showBookmark, url, tab, folders, setSelected, selected}) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('web-maven-profile'));
    const initialBookmarkState = { title:tab.title, creator:user.result._id, creatorUsername:user.result.username, likes:[], flags:[], url:url, favIconUrl: tab.favIconUrl, createdAt:new Date().toISOString()};
    const [newBookmark, setNewBookmark] = useState(initialBookmarkState);
    const [addError, setAddError] = useState('');
    const [showAddBookmark, setShowAddBookmark] = useState(false);
    const [showAddSubFolder, setShowAddSubFolder] = useState(false);
    const [folderInfo, setFolderInfo] = useState(false);

    const addBookmark = () => {
        if (selected && newBookmark) {
        dispatch(AddBookmark(selected, newBookmark))
        } else {
            setAddError('Need to select a folder to add to');
        }
        setSelected('');
        setNewBookmark(initialBookmarkState);
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
    <Button onClick={()=>setShowAddBookmark(!showAddBookmark)}>{!showAddBookmark ? 'Add Bookmark' : 'Cancel'}</Button>
        {showBookmark && showAddBookmark && (<div>
                <TextField 
                  required
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

                
                <Button onClick={addBookmark}>{ addError ? addError : `Add Bookmark`}</Button>
                {showBookmark && selected && (<Button onClick={()=>setShowAddSubFolder(!showAddSubFolder)}>{!showAddSubFolder ? 'New Subfolder' : 'Cancel'}</Button>)}

                {showBookmark && selected && showAddSubFolder && (<CreateFolder showAdd={showAddSubFolder} setShowAddSubFolder={setShowAddSubFolder} mainFolder={false} folderInfo={folderInfo}/>)}
                


                {/* <Autocomplete
                  multiple
                  disablePortal
                  id="invite-editors"
                  options={friendArray}
                  value={editors}
                  onChange={(event,value)=>setEditors(value)}
                  getOptionLabel={option => option.username}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Invite Editors" placeholder="Invite Editors"/>}
                 />

                <FormControlLabel control={<Switch value={newFolder.availableToFriends} onChange={handleViewable}/>} label={newFolder.availableToFriends ? 'Available to all friends' : 'Private viewers optional'} />

                {!newFolder.availableToFriends && (<Autocomplete
                  multiple
                  disablePortal
                  id="invite-viewers"
                  options={friendArray}
                  value={viewers}
                  onChange={(event,value)=>setViewers(value)}
                  getOptionLabel={option => option.username}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Invite Viewers" placeholder="Invite Viewers"/>}
                />)}
                

                <Button disabled={false}>Add</Button> */}
        </div>)}
    </>
  )
}

export default Bookmark
//should show bookmark folders have edit rights to as well as the bookmark folders inside that folder