import React from 'react'
import { IconButton, Grid } from '@mui/material';
import { ThumbUp, ThumbDown, ArrowLeft, ArrowRight} from '@mui/icons-material';

const ReviewInterface = () => {
  return (
    <Grid container>
        <Grid item xs={3}>
            <IconButton>
                <ArrowLeft/>
            </IconButton>
        </Grid>
        <Grid item xs={3}>
            <IconButton>
                <ArrowRight/>
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