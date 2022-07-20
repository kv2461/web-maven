import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, Button, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Container, TextField } from '@mui/material';
import { Star, ThumbUp, ThumbDown } from '@mui/icons-material';
import Review from './Review';
import ReviewInterface from './ReviewInterface';

import { SubmitReview, GetReviewItem } from '../../actions/ratings';

const Reviews = ({ url, tab, urlRatings, average, userUrlRatings, userReview, mostRecentReviews }) => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'));
    const dispatch =  useDispatch();
    const [collapseReviews, setCollapseReviews] = useState(false);
    const [collapseAddReview, setCollapseAddReview] = useState(false);
    const [sortBy, setSortBy] = useState('mostRecent');
    const [review, setReview] = useState('');
    const [edit, setEdit] = useState(false);
    const [update, setUpdate] = useState(false);
    const [viewReview, setViewReview] = useState({});

    const getReviewInfo = async (reviewItem, num) => {
        const data = await dispatch(GetReviewItem(reviewItem));
        setViewReview({username:data.username, userId:reviewItem.userId, review:reviewItem.review, approval:data.approval, rating:data.rating, _id:reviewItem._id, reviewIndex:num, voters:data.voters, downVoters:data.downVoters})
        // setViewReview(reviewItem);
    }
    
    useEffect( ()=> {
        setReview(userReview.review);
    },[userReview])

    useEffect( ()=> {
        if (mostRecentReviews) {
           getReviewInfo(mostRecentReviews[0],0);
        }
    },[])
    

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
                <Review review={viewReview}/>
                <ReviewInterface getReviewInfo={getReviewInfo} mostRecentReviews={mostRecentReviews} viewReview={viewReview}/>
            </Container>
            </Paper>
        }


        
        {collapseAddReview && 
            <Paper sx={{width:'85vw', position:'relative', left:'calc(-28vw + 50%)', p:0, paddingLeft:1, paddingRight:1}}>
                {userReview?.review?.length > 0 &&   //for users who already reviewed
                    <Container sx={{marginTop:1}}>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <Typography sx={{fontWeight:1000}}>{user?.result?.username}</Typography>
                        <div style={{display:'flex', flexDirection:'row'}}>
                            <div style={{display:'flex', flexDirection:'row'}}>
                                <Typography>&#40;{userUrlRatings?.rating}&#41;</Typography>
                                <Star sx={{color:'rgba(239,178,61,1)'}}/>
                            </div>
                            <div style={{display:'flex', flexDirection:'row',}}>
                                <Typography sx={{paddingLeft:2}}>&#40;{userReview?.approval}&#41;</Typography>
                                {userReview?.approval >= 0 && <ThumbUp sx={{paddingLeft:1, color:'primary.main', }}/>} 
                                {userReview?.approval < 0 && <ThumbDown sx={{paddingLeft:1, color:'secondary.main', }}/>}
                            </div>
                        </div>
                        </div>

                        <Typography>{userReview?.review}</Typography>
                    </Container>}


                {(!userReview?.review?.length  || edit) && // for who want to edit or add new
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
                </FormControl>}
                {userReview?.review?.length > 0 && <Button sx={{float:'left'}} onClick={()=>setEdit(!edit)}>Edit</Button>}

                {!userReview?.review && <Button sx={{float:'right'}} onClick={submitReview}>
                    Submit
                </Button>}

                {userReview?.review && edit && !update && <Button sx={{float:'right'}} onClick={()=>setUpdate(true)}>
                    Update
                </Button>}

                {userReview?.review && update && <> <Typography sx={{color:'red'}}>Are you sure? Approval votes will be reset</Typography>
                <Button onClick={submitReview}>Update</Button>
                <Button onClick={()=>setUpdate(false)}>Cancel</Button>
                </>}
            </Paper>
        }
    </>
  )
}

export default Reviews