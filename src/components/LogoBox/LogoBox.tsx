import React from "react";
import { useHistory } from "react-router";
import GiftIcon from "../../img/gift.svg";

// MUI
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    logoText: {
        lineHeight: "1.7rem",
        textTransform: "uppercase",
        fontFamily: "Poiret One, cursive",
        fontSize: "2rem"
    }
});

const LogoBox: React.FC = () => {
    const history = useHistory();
    const classes = useStyles();

    const handleGoToHomepage = () => {
        history.push("/");
    };
    return (
        <Box
            onClick={handleGoToHomepage}
            display="flex"
            alignItems="flex-end"
            style={{ cursor: "pointer" }}
        >
            <Typography component="div" className={classes.logoText}>
                Bez
            </Typography>
            <img
                src={GiftIcon}
                style={{ height: "2rem", margin: "0 0.5rem" }}
            />
            <Typography component="div" className={classes.logoText}>
                niespodzianek
            </Typography>
        </Box>
    );
};

export default LogoBox;
