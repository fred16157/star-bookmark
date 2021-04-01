import { ListItem, ListItemText, Typography } from "@material-ui/core";
import React from "react";
import { RepositoryInfo } from "../../github";

interface RepositoryCardProps {
    repo: RepositoryInfo
}

export default class RepositoryCard extends React.Component<RepositoryCardProps, any> {
    constructor(props) {
        super(props)
    }

    ListItemLink(props) {
        return <ListItem button divider component="a" {...props} />;
    }

    render() {
        const { repo } = this.props;
        return (
            <this.ListItemLink href={repo.htmlUrl} target="_blank">
                <ListItemText primary={repo.name} secondary={
                        <React.Fragment>
                            <Typography
                                variant="body2"
                                color="textPrimary"
                            >
                                {repo.description}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                            >
                                {`${repo.language} - 최종 업데이트 ${repo.updatedAt.toLocaleString()}`}
                            </Typography>
                        </React.Fragment>
                    } 
                >

                </ListItemText>
            </this.ListItemLink>
        )
    }

}