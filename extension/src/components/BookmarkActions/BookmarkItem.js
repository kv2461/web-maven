import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, ListItemText, Box, Link, IconButton, Typography, TextField, Button } from '@mui/material';
import { DeleteForever, Info, Flag } from '@mui/icons-material';
import { SearchById } from '../../actions/main';
import { DeleteBookmark, FlagBookmark, UnflagBookmark, GetFolders } from '../../actions/folders';
import { CLEAR_BOOKMARK_ERROR } from '../../reducers/folders'

const BookmarkItem = ({ bookmark, level, folder, isFolderCreator, isMainCreator, }) => {
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
  const [showBookmark, setShowBookmark] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

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
    setShowInfo(false);
    setShowBookmark(false);
    setConfirmDelete(false);
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

  useEffect(() => {
    if (!showInfo) {
      setFlagBookmarkTextField(false);
      setShowFlagInfo(false);
    }
  },[showInfo])

  return (
    showBookmark ?
    <>
    <ListItem sx={{ m:0, p:0, paddingLeft: `${(level)}px`}} key={bookmark.createdAt}>
                <ListItemText 
                  disableTypography 
                  primary={
                          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <div style={{display:'flex',flexDirection:'row'}}>
                            {bookmark.favIconUrl && (<Box component='img' sx={{maxHeight:'1.1rem', paddingRight:1}} src={bookmark.favIconUrl}/>)}
                            <Link sx={{color:'text.primary', fontWeight:600, fontSize:13}} href={bookmark.url} target='_blank' >{bookmark?.title?.length > (50-(7*level)) ? `${bookmark?.title?.slice(0,50-(7*level))}...`: bookmark?.title}</Link>
                            </div>
                            <div>
                              <IconButton onClick={()=>{setShowInfo(!showInfo)}}>
                                <Info sx={bookmark?.flagged?{color:'red', fontSize:'1.2rem'}:{color:'#35A7FF', fontSize:'1.2rem'}}/>
                              </IconButton>
                            </div>
                          </div>}
                  />
            
    </ListItem>
      {showInfo && 
      <div style={{ border:'1px dotted black', overflow:'auto'}}>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between',}}>
          <Typography sx={{p:1}}>Added by {bookmarkCreatorInfo?.username}</Typography>
          <div>
            {(isFolderCreator || isMainCreator || isBookmarkCreator) && 
            <IconButton onClick={()=>{setConfirmDelete(true)}}>
              <DeleteForever sx={{color:'#35A7FF', fontSize:'1.2rem'}}/>
            </IconButton>}
            {(!bookmark?.flagged || (tempUnflag && !tempFlag)) && <IconButton onClick={()=>{setFlagBookmarkTextField(!flagBookmarkTextField);}}>
              <Flag sx={{color:'#35A7FF', fontSize:'1.2rem'}}/>
            </IconButton>}
            {(bookmark?.flagged || (tempFlag && !tempUnflag)) && <IconButton onClick={()=>{setShowFlagInfo(!showFlagInfo);}}>
              <Flag sx={{color:'red', fontSize:'1.2rem'}}/>
            </IconButton>}     
          </div>
        </div>

        {confirmDelete && 
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Typography sx={{color:'red', paddingLeft:1}}>Delete?</Typography>
            <div>
              <Button onClick={()=>deleteBookmark()}>Yes</Button>
              <Button onClick={()=>{setConfirmDelete(false)}}>No</Button>
            </div>
          </div>}

      <Typography sx={{p:1}}>Title: {bookmark?.title}</Typography>
      <Typography sx={{p:1}}>URL: {bookmark?.url}</Typography>
      </div>}

      {showFlagInfo && <div style={{ border:'1px dotted red', overflow:'auto'}}>
      <Typography sx={{p:1}}>Flagged by {bookmark.flag?.flagger}</Typography>
      <Typography sx={{p:1}}>Reason: {bookmark?.flag?.reason}</Typography>
      {(isFolderCreator || isMainCreator || isFlagger) && <Button onClick={()=>unflagBookmark()}>Unflag</Button>}
      </div>}

      {flagBookmarkTextField && <div>
      <Typography sx={{color:'red', p:'5px 0'}}>Suspicious? Malicious? Just plain wrong?</Typography>
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
  </> : null
  )
}

export default BookmarkItem