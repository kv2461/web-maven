import React, { useState, useEffect } from 'react'
import { Box, Typography, ButtonBase, Collapse, IconButton, ListItem, List } from '@mui/material';
import { Folder, Group } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import BookmarkItem from '../BookmarkActions/BookmarkItem';

import { SearchFolderById } from '../../actions/folders';
import { SearchById } from '../../actions/main';

import People from './People/People';

const BookmarkFolder = ({folder, parent, selected, setSelected, level, }) => {
    const dispatch = useDispatch();
    const { friends } = useSelector((state)=>state.mainSlice)
    const [collapseFolder, setCollapseFolder] = useState(false);
    const [folderInfo, setFolderInfo] = useState({});
    const [folderId, setFolderId] = useState(1)
    const [UI, setUI] = useState(parent);
    const [collapsePeople, setCollapsePeople] = useState(false);

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
            console.log(friends);
        // if (UI === 'bookmark') {
            
        // } else {
        //     setCollapseFolder(!collapseFolder)
        //     //selecting them might be the way to delete them in the future if the UI is folder edit
        // }
    }

    useEffect(()=> {
        if (selected!==folderId) {
            setCollapseFolder(false);
        }
    },[selected, folderId])

    useEffect(()=> {
        const getInfo = async (friend) => {
          const data = await dispatch(SearchById(friend,'friends'));
  
        }
  
        friends.map((friend) => getInfo(friend));
          
      },[friends])


  return (
    <>
    <ListItem sx={level === 1 ? {m:0,p:0, marginLeft:0} : {m:0, p:0, marginLeft: `${level*5}px`, display:'flex',}} key={folder}>
        <IconButton onClick={()=>setCollapseFolder(!collapseFolder)} edge='end'>
            <Folder sx={{fontSize:'1.2rem', color:'#F8ECD1'}} />
        </IconButton>
        <ButtonBase onClick={selectFolder}>
            <Typography sx={selected === folderId ?{color:'primary.main'}:textColor}variant='body1'><strong>{folderInfo.title}</strong></Typography>
        </ButtonBase>
        <IconButton onClick={()=>{setCollapsePeople(!collapsePeople)}}>
            <Group sx={{color:'#35A7FF', fontSize:'1.2rem'}}/>
        </IconButton>

        
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

//need to make a bookmark component for every  bookmark as well as having an easy way to add a bookmark 
//for recursion, maybe will need a counter to multiply it by 2 padding so you can see that its a different sub folder set
//conditional if has subfolders for recursion to happen

//ul? listsubheader? listitem? listItemtext?