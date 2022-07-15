import React, { useState, useEffect } from 'react'
import { Typography, ButtonBase, Collapse, IconButton, ListItem, List, } from '@mui/material';
import { Folder, Group, Logout, DeleteForever } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import BookmarkItem from '../BookmarkActions/BookmarkItem';

import { SearchFolderById, RemoveFromBookmarkFolder, DeleteBookmarkFolder } from '../../actions/folders';
import { SearchById } from '../../actions/main';

import { CLEAR_BOOKMARK_ERROR } from '../../reducers/folders'

import People from './People/People';

const BookmarkFolder = ({ folder, parent, selected, setSelected, level }) => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'));
    const dispatch = useDispatch();
    const { friends } = useSelector((state)=>state.mainSlice);
    const { bookmarkError } = useSelector((state)=>state.folderSlice);
    const [collapseFolder, setCollapseFolder] = useState(false);
    const [folderInfo, setFolderInfo] = useState({});
    const [folderId, setFolderId] = useState(1)
    const [UI, setUI] = useState(parent);
    const [collapsePeople, setCollapsePeople] = useState(false);
    const isCreator = Boolean(folderInfo?.creator === user.result._id);
    const isEditor = Boolean(folderInfo?.editors?.indexOf(user.result._id) !== -1);
    const isMainCreator = Boolean(folderInfo?.mainCreator === user.result._id);


    const textColor = 
        {color: level % 2 === 0 ? 'text.secondary' : 'text.primary',
        // backgroundColor: level % 2 === 0 ? '#F8ECD1' : '#E0D8B0'
        }

    useEffect(()=> {
        const getInfo = async () => {
          const data = await dispatch(SearchFolderById(folder));
  
          setFolderInfo(data);
        }
  
        getInfo()

        if (bookmarkError) {
            dispatch(CLEAR_BOOKMARK_ERROR());
        }


      },[folder,selected,collapseFolder])

    const selectFolder = () => {
            setFolderId(folder);
            setSelected(folder);
    }

    const removeFromBookmarkFolder = () => {
        if (isEditor) {
            dispatch(RemoveFromBookmarkFolder(user.result._id, folder, 'editor'));
        } else {
            dispatch(RemoveFromBookmarkFolder(user.result._id, folder, 'viewer'));
        }
    }

    const deleteBookmarkFolder = async (folder) => {
        setCollapseFolder(false);
        await dispatch(DeleteBookmarkFolder(folder));
    }

    useEffect(()=> {
        const getInfo = async (friend) => {
          const data = await dispatch(SearchById(friend,'friends'));
  
        }
  
        friends.map((friend) => getInfo(friend));
          
      },[friends])


  return (
    ((parent !== 'bookmark') || (folderInfo.mainFolder && (isEditor || isCreator || isMainCreator)) || (!folderInfo.mainFolder)) ? 
    <>
    <ListItem sx={level === 1 ? {m:0,p:0, paddingLeft:0, display:'flex', flexDirection:'row', justifyContent:'space-between'} : {m:0, p:0, paddingLeft: `${level*5}px`, display:'flex', flexDirection:'row', justifyContent:'space-between'}} key={folder}>
        <div>
            <IconButton onClick={()=>setCollapseFolder(!collapseFolder)} edge='end'>
                <Folder sx={{fontSize:'1.2rem', color:'#F8ECD1'}} />
            </IconButton>
            <ButtonBase onClick={selectFolder}>
                <Typography sx={selected === folderId ?{color:'primary.main'}:textColor}variant='body1'><strong>{folderInfo?.title}</strong></Typography>
            </ButtonBase>
            </div>
        <div>
            <IconButton onClick={()=>{setCollapsePeople(!collapsePeople)}}>
                <Group sx={{color:'#35A7FF', fontSize:'1.2rem'}}/>
            </IconButton>
            {level === 1 && !isCreator && <IconButton onClick={()=>{removeFromBookmarkFolder(user.result._id)}}>
                <Logout sx={{color:'#35A7FF', fontSize:'1.2rem'}}/>
            </IconButton>} 
            {(isCreator || isMainCreator) && <IconButton onClick={()=>{deleteBookmarkFolder(folderInfo)}}>
                <DeleteForever sx={{color:'#35A7FF', fontSize:'1.2rem'}}/>
            </IconButton>}
        </div>

        
    </ListItem>

    {collapsePeople && <People friends={friends} level={level} folderInfo={folderInfo} selected={selected} collapsePeople={collapsePeople}/>}
    <Collapse sx={{m:0,p:0}} in={collapseFolder} timeout="auto" unmountOnExit>
                <List sx={{m:0,p:0}}>
                    {folderInfo?.bookmarks?.length > 0 && folderInfo?.bookmarks?.map((bookmark,index)=>(<BookmarkItem folder={folderInfo} isFolderCreator={isCreator} isEditor={isEditor} setCollapseFolder={setCollapseFolder} collapseFolder={collapseFolder} isMainCreator={isMainCreator} bookmark={bookmark} textColor={textColor} key={index} level={level+1}/>))}
                    {bookmarkError && <Typography sx={{color:'secondary.main'}}>{bookmarkError}</Typography>}
                </List>

                <List sx={{m:0,p:0}}>
                {folderInfo?.subFolders?.length > 0 && folderInfo?.subFolders?.map((subfolder,index) => (
                    <BookmarkFolder key={index} folder={subfolder} parent={parent} setSelected={setSelected} selected={selected} level={level+1}/>
                ))}
                </List>
                
                

        </Collapse>

    </> : null
  )
}

export default BookmarkFolder
