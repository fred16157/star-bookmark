import { Button, Card, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core";
import { Error } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function NoRepos({ onRefreshClicked, onUserChangeClicked }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Error/>
                <Typography variant="h5" component="h2">
                    스타가 붙은 리포지토리 없음
                </Typography>
                <Typography variant="body2" component="p">
                    API 서버에서 스타가 붙은 리포지토리를 반환하지 않았습니다. 이 경우는 대체로 지정된 사용자가 스타를 붙인 리포지토리가 없을 때 발생합니다.
                    <br/>
                    <br/> 
                    혹시 에러나 버그라고 생각된다면 <a href="https://github.com/fred16157/star-bookmark" target="_blank">개발자의 리포지토리</a>에 이슈를 남겨주세요.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={onRefreshClicked}>새로고침</Button>
                <Button size="small" onClick={onUserChangeClicked}>사용자 변경</Button>
            </CardActions>
        </Card>
    )
}