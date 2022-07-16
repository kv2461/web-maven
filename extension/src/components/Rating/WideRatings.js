import React from 'react';
import { Typography, Paper } from '@mui/material';
import { Star } from '@mui/icons-material';

const WideRatings = ({ url, tab }) => {
    console.log(tab)
  return (
    <>
        <Paper sx={{display:'flex', flexDirection:'row', alignItems:'stretch', p:1}}>
            <img style={{maxHeight:'1.1rem'}} src={tab.favIconUrl} />
            <Typography sx={{paddingBottom:1}} variant='body3'>
                {tab?.title?.length > 30 ? `${tab?.title?.slice(0,30)}...` : `${tab?.title}`}
            </Typography>
        </Paper>
        <div style={{display:'flex', flexDirection:'row'}}>
        <Typography>Rated</Typography>
        <Star /> 
        <Typography>4.20 by 69 users.</Typography>
        </div>
    </>
  )
}

export default WideRatings