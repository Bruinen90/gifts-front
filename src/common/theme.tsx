import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let theme = createMuiTheme({
    palette: {
        primary: {
            main: "#388e3c",
        },
        secondary: {
            main: "#e53935",
        },
    },
    typography: {
        h1: {
            fontFamily: "Poiret One",
        },
        h2: {
            fontFamily: "Poiret One",
        },
        h3: {
            fontFamily: "Poiret One",
        },
        h4: {
            fontFamily: "Poiret One",
            marginBottom: "2rem",
        },
        h5: {
            fontFamily: "Poiret One",
        },
        h6: {
            fontFamily: "Poiret One",
        },
    },
});

theme = responsiveFontSizes(theme);
export { theme };
