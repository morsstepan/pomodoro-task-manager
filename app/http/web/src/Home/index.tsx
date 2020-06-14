import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import APIClient, {ServerProject} from "../apiClient";
import { useOktaAuth } from '@okta/okta-react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        padding: 20
    },
});

const Home: React.FC = () => {
    const { authService } = useOktaAuth();
    const classes = useStyles();

    const [projects, setProjects] = useState<ServerProject[]>([]);

    useEffect(() => {
        const requestProjects = async () => {
            const accessToken = await authService.getAccessToken();
            const projects = await new APIClient(accessToken).getProjects();
            setProjects(projects);
        };
        requestProjects();
    }, []);

    const renderProjects = () => <div>Projects</div>;

    return (
        <Grid container spacing={4} className={classes.root}>
            {renderProjects()}
        </Grid>
    );
};

export default Home;