import React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Box,
    Typography,
    CardActions,
    Button
} from "@material-ui/core";

interface DrawResultsProps {
    username: String;
    wishlist?: [String];
}

const DrawResults = ({ username, wishlist }: DrawResultsProps) => (
    <Card variant="outlined">
        <CardHeader
            title="Wyniki losowania"
            titleTypographyProps={{
                align: "center",
                color: "primary",
                style: { textTransform: "uppercase", fontWeight: "lighter" }
            }}
        />
        <CardContent>
            <Box textAlign="center">
                <Typography
                    color="textSecondary"
                    variant="overline"
                    component="div"
                >
                    Losowanie zakończone! Wylosowałeś użytkownika:
                </Typography>
                <Typography
                    variant="h3"
                    component="div"
                    style={{ fontWeight: "lighter" }}
                >
                    {username}
                </Typography>
            </Box>
        </CardContent>
        <CardActions>
            <Button color="primary" style={{ margin: "auto" }}>
                Zobacz listę życzeń
            </Button>
        </CardActions>
    </Card>
);

export default DrawResults;
