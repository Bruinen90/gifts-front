import React from "react";
import { WishesListProps } from "../../interfaces/WishTypes";
import { List, Card, CardHeader } from "@material-ui/core";

const WishesList = ({ wishesList, viewMode }: WishesListProps) => {
    return (
        <List>
            {wishesList.map(wish => (
                <Card>
                    <CardHeader title={wish.title} />
                </Card>
            ))}
        </List>
    );
};

export default WishesList;
