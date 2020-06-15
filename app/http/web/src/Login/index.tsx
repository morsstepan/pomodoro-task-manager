import React from 'react';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const Login: React.FC = () => {
    const { authState, authService } = useOktaAuth();

    if (authState.isPending) {
        return <div>Loading...</div>
    }

    return authState.isAuthenticated ? <Redirect to="/home" /> : (
        <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Button variant="contained" color="primary" onClick={() => authService.login('/home')}>Login</Button>
        </div>
    );
};

export default Login;