import React, { useState, useEffect } from 'react'
import { Box, Typography, ButtonBase, Collapse, IconButton, ListItem, List, Container } from '@mui/material';
import { Folder, Group, Logout, DeleteForever } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import BookmarkItem from '../BookmarkActions/BookmarkItem';

import { SearchFolderById, RemoveFromBookmarkFolder } from '../../actions/folders';
import { SearchById } from '../../actions/main';

import People from './People/People';

const BookmarkFolder = ({folder, parent, selected, setSelected, level, }) => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'))
    const dispatch = useDispatch();
    const { friends } = useSelector((state)=>state.mainSlice)
    const [collapseFolder, setCollapseFolder] = useState(false);
    const [folderInfo, setFolderInfo] = useState({});
    const [parentFolderInfo, setParentFolderInfo] = useState({});
    const [folderId, setFolderId] = useState(1)
    const [UI, setUI] = useState(parent);
    const [collapsePeople, setCollapsePeople] = useState(false);
    const isCreator = Boolean(folderInfo?.creator === user.result._id);
    const isEditor = Boolean(folderInfo?.editors?.indexOf(user.result._id) !== -1);
    

    if (folderInfo?.main === 'false') {
        const getInfo = async () => {
            const data = await dispatch(SearchFolderById(folderInfo.parentFolders[0]));
    
            setParentFolderInfo(data);
          }
    }
    const isMainCreator = Boolean(parentFolderInfo?.creator === user.result._id);
    console.log(parentFolderInfo) //in progress

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

    const deleteBookmarkFolder = () => {
        if (level !== 1) {
            console.log('sub')
        } else {
            console.log('main')
        }
    }

    useEffect(()=> {
        if (selected!==folderId ) {
            setCollapseFolder(false);
        }
    },[selected, folderId]) //subfolders are closing when opened because whole main folder is closing

    useEffect(()=> {
        const getInfo = async (friend) => {
          const data = await dispatch(SearchById(friend,'friends'));
  
        }
  
        friends.map((friend) => getInfo(friend));
          
      },[friends])


  return (
    <>
    <ListItem sx={level === 1 ? {m:0,p:0, marginLeft:0, display:'flex', flexDirection:'row', justifyContent:'space-between'} : {m:0, p:0, marginLeft: `${level*5}px`, display:'flex', flexDirection:'row', justifyContent:'space-between'}} key={folder}>
        <div>
            <IconButton onClick={()=>setCollapseFolder(!collapseFolder)} edge='end'>
                <Folder sx={{fontSize:'1.2rem', color:'#F8ECD1'}} />
            </IconButton>
            <ButtonBase onClick={selectFolder}>
                <Typography sx={selected === folderId ?{color:'primary.main'}:textColor}variant='body1'><strong>{folderInfo.title}</strong></Typography>
            </ButtonBase>
            </div>
        <div>
            {level === 1 && <IconButton onClick={()=>{setCollapsePeople(!collapsePeople)}}>
                <Group sx={{color:'#35A7FF', fontSize:'1.2rem'}}/>
            </IconButton>}
            {level === 1 && !isCreator && <IconButton onClick={()=>{removeFromBookmarkFolder(user.result._id, )}}>
                <Logout sx={{color:'#35A7FF', fontSize:'1.2rem'}}/>
            </IconButton>} 
            {(isCreator || isMainCreator) && <IconButton onClick={()=>{deleteBookmarkFolder()}}>
                <DeleteForever sx={{color:'#35A7FF', fontSize:'1.2rem'}}/>
            </IconButton>}
        </div>

        
    </ListItem>

    {collapsePeople && <People friends={friends} folderInfo={folderInfo} selected={selected} collapsePeople={collapsePeople}/>}
    <Collapse sx={{m:0,p:0}} in={collapseFolder} timeout="auto" unmountOnExit>
          
                <List sx={{m:0,p:0}}>
                {folderInfo.subFolders?.length > 0 && folderInfo.subFolders.map((subfolder,index) => (
                    <BookmarkFolder key={index} folder={subfolder} parent={parent} setSelected={setSelected} selected={selected} level={level+1}/>
                ))}
                </List>
                
                <List sx={{m:0,p:0}}>
                    {folderInfo.bookmarks?.length > 0 && folderInfo.bookmarks.map((bookmark,index)=>(<BookmarkItem bookmark={bookmark} textColor={textColor} key={index} level={level+1}/>))}
                </List>

        </Collapse>

    </>
  )
}

export default BookmarkFolder
