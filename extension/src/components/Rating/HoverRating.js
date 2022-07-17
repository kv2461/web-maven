import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Rating, Box } from '@mui/material';
import { Star } from '@mui/icons-material';

import { RateUrl } from '../../actions/ratings';
import WideRatings from './WideRatings';


const HoverRating = ({ value, setValue, hover, setHover, labels, getLabelText, url, tab, urlRatings, userUrlRatings }) => {
    const dispatch = useDispatch();
    const [infoHover, setInfoHover] = useState(false);

    const rateUrl = async () => {
      await dispatch(RateUrl(url, value));
    }

    useEffect(() => {
      if (value !== 0) {
        rateUrl();
      }
      
    },[value])
    
  return (
    <Box
        onMouseEnter = {()=>setInfoHover(true)}
        onMouseLeave = {()=>setInfoHover(false)}

      sx={{
        width: 200,
        display: 'flex',
        flexDirection:'column',
        alignItems: 'flex-start',
      }}
    >
    <div style={{display:'flex', flexDirection:'row', }}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
      
      </div>
      {infoHover && <WideRatings url={url} tab={tab} urlRatings={urlRatings}/>}
    </Box>
  )
}

export default HoverRating