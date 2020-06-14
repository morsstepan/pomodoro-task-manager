import React, {useCallback, useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import APIClient, {ServerProject} from "../apiClient";
import { useOktaAuth } from '@okta/okta-react';
import {makeStyles} from "@material-ui/core/styles";
import CreateProjectForm from "../components/CreateProjectForm";
import Project from "../components/Project";

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

    const requestProjects = useCallback(async () => {
        const client = await APIClient.getFromService(authService);
        const projects = await client.getProjects();
        setProjects(projects);
    }, [authService, setProjects]);

    const deleteProject = useCallback(async (project: ServerProject) => {
        const client = await APIClient.getFromService(authService);
        await client.deleteProject(project);
        requestProjects();
    }, [authService]);

    const renderProjects = () => projects.map((project) => (
        <Grid item key={project.id}>
            <Project project={project} onDelete={() => deleteProject(project)} />
        </Grid>
    ));

    useEffect(() => {
        requestProjects();
    }, []);

    return (
        <>
            <Grid container spacing={4} className={classes.root}>
                {renderProjects()}
            </Grid>
            <CreateProjectForm onCreateFinished={requestProjects} />
        </>
    );
};

export default Home;