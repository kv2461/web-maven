import React, { useState, useEffect } from 'react'
import { Box, Typography, ButtonBase, Collapse } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { StyledList } from './styles';
import { SearchFolderById } from '../../actions/folders';

const BookmarkFolder = ({folder}) => {
    const dispatch = useDispatch();
    const [collapseFolder, setCollapseFolder] = useState(false);
    const [folderInfo, setFolderInfo] = useState({});

    useEffect(()=> {
        const getInfo = async () => {
          const data = await dispatch(SearchFolderById(folder));
  
          setFolderInfo(data);
        }
  
        getInfo()
          
      },[folder])



  return (
    <Box>
        <ButtonBase onClick={()=>setCollapseFolder(!collapseFolder)}>
            <Typography variant='body1'><strong>{folderInfo.title}</strong></Typography>
        </ButtonBase>
        <Collapse in={collapseFolder} timeout="auto" unmountOnExit>
            <StyledList subheader={<li />}>
                {/* {
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
    </Box>
  )
}

export default BookmarkFolder

//need to make a bookmark component for every  bookmark as well as having an easy way to add a bookmark 
//for recursion, maybe will need a counter to multiply it by 2 padding so you can see that its a different sub folder set
//conditional if has subfolders for recursion to happen
