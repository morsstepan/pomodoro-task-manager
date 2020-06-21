import { Checkbox, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { ServerTodo } from "../../apiClient";

interface TodoProps {
  todo: ServerTodo;
  onCheckedChange(): void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  done: {
    opacity: 0.5,
    textDecoration: "line-through",
  },
}));

const Todo: React.FC<TodoProps> = ({ todo, onCheckedChange }) => {
  const classes = useStyles();
  const className = `${classes.root} ${todo.checked ? classes.done : ""}`;
  return (
    <div className={className}>
      <Checkbox checked={todo.checked} onChange={onCheckedChange} />
      <Typography>{todo.name}</Typography>
      <Typography color="textSecondary">{todo.due_date}</Typography>
    </div>
  );
};

export default Todo;
