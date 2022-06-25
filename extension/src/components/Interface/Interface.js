import React,{ useState, useEffect } from 'react';
import { Button } from '@mui/material';

import Actions from './Actions/Actions';
import BookmarkActions from '../BookmarkActions/BookmarkActions';


const Interface = ({ url, tab, setCollapseBookmarks, setCollapseFriends, collapseBookmarks, collapseFriends }) => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'));
    const [showAdd, setShowAdd] = useState(false);
    const [showBookmark, setShowBookmark] = useState(false);

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
        <div style={{display:'flex',flexDirection:'row'}}>
            <Button onClick={add}>+</Button>
            <Button onClick={bookmark}>-</Button>
        </div>
        <div>
            {showAdd && (<Actions showAdd={showAdd} />
            )}
            {showBookmark && (<BookmarkActions showBookmark={showBookmark} url={url} tab={tab}/>)
            }
        </div>
    </>
  )
}

export default Interface

//bookmarking needs to work seamlessly with subfolder navigation and saving
  //might have to work on them at the same time (bookmarking and subfolders)
//situation = a creator wants to save somewhere on subfolder level 4 but the id isn't part of that unless you follow a chain of folders
//