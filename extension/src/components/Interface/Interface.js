import React,{ useState } from 'react';
import { Button } from '@mui/material';

import Actions from './Actions/Actions';
import BookmarkActions from '../BookmarkActions/BookmarkActions';


const Interface = ({url}) => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'));
    const [showAdd, setShowAdd] = useState(false);
    const [showBookmark, setShowBookmark] = useState(false);

    const bookmark = () => {
      setShowAdd(false);
      setShowBookmark(!showBookmark)
    }

    const add = () => {
      setShowBookmark(false);
      setShowAdd(!showAdd);
    }


  return (
    <>
        <div style={{display:'flex',flexDirection:'row'}}>
            <Button onClick={add}>+</Button>
            <Button onClick={bookmark}>-</Button>
        </div>
        <div>
            {showAdd && (<Actions showAdd={showAdd} />
            )}
            {showBookmark && (<BookmarkActions />)
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