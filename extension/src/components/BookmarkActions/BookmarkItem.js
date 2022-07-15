import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, ListItemText, Box, Link, IconButton, Typography, TextField, Button } from '@mui/material';
import { DeleteForever, Info, Flag } from '@mui/icons-material';
import { SearchById } from '../../actions/main';
import { DeleteBookmark, FlagBookmark, UnflagBookmark } from '../../actions/folders';
import { CLEAR_BOOKMARK_ERROR } from '../../reducers/folders'

const BookmarkItem = ({ bookmark, level, textColor, folder, isFolderCreator, isMainCreator, }) => {
  const user = JSON.parse(localStorage.getItem('web-maven-profile'))
  const dispatch = useDispatch();
  const isBookmarkCreator = Boolean(bookmark?.creator === user.result._id);
  const isFlagger = Boolean(bookmark?.flag?.flagger === user.result.username);
  const [showInfo, setShowInfo] = useState(false);
  const [showFlagInfo, setShowFlagInfo] = useState(false);
  const [bookmarkCreatorInfo, setBookmarkCreatorInfo] = useState({})
  const initialFlagState = { reason:'', flagger:user.result.username, };
  const [flagBookmarkTextField, setFlagBookmarkTextField] = useState(false);
  const [flag, setFlag] = useState(initialFlagState);
  const [tempFlag, setTempFlag] = useState(false);
  const [tempUnflag, setTempUnflag] = useState(false);

  useEffect(()=> {
    const getInfo = async () => {
      const data = await dispatch(SearchById(bookmark.creator));
      
      setBookmarkCreatorInfo(data);
    }

    getInfo();
      
  },[bookmark])

  const deleteBookmark = async() => {
    dispatch(CLEAR_BOOKMARK_ERROR());
    dispatch(DeleteBookmark(folder._id, bookmark));
  }

  const finalizeFlag = async () => {
    dispatch(FlagBookmark(folder._id, bookmark, flag));
    setTempFlag(true);
    setTempUnflag(false);
    setFlagBookmarkTextField(false);
    bookmark.flagged = true;
    bookmark.flag.flagger = user.result.username;
    bookmark.flag.reason = flag.reason;
    setFlag(initialFlagState);
  }

  const unflagBookmark = async () => {
    dispatch(UnflagBookmark(folder._id, bookmark));
    setTempFlag(false);
    setTempUnflag(true);
    setShowFlagInfo(false);
    bookmark.flagged = false;
  }

  return (
    <>
    <ListItem sx={{ m:0, p:0, paddingLeft: `${(level*6)}px`}} key={bookmark.createdAt}>
              {bookmark.favIconUrl && (<Box component='img' sx={{maxHeight:'1.1rem'}} src={bookmark.favIconUrl}/>)}
                <ListItemText 
                  disableTypography 
                  primary={
                          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <Link sx={textColor} href={bookmark.url} target='_blank' >{bookmark.title}</Link>
                            <div>
                              <IconButton onClick={()=>{setShowInfo(!showInfo);setFlagBookmarkTextField(false);setShowFlagInfo(false)}}>
                                <Info sx={{color:'#35A7FF', fontSize:'1.2rem'}}/>
                              </IconButton>
                              {(!bookmark?.flagged || (tempUnflag && !tempFlag)) && <IconButton onClick={()=>{setFlagBookmarkTextField(!flagBookmarkTextField);setShowInfo(false);}}>
                                <Flag sx={{color:'#35A7FF', fontSize:'1.2rem'}}/>
                              </IconButton>}
                              {(bookmark?.flagged || (tempFlag && !tempUnflag)) && <IconButton onClick={()=>{setShowFlagInfo(!showFlagInfo);setShowInfo(false)}}>
                                <Flag sx={{color:'red', fontSize:'1.2rem'}}/>
                              </IconButton>}
                              {(isFolderCreator || isMainCreator || isBookmarkCreator) && <IconButton onClick={()=>{deleteBookmark()}}>
                                <DeleteForever sx={{color:'#35A7FF', fontSize:'1.2rem'}}/>
                              </IconButton>}
                            </div>
                          </div>}
                  />
            
    </ListItem>
      {showInfo && <div style={{paddingLeft: `${(level*6)}px`, border:'1px dotted black'}}>
      <Typography sx={{p:'5px 0'}}>Created by {bookmarkCreatorInfo?.username}</Typography>
      <Typography sx={{p:'5px 0'}}>URL: {bookmark?.url}</Typography>
      </div>}

      {showFlagInfo && <div style={{paddingLeft: `${(level*6)}px`, border:'1px dotted red'}}>
      <Typography sx={{p:'5px 0'}}>Flagged by {bookmark.flag?.flagger}</Typography>
      <Typography sx={{p:'5px 0'}}>Reason: {bookmark?.flag?.reason}</Typography>
      {isFolderCreator || isMainCreator || isFlagger && <Button onClick={()=>unflagBookmark()}>Unflag</Button>}
      </div>}

      {flagBookmarkTextField && <div style={{paddingLeft: `${(level*6)}px`}}>
      <Typography sx={{p:'5px 0'}}>Suspicious? Malicious? Just plain wrong?</Typography>
      <TextField 
                  sx={{p:'5px 0'}}
                  required
                  fullWidth
                  label="Reason for Flagging"
                  value={flag.reason}
                  onChange={(e)=>setFlag({...flag,reason:e.target.value})}
                  type='text'
                />
      <Button onClick={()=>{setFlagBookmarkTextField(false)}}>Cancel</Button>
      <Button onClick={()=>finalizeFlag()} sx={{color:'red'}} disabled={Boolean(flag.reason.trim() === '')}>Flag</Button>
      </div>}
  </>
  )
}

export default BookmarkItem