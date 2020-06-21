import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';

import Login from '../Login';
import Home from '../Home';
import ProjectView from '../ProjectView';

const Main: React.FC = () => (
    <Router>
        <Security
            issuer="https://dev-651889.okta.com"
            clientId="0oafa4per8HPBVboe4x6"
            redirectUri="http://localhost:8080/implicit/callback"
            scope={['openid', 'profile', 'email']}>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/implicit/callback" component={LoginCallback} />
                <SecureRoute path="/home" component={Home} />
                <SecureRoute path="/projects/:id" component={ProjectView} />
            </Switch>
        </Security>
    </Router>
);

export default Main;