import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    typography: {
        fontSize: 10,
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