import React, {useCallback, useState} from 'react';
import DateFnsUtils from "@date-io/moment";
import TextField from "@material-ui/core/TextField";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import moment from "moment";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import { useOktaAuth } from "@okta/okta-react";
import APIClient from "../../apiClient";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1)
        }
    }
}));

interface ICreateProjectFormProps {
    onCreateFinished?(): void;
}

const CreateProjectForm: React.FC<ICreateProjectFormProps> = ({ onCreateFinished }) => {
    const classes = useStyles();
    const { authService } = useOktaAuth();

    const [name, setName] = useState("");
    const [date, setDate] = useState(moment());

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const client = await APIClient.getFromService(authService);
        await client.createProject({
            id: uuid(),
            name,
            due_date: date.toISOString().slice(0, 10)
        });

        setName("");
        setDate(moment());

        onCreateFinished && onCreateFinished();
    }, [name, date, authService, onCreateFinished]);

    const handleNameChange = useCallback((event) => setName(event.target.value), [setName]);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
                <TextField label="Project Name" value={name} onChange={handleNameChange} required />
                <DatePicker value={date} onChange={setDate as any} disablePast format="MMMM Do YYYY" label="Due Date" required />
                <Button variant="contained" type="submit" color="primary">Create Project</Button>
            </form>
        </MuiPickersUtilsProvider>
    )
};

export default CreateProjectForm;