import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Button, IconButton, Collapse } from '@mui/material';
import { CreateNewFolder, Bookmark, FolderCopy, Group } from '@mui/icons-material';

import Actions from './Actions/Actions';
import BookmarkActions from '../BookmarkActions/BookmarkActions';
import CreateFolder from './CreateFolder/CreateFolder';
import BookmarkFolderMain from '../BookmarkFolder/BookmarkFolderMain';
import AddBookmark from '../BookmarkActions/AddBookmark.js';
import Friends from '../Friends/Friends';
import { GetFolders } from '../../actions/folders';
import { SearchById } from '../../actions/main';


const Interface = ({ url, tab, }) => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'));    
    const dispatch = useDispatch();
    const { friends } = useSelector((state)=>state.mainSlice)
    const [showAdd, setShowAdd] = useState(false);
    const [showBookmark, setShowBookmark] = useState(false);
    const [collapseBookmarks, setCollapseBookmarks] = useState(false);
    const [collapseFriends, setCollapseFriends] = useState(false);
    const [selected, setSelected] = useState('');
    
    useEffect(()=> {
      dispatch(GetFolders())
      for (let i=0; i<friends.length; i++) {
        dispatch(SearchById(friends[i],'friends'))
      }

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
            <IconButton onClick={add}><CreateNewFolder sx={{color:'#F38181', fontSize:'3rem'}} /></IconButton>
            <IconButton onClick={bookmark}><Bookmark sx={{color:'#FCE38A', fontSize:'3rem'}} /></IconButton>
            <IconButton onClick={()=>{setCollapseBookmarks(!collapseBookmarks);setCollapseFriends(false);}}><FolderCopy sx={{color:'#66DE93', fontSize:'3rem'}}/></IconButton>
            <IconButton onClick={()=>{setCollapseFriends(!collapseFriends);setCollapseBookmarks(false)}}><Group sx={{color:'#95E1D3', fontSize:'3rem'}}/></IconButton>        
        </div>
        <div style={{display:'flex',flexDirection:'column',}}>
<<<<<<< HEAD
            {showAdd && (<CreateFolder showAdd={showAdd} mainFolder={true}/> )}
=======

>>>>>>> 69a9884c21abfdc90e94aa859aa961e931549d74
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