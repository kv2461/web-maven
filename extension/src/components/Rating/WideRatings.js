import React from 'react';
import { Typography, Paper } from '@mui/material';
import { Star } from '@mui/icons-material';

const WideRatings = ({ url, tab }) => {
    console.log(tab)
  return (
    <>
        <Paper sx={{display:'flex', flexDirection:'row', alignItems:'center', p:1, m:1, marginLeft:0}}>
            <img style={{maxHeight:'1.1rem'}} src={tab.favIconUrl} />
            <Typography variant='body3'>
                {tab?.title?.length > 60 ? `${tab?.title?.slice(0,60)}...` : `${tab?.title}`}
            </Typography>
        </Paper>
        <div style={{display:'flex', flexDirection:'row'}}>
        <Typography>Rated</Typography>
        <Star sx={{color:'rgba(239,178,61,1)'}}/> 
        <Typography>&#40;4.20&#41; by 69 users</Typography>
        </div>
    </>
  )
}

export default WideRatings