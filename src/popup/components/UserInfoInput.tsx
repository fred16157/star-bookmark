import React from "react";
import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    textField: {
        margin: 8,
    },
    button: {
        float: "right"
    }
});

export default function UserInfoInput(props) {
    const classes = useStyles();
    const [user, setUser] = React.useState('');
    const onNameChanged = (event) => {
        setUser(event.target.value);
    }
    return (
        <Box>
            <Typography variant="h6">GitHub ID 설정</Typography>
            <TextField label="GitHub ID" className={classes.textField} fullWidth value={user} onChange={onNameChanged} />
            <Button variant="contained" className={classes.button} color="primary">확인</Button>
        </Box>
    );
}