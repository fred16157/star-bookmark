import React from "react";
import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    button: {
        marginTop: "8px",
        float: "right"
    }
});

export default function UserInfoInput({ onUserChanged }) {
    const classes = useStyles();
    const [user, setUser] = React.useState('');

    const onValueChange = (event) => {
        setUser(event.target.value);
    }

    const onUserSubmit = (event) => {
        chrome.storage.sync.set({
            user: user
        }, () => {
            onUserChanged();
        });
    }
    return (
        <form onSubmit={onUserSubmit}>
            <Typography variant="h6">GitHub ID 설정</Typography>
            <TextField label="GitHub ID" fullWidth value={user} onChange={onValueChange}/>
            <Button variant="contained" type="submit" className={classes.button} color="primary">확인</Button>
        </form>
    );
}