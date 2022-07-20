import React from 'react'
import { Container, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';

const Review = () => {
  return (
    <Container sx={{marginTop:1}}>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <Typography sx={{fontWeight:1000}}>user :</Typography>
        <div style={{display:'flex', flexDirection:'row'}}>
            <Typography>&#40;4.2&#41;</Typography>
            <Star sx={{color:'rgba(239,178,61,1)'}}/>
        </div>
        </div>
        
        <Typography>Dec 28, 2021 — In VS Code if I type "lorem" and then press enter it will generate a paragraph of lorem ipsum. The only problem is that the paragraph comes ...
3 answers
 
·
 
1 vote: 
I think you have to put each lorem call into its own element, like p*4>lorem10. lo</Typography>
    </Container>
  )
}

export default Review