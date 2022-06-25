import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Button, IconButton, Collapse } from '@mui/material';
import { CreateNewFolder, Bookmark, FolderCopy, Group } from '@mui/icons-material';

import Actions from './Actions/Actions';
import BookmarkActions from '../BookmarkActions/BookmarkActions';
import BookmarkFolderMain from '../BookmarkFolder/BookmarkFolderMain';
import AddBookmark from '../BookmarkActions/AddBookmark.js';
import Friends from '../Friends/Friends';
import { GetFolders } from '../../actions/folders';


const Interface = ({ url, tab, }) => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'));
    const [showAdd, setShowAdd] = useState(false);
    const [showBookmark, setShowBookmark] = useState(false);
    const [collapseBookmarks, setCollapseBookmarks] = useState(false);
    const [collapseFriends, setCollapseFriends] = useState(false);

    const dispatch = useDispatch();
    const [selected, setSelected] = useState('');
    
    useEffect(()=> {
      dispatch(GetFolders())
    },[])
    


    const bookmark = () => {
      setShowAdd(false);
      setShowBookmark(!showBookmark)
      setCollapseBookmarks(false);
      setCollapseFriends(false);
    }

    const add = () => {
      setShowBookmark(false);
      setShowAdd(!showAdd);
      setCollapseBookmarks(false);
      setCollapseFriends(false);
    }

    useEffect(() => {
      if (collapseBookmarks || collapseFriends) {
        setShowBookmark(false);
        setShowAdd(false);
      }
    

    }, [collapseBookmarks,collapseFriends])
    


  return (
    <>
        <div style={{display:'flex',flexDirection:'row', justifyContent:'space-evenly'}}>
            <IconButton onClick={add}><CreateNewFolder sx={{fontSize:'3rem'}} /></IconButton>
            <IconButton onClick={bookmark}><Bookmark sx={{fontSize:'3rem'}} /></IconButton>
            <IconButton onClick={()=>{setCollapseBookmarks(!collapseBookmarks);setCollapseFriends(false);}}><FolderCopy sx={{fontSize:'3rem'}}/></IconButton>
            <IconButton onClick={()=>{setCollapseFriends(!collapseFriends);setCollapseBookmarks(false)}}><Group sx={{fontSize:'3rem'}}/></IconButton>        
        </div>
        <div style={{display:'flex',flexDirection:'column',}}>
            {showAdd && (<Actions showAdd={showAdd} /> )}
            {/* {showBookmark && (<BookmarkActions showBookmark={showBookmark} url={url} tab={tab}/>)
            } */}
            <Collapse in={collapseBookmarks} timeout='auto' unmountOnExit>
              <BookmarkFolderMain />
            </Collapse>
            <Collapse in={collapseFriends} timeout='auto' unmountOnExit>
              <Friends />
            </Collapse>
            {showBookmark && (<AddBookmark showBookmark={showBookmark} url={url} tab={tab} setSelected={setSelected} selected={selected} />)}
        </div>

        
               
    </>
  )
}

export default Interface

//bookmarking needs to work seamlessly with subfolder navigation and saving
  //might have to work on them at the same time (bookmarking and subfolders)
//situation = a creator wants to save somewhere on subfolder level 4 but the id isn't part of that unless you follow a chain of folders
//