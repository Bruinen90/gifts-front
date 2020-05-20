import { styled } from "@material-ui/styles";
import { Box, Theme, Typography } from "@material-ui/core";

export const LogoBox = styled(Box)(
    ({ theme, scale = 1 }: { theme: Theme; scale?: number }) => ({
        maxHeight: "30px",
        fontSize: 1.33 * scale + "rem",
        [theme.breakpoints.up("sm")]: {
            height: "1em",
        },
        [theme.breakpoints.up("xl")]: {
            height: "1.7em",
        },
    })
);

export const LogoText = styled(Typography)(({ theme }: { theme: Theme }) => ({
    textTransform: "uppercase",
    fontFamily: "Poiret One, cursive",
    fontSize: "1.5em",
    lineHeight: "0.9em",
}));

export const GiftIcon = styled("img")(({ theme }: { theme: Theme }) => ({
    height: "1.7em",
    margin: "0 0.2em",
}));
