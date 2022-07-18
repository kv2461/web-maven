import React from 'react';
import { Typography, Paper } from '@mui/material';
import { Star } from '@mui/icons-material';

const WideRatings = ({ url, tab, urlRatings, average, userUrlRatings}) => {
    console.log(urlRatings)
  return (
    <>
        <Paper sx={{display:'flex', flexDirection:'row', alignItems:'center', p:1, m:1, marginLeft:0}}>
            <img style={{maxHeight:'1.1rem', paddingRight:1}} src={tab.favIconUrl} />
            <Typography variant='body3'>
                {tab?.title?.length > 60 ? `${tab?.title?.slice(0,60)}...` : `${tab?.title}`}
            </Typography>
        </Paper>
        <div style={{display:'flex', flexDirection:'row'}}>
        <Typography>Rated &#40;{average.toFixed(2) || '0'}&#41; </Typography>
        <Star sx={{color:'rgba(239,178,61,1)'}}/> 
        <Typography> by {urlRatings?.raters?.length || '0'} users</Typography>
        </div>
        {userUrlRatings && <div style={{display:'flex', flexDirection:'row'}}>
        <Typography>You rated it as a &#40;{userUrlRatings?.rating || '0'}&#41;</Typography>
        <Star sx={{color:'rgba(239,178,61,1)'}}/> 
        </div>}
        
    </>
  )
}

export default WideRatings