import React, { useState, useEffect } from 'react'
import { Box, Typography, ButtonBase, Collapse, IconButton, ListSubheader, ListItem, List} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import BookmarkItem from '../BookmarkActions/BookmarkItem';

import { StyledList } from './styles';
import { SearchFolderById } from '../../actions/folders';

const BookmarkFolder = ({folder, parent, selected, setSelected, level}) => {
    const dispatch = useDispatch();
    const [collapseFolder, setCollapseFolder] = useState(false);
    const [folderInfo, setFolderInfo] = useState({});
    const [folderId, setFolderId] = useState(1)
    const [UI, setUI] = useState(parent);

    useEffect(()=> {
        const getInfo = async () => {
          const data = await dispatch(SearchFolderById(folder));
  
          setFolderInfo(data);
        }
  
        getInfo()

      },[folder,selected])

    const selectFolder = () => {
        if (UI === 'bookmark') {
            setFolderId(folder);
            setSelected(folder);
        }
        console.log(folderInfo.subFolders)
    }


  return (
    <>
    <ListItem sx={level === 1 ? {m:0,p:0} : {m:0, p:0, marginLeft: `${level*5}px`}} key={folder}>
        <ButtonBase onClick={selectFolder}>
            <Typography sx={selected === folderId ?{color:'primary.main'}:null}variant='body1'><strong>{folderInfo.title}</strong></Typography>
        </ButtonBase>
        <IconButton onClick={()=>setCollapseFolder(!collapseFolder)} edge='end'>
            <KeyboardArrowDown />
        </IconButton>
        
    </ListItem>
    <Collapse sx={{m:0,p:0}}in={collapseFolder} timeout="auto" unmountOnExit flexDirection='column'>
          
                <List sx={{m:0,p:0}}>
                {folderInfo.subFolders?.length > 0 && folderInfo.subFolders.map((subfolder,index) => (
                    <BookmarkFolder key={index} folder={subfolder} parent={parent} setSelected={setSelected} selected={selected} level={level+1}/>
                ))}
                </List>
                
                <List sx={{m:0,p:0}}>
                    {folderInfo.bookmarks?.length > 0 && folderInfo.bookmarks.map((bookmark,index)=>(<BookmarkItem bookmark={bookmark} key={index} level={level+1}/>))}
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