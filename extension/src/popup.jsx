import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { Button, Collapse } from '@mui/material';

import  mainSlice  from './reducers/main';
import authSlice from './reducers/auth';

import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../src/reducers/auth'

import Auth from './components/Auth/Auth';
import Interface from './components/Interface/Interface';
import BookmarkFolder from './components/BookmarkFolder/BookmarkFolder';
import Friends from './components/Friends/Friends';

import { theme } from './Theme';

const store = configureStore({
    reducer: {
        mainSlice:mainSlice,
        authSlice:authSlice
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});

const Popup = () => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'));
    const { authData } = useSelector((state)=>state.authSlice); 
    const [url, setUrl] = useState('')
    const [rerender, setRerender] = useState(false);
    const [collapseBookmarks, setCollapseBookmarks] = useState(false);
    const [collapseFriends, setCollapseFriends] = useState(false);
    const dispatch = useDispatch();
    
    const logout = () => {
        dispatch(LOGOUT());
    }

    const getCurrentTab = async () => {
        let queryOptions = {active: true, lastFocusedWindow: true};
        let [tab] = await chrome.tabs.query(queryOptions);
        return tab
    }

    const getTabInfo = () => {
        const tab = getCurrentTab()
            .then((response) => {
                const {url} = response
                setUrl(url)
            })
    }

    useEffect(()=> {
        const tab = getCurrentTab()
            .then((response) => {
                const {url} = response
                setUrl(url)
            })

    },[])

    useEffect(()=> {
        setRerender(!rerender);
    },[authData])

    

    return(
        <div>
            {!user && <Auth />}
            {user && <Button sx={{color:'secondary.main'}}onClick={logout}>Logout</Button>}
                
            {user && 
            (<> {url !== '' && (<Interface url={url}/>)}
                <Button onClick={()=>setCollapseBookmarks(!collapseBookmarks)}> {collapseBookmarks ? 'Hide Folders' : 'Folders'}</Button>
                <Collapse in={collapseBookmarks} timeout='auto' unmountOnExit>
                    <BookmarkFolder />
                </Collapse>
                <Button onClick={()=>setCollapseFriends(!collapseFriends)}> {collapseFriends ? 'Hide Friends' : 'Friends'}</Button>
                <Collapse in={collapseFriends} timeout='auto' unmountOnExit>
                    <Friends />
                </Collapse>
            </>)
            }
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('react-target'));
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Popup />
        </ThemeProvider>
    </Provider>
)