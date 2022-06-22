import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';

import StickyNote from './components/StickyNote';


const Popup = () => {
    const [url, setUrl] = useState('')

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
    <Popup />
)