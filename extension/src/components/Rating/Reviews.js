import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, Button, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Container, TextField } from '@mui/material';
import Review from './Review';
import ReviewInterface from './ReviewInterface';

import { SubmitReview } from '../../actions/ratings';

const Reviews = ({ url, tab, urlRatings, average, userUrlRatings }) => {
    const dispatch =  useDispatch();
    const [collapseReviews, setCollapseReviews] = useState(false);
    const [collapseAddReview, setCollapseAddReview] = useState(false);
    const [sortBy, setSortBy] = useState('mostRecent');
    const [review, setReview] = useState('');

    const submitReview = async () => {
        console.log(review); //to be saved in review model
        console.log(url); //to find urlRatings Id and add to reviews
        dispatch(SubmitReview(url,review));
    }
    
  return (
    <>
        <div sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <Button onClick={()=>{setCollapseReviews(!collapseReviews);setCollapseAddReview(false)}}>Reviews</Button>
        {userUrlRatings.rating > 0 && <Button onClick={()=>{setCollapseAddReview(!collapseAddReview);setCollapseReviews(false)}}>Add Review</Button>}
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
        {collapseAddReview && 
            <Paper sx={{width:'85vw', position:'relative', left:'calc(-28vw + 50%)', p:0, paddingLeft:1, paddingRight:1}}>
                <FormControl fullWidth>
                  <TextField
                    multiline
                    rows={5}
                    sx={{fontSize:'0.8rem', padding:1}}
                    id="review-select"
                    value={review}
                    label="Write Review"
                    onChange={(e)=>{setReview(e.target.value)}}
                  >
                  </TextField>
                </FormControl>
                <Button sx={{float:'right'}} onClick={submitReview}>
                    Submit
                </Button>
            </Paper>
        }
    </>
  )
}

export default Reviews