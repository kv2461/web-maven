import React,{ useState } from 'react';
import { Button } from '@mui/material';

import Actions from './Actions/Actions';

const Interface = ({url}) => {

    const user = JSON.parse(localStorage.getItem('web-maven-profile'));
    const [showAdd, setShowAdd] = useState(false);


  return (
    <>
        <div style={{display:'flex',flexDirection:'row'}}>
            <Button onClick={()=>setShowAdd(!showAdd)}>+</Button>
            <Button>-</Button>
        </div>
        <div>
            {showAdd && (<Actions showAdd={showAdd} />
            )}
        </div>
    </>
  )
}

export default Interface