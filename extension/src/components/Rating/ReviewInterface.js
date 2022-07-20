import React from 'react'
import { IconButton, Grid } from '@mui/material';
import { ThumbUp, ThumbDown, ArrowLeft, ArrowRight} from '@mui/icons-material';

const ReviewInterface = ({ getReviewInfo, mostRecentReviews, viewReview }) => {

    const navigateRight = () => {
        getReviewInfo(mostRecentReviews[viewReview.reviewIndex+1], viewReview.reviewIndex+1);
    }

    const navigateLeft = () => {
        getReviewInfo(mostRecentReviews[viewReview.reviewIndex-1], viewReview.reviewIndex-1);
    }
  return (
    <Grid container>
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
            <IconButton>
                <ThumbUp/>
            </IconButton>
        </Grid>
    </Grid>
  )
}

export default ReviewInterface