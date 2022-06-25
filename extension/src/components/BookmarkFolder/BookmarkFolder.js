import React, { useState, useEffect } from 'react'
import { Box, Typography, ButtonBase, Collapse, IconButton, ListSubheader } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

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
    <li style={{marginLeft:`${level*3}px`}} key={folder}>
        <ButtonBase onClick={selectFolder}>
            <Typography sx={selected === folderId ?{color:'primary.main'}:null}variant='body1'><strong>{folderInfo.title}</strong></Typography>
        </ButtonBase>
        <IconButton onClick={()=>setCollapseFolder(!collapseFolder)} edge='end'>
            <KeyboardArrowDown />
        </IconButton>
        <Collapse in={collapseFolder} timeout="auto" unmountOnExit>
            <StyledList subheader={<li />}>
                

                {folderInfo.subFolders?.length > 0 && folderInfo.subFolders.map((subfolder,index) => (
                    <BookmarkFolder key={index} folder={subfolder} parent={parent} setSelected={setSelected} selected={selected} level={level+1}/>
                ))}
    

                {folderInfo.bookmarks?.length > 0 && folderInfo.bookmarks.map((bookmark,index)=>(<a href={bookmark.url} target='_blank'key={Date.now()+index}>{bookmark.title}</a>))}

                

                {/* {           //should add createdAt for both bookmarks and bookmarkfolders so they can be mixed into the same array 
                                //also have send what sublevel each folder is in recursion so state sublevel folders can be an an array of object sublevels
                listItems.map((item,index) => ( 
                    <FoodListItem
                            key={`${item?.key}`}
                            listItem={item}
                            index={index}
                            length={listItems.length - 1}
                            subgenre='foodRecipe'
                            handleMoveUp = {()=>listLogic.handleMoveUp(item)}
                            handleMoveDown = {()=>listLogic.handleMoveDown(item)}
                    />))
                }  */}
            </StyledList>
        </Collapse>
    </li>
  )
}

export default BookmarkFolder

//need to make a bookmark component for every  bookmark as well as having an easy way to add a bookmark 
//for recursion, maybe will need a counter to multiply it by 2 padding so you can see that its a different sub folder set
//conditional if has subfolders for recursion to happen

//ul? listsubheader? listitem? listItemtext?