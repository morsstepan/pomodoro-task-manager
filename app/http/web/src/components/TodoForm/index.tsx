import React, { useCallback, useState } from "react";
import DateFnsUtils from "@date-io/moment";
import TextField from "@material-ui/core/TextField";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useOktaAuth } from "@okta/okta-react";
import APIClient from "../../apiClient";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

interface ITodoFormProps {
  projectId: string;
  onCreateFinished?(): void;
}

const TodoForm: React.FC<ITodoFormProps> = ({
  onCreateFinished,
  projectId,
}) => {
  const classes = useStyles();
  const { authService } = useOktaAuth();

  const [name, setName] = useState("");
  const [date, setDate] = useState(moment());

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const client = await APIClient.getFromService(authService);
      await client.createTodo({
        id: uuid(),
        name: name,
        due_date: date.toISOString().slice(0, 10),
        project_id: projectId,
        checked: false,
      });

      setName("");
      setDate(moment());

      onCreateFinished && onCreateFinished();
    },
    [name, date, authService, onCreateFinished]
  );

  const handleNameChange = useCallback((event) => setName(event.target.value), [
    setName,
  ]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="Todo"
          value={name}
          onChange={handleNameChange}
          required
        />
        <DatePicker
          value={date}
          onChange={setDate as any}
          disablePast
          format="MMMM Do YYYY"
          label="Due Date"
          required
        />
        <Button variant="contained" type="submit" color="primary">
          Create Todo
        </Button>
      </form>
    </MuiPickersUtilsProvider>
  );
};

export default TodoForm;
