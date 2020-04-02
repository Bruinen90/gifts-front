import { styled } from "@material-ui/core/styles";

import { Container, Typography, Box } from "@material-ui/core";

export const MainContainer = styled(Container)({
    backgroundColor: "#333",
    minHeight: "calc(100vh - 64px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
});

export const MyBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
        maxWidth: "40vw"
    }
}));

export const GiftIllustration = styled("img")(({ theme }) => ({
    maxHeight: "50vh",
    [theme.breakpoints.up("xs")]: {
        maxHeight: "33vh"
    }
}));

export const Header = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(4),
    fontFamily: "Poiret One, cursive"
}));

export const DescriptionBox = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(4),
    width: '70%',
    fontSize: '1.25rem',
    textAlign: 'justify',
    fontWeight: 'lighter',
}));
