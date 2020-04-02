import React from "react";
import { Link as RouterLink } from "react-router-dom";

// MUI
import { Drawer, Box, Button } from "@material-ui/core";

// Components
import NavigationList from "../NavigationList/NavigationList";

interface NavigationDrawerProps {
    opened: boolean;
    toggleNavigationDrawer: () => void;
    userLoggedIn: boolean;
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
    opened,
    toggleNavigationDrawer,
    userLoggedIn
}) => {
    return (
        <Drawer anchor="left" open={opened} onClose={toggleNavigationDrawer}>
            <Box
                paddingY="30px"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="100%"
                style={{ minWidth: "280px" }}
            >
                <NavigationList
                    hideDrawer={toggleNavigationDrawer}
                    view="modal"
                    userLoggedIn={userLoggedIn}
                />
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    height="90px"
                    width="80%"
                    margin="0 auto"
                >
                    <Button
                        component={RouterLink}
                        to="/logowanie"
                        color="secondary"
                        variant="contained"
                        onClick={toggleNavigationDrawer}
                    >
                        Zaloguj się
                    </Button>
                    <Button
                        component={RouterLink}
                        to="/rejestracja"
                        color="secondary"
                        variant="contained"
                        onClick={toggleNavigationDrawer}
                    >
                        Utwórz konto
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};
export default NavigationDrawer;
