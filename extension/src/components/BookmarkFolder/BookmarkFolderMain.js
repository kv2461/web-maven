import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledList } from './styles';
import {GetFolders} from '../../actions/folders';

import BookmarkFolder from './BookmarkFolder';

const BookmarkFolderMain = () => {
  const dispatch = useDispatch();
  const { folders, sentFolders, recievedFolders } = useSelector((state)=>state.folderSlice)

  useEffect(()=> {
    dispatch(GetFolders())
    console.log(folders)
    console.log(sentFolders)
    console.log(recievedFolders)
  },[])
  return (
    <StyledList subheader={<li />}>
      <li key='requests and sent'>Bookmark Folder REQUESTS AND SENT</li>
      <li key='created'>Bookmark Folder CREATED</li>
      <ul>
      {folders && folders.map((folder,index) => (<BookmarkFolder key={index} folder={folder} level={1}/>))}
      </ul>
    </StyledList>
  )
}

export default BookmarkFolderMain

//i want collapsing and recursion

//this should also be a list

{/* <li key={itemKey}>
<ul>
   {index > 0 ? <Divider sx={{borderBottomWidth:3}} /> : null}
    { subgenre === 'foodRecipe' ? 
      <ListSubheader sx={{fontWeight:700 ,lineHeight:1, p:2}} >{`${name?.charAt(0).toUpperCase()}${name?.slice(1)}`}</ListSubheader>
     : <ListSubheader sx={{fontWeight:700 ,lineHeight:1, p:2}} >{index + 1} - {name}</ListSubheader>
    }

    <ListItem key={itemKey}>
      {subgenre === 'foodRecipe' && image !== null && (<Box component='img' sx={{m:1,p:1, maxHeight:'40px', maxWidth:'40px'}} src={image}/>)}
        <ListItemText 
          disableTypography 
          primary={ <> */}