import React from 'react'
import { Container, Typography } from '@mui/material';
import { Star, ThumbUp, ThumbDown } from '@mui/icons-material';

const Review = ({ review }) => {
  
  return (
    <Container sx={{marginTop:1}}>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <Typography sx={{fontWeight:1000}}>{review.username}</Typography>
        <div style={{display:'flex', flexDirection:'row'}}>
            <Typography>&#40;{review.rating}&#41;</Typography>
            <Star sx={{color:'rgba(239,178,61,1)'}}/>
            <div style={{display:'flex', flexDirection:'row',}}>
                <Typography sx={{paddingLeft:2}}>&#40;{review?.approval}&#41;</Typography>
                {review?.approval >= 0 && <ThumbUp sx={{paddingLeft:1, color:'primary.main', }}/>} 
                {review?.approval < 0 && <ThumbDown sx={{paddingLeft:1, color:'secondary.main', }}/>}
                {/* {userReview?.approval >= 0 && <ThumbUp sx={{paddingLeft:1, color:'primary.main', }}/>} 
                {userReview?.approval < 0 && <ThumbDown sx={{paddingLeft:1, color:'secondary.main', }}/>} */}
            </div>
        </div>
        </div>
        <Typography>&ldquo;{review.review}&rdquo;</Typography>
    </Container>
  )
}

export default Review