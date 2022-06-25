import { List } from '@mui/material';
import { styled } from '@mui/system';
// import { theme } from '../../../../Theme';

export const StyledList = styled(List, {})({
    width:'100%',
    backgroundColor:'backround.paper',
    position:'relative',
    overflow:'auto',
    maxHeight:300,
    '& ul':{padding:0},
})
