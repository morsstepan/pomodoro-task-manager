import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {ServerProject} from "../../apiClient";

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
});

const Project: React.FC<IProjectProps> = ({ project, onDelete }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
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
                <Button size="small">Open</Button>
                <Button size="small"><EditIcon /></Button>
                <Button size="small" onClick={() => onDelete(project)}><DeleteIcon /></Button>
            </CardActions>
        </Card>
    );
};

export default Project;