import React, { useState, useEffect } from 'react';
import { Collapse, Button, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Container } from '@mui/material';
import Review from './Review';
import ReviewInterface from './ReviewInterface';
const Reviews = ({}) => {
    const [collapseReviews, setCollapseReviews] = useState(false);
    const [collapseAddReview, setCollapseAddReview] = useState(false);
    const [sortBy, setSortBy] = useState('mostRecent');
    
  return (
    <>
        <div sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <Button onClick={()=>{setCollapseReviews(!collapseReviews);setCollapseAddReview(false)}}>Reviews</Button>
        <Button onClick={()=>{setCollapseAddReview(!collapseAddReview);setCollapseReviews(false)}}>Add Review</Button>
        </div>
        {collapseReviews && 
            <Paper sx={{width:'85vw', position:'relative', left:'calc(-28vw + 50%)', p:0, paddingLeft:1, paddingRight:1}}>
                <FormControl fullWidth>
                  <InputLabel id="review-select-label">Sort By</InputLabel>
                  <Select
                    sx={{fontSize:'0.7rem'}}
                    labelId="review-select-label"
                    id="review-select"
                    value={sortBy}
                    label="Sort By"
                    onChange={(e)=>{setSortBy(e.target.value)}}
                  >
                    <MenuItem value={'mostRecent'}>Newest</MenuItem>
                    <MenuItem value={'mostHelpful'}>Most Helpful</MenuItem>
                    <MenuItem value={'leastHelpful'}>Controversial</MenuItem>
                  </Select>
                </FormControl>

            <Container sx={{display:'flex',flexDirection:'column'}}>
                <Review />
                <ReviewInterface />
            </Container>
            </Paper>
        }
    </>
  )
}

export default Reviews