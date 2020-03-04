import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import indigo from '@material-ui/core/colors/indigo';
import { useStyles } from './App-styles';
import AppRouter from '../app-router';

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        type: 'dark',
    },
});

const App = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.root}>
                <AppRouter />
            </div>
        </ThemeProvider>
    );
};

export default App;
