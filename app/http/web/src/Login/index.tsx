import React from 'react';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        height: '100vh',
        backgroundColor: 'black'
    },
    flex: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 600,
        margin: '0 auto',
        textAlign: 'center',
        '& > *': {
            marginBottom: '20px'
        }
    },
    authors: {
        fontWeight: 'bold',
        background: 'linear-gradient(to bottom, red, orange, yellow, mediumseagreen, deepskyblue, orchid)',
        '-webkit-background-clip': 'text',
        textFillColor: 'transparent'
    },
    name: {
        fontSize: '2.7rem'
    },
    actNow: {
        textDecoration: 'none',
        borderBottom: '1px solid white',
        color: 'white'
    }
}));

const Login: React.FC = () => {
    const classes = useStyles();
    const { authState, authService } = useOktaAuth();

    if (authState.isPending) {
        return <div>Loading...</div>
    }

    return authState.isAuthenticated ? <Redirect to="/home" /> : (
        <div className={classes.root}>
            <div className={classes.flex}>
                <Typography className={classes.name} variant="h3" style={{color: '#ff6347'}}>Pomodoro Task Manager</Typography>
                <Typography variant="h5" component="div" style={{color: '#289CD3'}}>We stand with the Black community against racism, violence, and hate.</Typography>
                <Typography variant="h6" component="div" style={{color: 'white'}}>
                    Now more than ever we must support one another as allies and speak up for justice and equality.
                </Typography>
                <Typography variant="h6">
                    <a className={classes.actNow} href="https://secure.actblue.com/donate/ms_blm_homepage_2019" target="_blank">
                        Support Black Lives Matter 👉
                    </a>
                </Typography>
                <Button variant="contained" color="primary" onClick={() => authService.login('/home')}>Login</Button>
                <Typography variant="h6" component="div" className={classes.authors}>
                    Made by:<br/>
                    Egor Tsakov<br/>
                    Anton Masin<br/>
                    Ilya Sychikov<br/>
                    Stepan Morozov<br/>
                    Vyacheslav Pukhanov
                </Typography>
            </div>
        </div>
    );
};

export default Login;