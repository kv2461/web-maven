import React, { useState, useEffect } from 'react'
import { Typography, ButtonBase, Collapse, IconButton, ListItem, List, Paper } from '@mui/material';
import { Folder, Group, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import BookmarkItem from '../BookmarkActions/BookmarkItem';

import { SearchFolderById, RemoveFromBookmarkFolder, DeleteBookmarkFolder, FavoriteFolder } from '../../actions/folders';
import { SearchById } from '../../actions/main';

import { CLEAR_BOOKMARK_ERROR } from '../../reducers/folders'

import People from './People/People';

const BookmarkFolder = ({ folder, parent, selected, setSelected, level }) => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'));
    const dispatch = useDispatch();
    const { friends } = useSelector((state)=>state.mainSlice);
    const { bookmarkError, favoriteFolders } = useSelector((state)=>state.folderSlice);
    const [collapseFolder, setCollapseFolder] = useState(false);
    const [folderInfo, setFolderInfo] = useState({});
    const [folderId, setFolderId] = useState(1)
    const [UI, setUI] = useState(parent);
    const [collapsePeople, setCollapsePeople] = useState(false);
    const isCreator = Boolean(folderInfo?.creator === user.result._id);
    const isEditor = Boolean(folderInfo?.editors?.indexOf(user.result._id) !== -1);
    const isMainCreator = Boolean(folderInfo?.mainCreator === user.result._id);
    const inFavoriteFolders = Boolean(favoriteFolders?.indexOf(folder) !== -1); //will need to get this from selector instead of profile since selector gets updated


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

    const favoriteFolder = async () => {
            dispatch(FavoriteFolder(folder));
    }

  return (
    ((parent !== 'bookmark') || (folderInfo.mainFolder && (isEditor || isCreator || isMainCreator)) || (!folderInfo.mainFolder)) ? 
    <Paper sx={level===1?{elevation:9, m:0, p:0, paddingLeft:1, marginTop:1 } : {elevation:9, p:1, m:0, marginLeft:level, paddingRight:0, marginBottom:1}}>
    <ListItem sx={{m:0,p:0, display:'flex', flexDirection:'row', justifyContent:'space-between'}} key={folder}>
        <div style={{margin:0, padding:0}}>
            <IconButton onClick={()=>setCollapseFolder(!collapseFolder)} edge='end'>
                <Folder sx={{fontSize:'1.2rem', color:'#F8ECD1'}} />
            </IconButton>
            <ButtonBase onClick={selectFolder}>
                <Typography sx={selected === folderId ?{color:'primary.main'}:textColor}variant='body1'><strong>{folderInfo?.title}</strong></Typography>
            </ButtonBase>
        </div>
        <div>
            {level=== 1 && <IconButton onClick={()=>{favoriteFolder()}}>
                {!inFavoriteFolders ? <FavoriteBorder sx={{color:'#35A7FF', fontSize:'1.2rem'}}/> : <Favorite sx={{color:'#35A7FF', fontSize:'1.2rem'}}/> }
            </IconButton>}
            <IconButton onClick={()=>{setCollapsePeople(!collapsePeople)}}>
                <Group sx={{color:'#35A7FF', fontSize:'1.2rem'}}/>
            </IconButton>
        </div>

        
    </ListItem>

    {collapsePeople && <People friends={friends} level={level} folderInfo={folderInfo} selected={selected} collapsePeople={collapsePeople} deleteBookmarkFolder={deleteBookmarkFolder} isMainCreator={isMainCreator} removeFromBookmarkFolder={removeFromBookmarkFolder}/>}
    <Collapse sx={{m:0,p:0}} in={collapseFolder} timeout="auto" unmountOnExit>
            
                <List sx={{m:0,p:0}}>
                {folderInfo?.subFolders?.length > 0 && folderInfo?.subFolders?.map((subfolder,index) => (
                    <BookmarkFolder key={index} folder={subfolder} parent={parent} setSelected={setSelected} selected={selected} level={level+1}/>
                ))}
                </List>
                
                <List sx={{m:0,p:0}}>
                    {folderInfo?.bookmarks?.length > 0 && folderInfo?.bookmarks?.map((bookmark,index)=>(<BookmarkItem folder={folderInfo} isFolderCreator={isCreator} isEditor={isEditor} setCollapseFolder={setCollapseFolder} collapseFolder={collapseFolder} isMainCreator={isMainCreator} bookmark={bookmark} textColor={textColor} key={index} level={level+1}/>))}
                    {bookmarkError && <Typography sx={{color:'secondary.main'}}>{bookmarkError}</Typography>}
                </List>

        </Collapse>

    </Paper> : null
  )
}

export default BookmarkFolder
