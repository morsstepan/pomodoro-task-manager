import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useOktaAuth } from "@okta/okta-react";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import APIClient, { ServerProject, ServerTodo } from "../apiClient";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

interface IProjectViewProps {
  match: {
    params: {
      id: string;
    };
  };
}

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
});

const ProjectView: React.FC<IProjectViewProps> = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;
  const { authService } = useOktaAuth();
  const classes = useStyles();
  const [project, setProject] = useState<ServerProject>();
  const [todos, setTodos] = useState<ServerTodo[]>();

  const requestProject = useCallback(async () => {
    const client = await APIClient.getFromService(authService);
    const project = await client.getProject(id);
    setProject(project);
    const todos = await client.getTodos(id);
    setTodos(todos);
  }, [id, authService, setProject, setTodos]);

  const checkedChange = useCallback(
    async (todo: ServerTodo) => {
      const newTodo = { ...todo, checked: !todo.checked };
      const client = await APIClient.getFromService(authService);
      await client.updateTodo(newTodo);
      requestProject();
    },
    [authService, requestProject]
  );

  useEffect(() => {
    requestProject();
  }, [requestProject]);

  if (project) {
    return (
      <Card>
        <CardActions>
          <Link to={"/home"} className={classes.link}>
            <Button size="small">Back</Button>
          </Link>
        </CardActions>
        <CardContent>
          <Typography component="h2">{project?.name}</Typography>
          <Typography color="textSecondary">
            Due by: {project?.due_date}
          </Typography>
          {todos && <TodoList todos={todos} onCheckedChange={checkedChange} />}
          <TodoForm projectId={id} onCreateFinished={requestProject} />
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default ProjectView;
