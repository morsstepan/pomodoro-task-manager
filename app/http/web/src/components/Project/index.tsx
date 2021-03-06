import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { Link } from "react-router-dom";
import { ServerProject } from "../../apiClient";

interface IProjectProps {
  project: ServerProject;

  // TODO Edit
  onDelete(project: ServerProject): void;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    textDecoration: "none",
  },
});

const Project: React.FC<IProjectProps> = ({ project, onDelete }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Project
        </Typography>
        <Typography variant="h5" component="h2">
          {project.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Due by: {project.due_date}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={"projects/" + project.id} className={classes.link}>
          <Button size="small">Open</Button>
        </Link>
        <Button size="small" onClick={() => onDelete(project)}>
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Project;
