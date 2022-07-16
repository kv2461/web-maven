import { createTheme } from "@mui/material/styles";
import './index.css';

const robotoFont = "'Roboto', sans-serif";
// const acmeFont = "'Acme', sans-serif";
// const playFont = "'Play', sans-serif";
// const bebasNeueFont = "'Bebas Neue', cursive";

export const theme = createTheme({
    typography: {
        fontFamily: robotoFont,
        button: {
            fontSize: 13,
            letterSpacing:0.8,
            fontWeight:700,
            textTransform:'none'
        },
        fontSize: 12,
        fontWeight:700
    },
    palette: {
        type: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: 'rgb(220,0,78)',
        },
        background: {
            default:'#fff',
            paper:'#fff',
        },
    },
});