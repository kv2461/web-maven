import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import  mainSlice  from './reducers/main';

import { useDispatch } from 'react-redux';

import StickyNote from './components/StickyNote';
import {GetInfoByUsername} from './actions/main';

const store = configureStore({
    reducer: {
        mainSlice:mainSlice,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});

const Popup = () => {
    const [url, setUrl] = useState('')
    const dispatch = useDispatch();

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
        dispatch(GetInfoByUsername('kv2461'));
    },[url])
    

    return(
        <div>
            <h1>Hello, world!</h1>
            <StickyNote />
            {url !== '' && <p>{JSON.stringify(url)}</p>}
            <button onClick={()=>getTabInfo()}>click</button>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('react-target'));
root.render(
    <Provider store={store}>
        <Popup />
    </Provider>
)