import React from 'react'
import { useDispatch } from 'react-redux';
import { IconButton, Grid } from '@mui/material';
import { ThumbUp, ThumbDown, ArrowLeft, ArrowRight} from '@mui/icons-material';

import { ApproveReview } from '../../actions/ratings';

const ReviewInterface = ({ getReviewInfo, mostRecentReviews, viewReview }) => {
    const user = JSON.parse(localStorage.getItem('web-maven-profile'));
    const dispatch = useDispatch();
    const userApproved = viewReview?.voters?.indexOf(user?.result?._id) !== -1

    const navigateRight = () => {
        getReviewInfo(mostRecentReviews[viewReview.reviewIndex+1], viewReview.reviewIndex+1);
    }

    const navigateLeft = () => {
        getReviewInfo(mostRecentReviews[viewReview.reviewIndex-1], viewReview.reviewIndex-1);
    }

    const approve = async () => {
        await dispatch(ApproveReview(mostRecentReviews[viewReview.reviewIndex]));

        await getReviewInfo(mostRecentReviews[viewReview.reviewIndex], viewReview.reviewIndex);
    }
  return (
    <Grid container sx={{m:1, paddingBottom:2, }}>
        <Grid item xs={3}>
            <IconButton disabled={mostRecentReviews[0]._id === viewReview._id} onClick={()=>{navigateLeft()}}>
                <ArrowLeft />
            </IconButton>
        </Grid>
        <Grid item xs={3}>
            <IconButton disabled={mostRecentReviews[mostRecentReviews.length-1]._id === viewReview._id} onClick={()=>{navigateRight()}}>
                <ArrowRight />
            </IconButton>
        </Grid>
        <Grid item xs={3}>
            <IconButton>
                <ThumbDown/>
            </IconButton>
        </Grid>
        <Grid item xs={3}>
            <IconButton onClick={()=>{approve()}}>
                <ThumbUp sx={userApproved?{color:'primary.main'}:{color:'secondary.text'}}/>
            </IconButton>
        </Grid>
    </Grid>
  )
}

export default ReviewInterface