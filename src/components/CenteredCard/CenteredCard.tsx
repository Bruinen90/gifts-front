// MUI
import { Card, Theme } from "@material-ui/core";
import { styled } from "@material-ui/core";

interface CenteredCardProps {
    maxWidth?: string;
    padding?: number | string;
    marginVertical?: number | string;
    theme: Theme;
}

export const CenteredCard = styled(Card)(
    ({ theme, maxWidth, padding, marginVertical }: CenteredCardProps) => ({
        maxWidth: maxWidth ? maxWidth : "600px",
        padding: padding
            ? typeof padding === "number"
                ? theme.spacing(padding/2)
                : padding
            : theme.spacing(1),
        margin:
            (marginVertical
                ? typeof marginVertical === "number"
                    ? `${theme.spacing(marginVertical)}px`
                    : marginVertical
                : `${theme.spacing(4)}px`) + " auto",
        [theme.breakpoints.up("md")]: {
            padding: padding
                ? typeof padding === "number"
                    ? theme.spacing(padding)
                    : padding
                : theme.spacing(2),
        },
    })
);
