import React, { useEffect, useState, useCallback } from 'react';
import APIClient, { ServerProject } from '../apiClient';
import { useOktaAuth } from '@okta/okta-react';
import { Card, CardContent, Typography, Button, CardActions, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface IProjectViewProps {
  match: {
    params: {
      id: string
    }
  };
}

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
  },
});

const ProjectView: React.FC<IProjectViewProps> = (props) => {
  const { match: { params: { id } } } = props;
  const { authService } = useOktaAuth();
  const classes = useStyles();
  const [project, setProject] = useState<ServerProject>();

  const requestProject = useCallback(async () => {
    const client = await APIClient.getFromService(authService);
    const project = await client.getProject(id);
    setProject(project);
  }, [id, authService, setProject]);

  useEffect(() => {
    requestProject();
  }, [requestProject]);

  if (project) {
    return (
      <Card>
        <CardActions>
          <Link to={'/home'} className={classes.link}>
            <Button size="small">Back</Button>
          </Link>
        </CardActions>
        <CardContent>
          <Typography component="h2">
            {project?.name}
          </Typography>
          <Typography color="textSecondary">
              Due by: {project?.due_date}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return null;
}

export default ProjectView;