import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { Button, Collapse, Typography, Container, Grid, } from '@mui/material';

import { GetFriends } from './actions/main';
import { GetFolders } from './actions/folders'

import mainSlice  from './reducers/main';
import authSlice from './reducers/auth';
import folderSlice from './reducers/folders';

import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../src/reducers/auth'
import { CLEAR } from '../src/reducers/main'

import Auth from './components/Auth/Auth';
import Interface from './components/Interface/Interface';
import BookmarkFolderMain from './components/BookmarkFolder/BookmarkFolderMain';
import Friends from './components/Friends/Friends';
import RatingMain from './components/Rating/RatingMain';

import { theme } from './Theme';


const store = configureStore({
    reducer: {
        mainSlice:mainSlice,
        authSlice:authSlice,
        folderSlice:folderSlice
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
    const [chromeTab, setChromeTab] = useState({});
    const [rerender, setRerender] = useState(false);
    const dispatch = useDispatch();
    
    const logout = () => {
        dispatch(LOGOUT());
        dispatch(CLEAR());
    }

    const getCurrentTab = async () => {
        let queryOptions = {active: true, lastFocusedWindow: true};
        let [tab] = await chrome.tabs.query(queryOptions);
        return tab
    }

    const getTabInfo = () => {
        const tab = getCurrentTab()
            .then((response) => {
                const {url} = response;
                setUrl(url);
                setChromeTab(response);
            })
    }

    useEffect(()=> {
        getTabInfo();

        dispatch(GetFriends());
        dispatch(GetFolders());
    },[])

    useEffect(()=> {
        setRerender(!rerender);
    },[authData])

    

    return(
        <Container sx={{p:1}}>
            
            {!user && <Auth />}
            
            
            {user && 
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>

            <RatingMain url={url} tab={chromeTab}/>

            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Typography>{user.result.username}</Typography>
            {/* <Typography> logged in</Typography> */}
            <Button sx={{color:'secondary.main'}}onClick={logout}>Log Out</Button>
            </div>
            </div>
            }

          


            {user && 
            (<> {url !== '' && (<Interface  url={url} tab={chromeTab}/>)}
            </>)
            }

        </Container>
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