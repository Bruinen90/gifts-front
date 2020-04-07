import React from "react";
import { Link as RouterLink } from "react-router-dom";

// MUI
import { Drawer, Box, Button } from "@material-ui/core";

// Components
import NavigationList from "../NavigationList/NavigationList";
import SignInUpOut from "../SignInUpOut/SignInUpOut";

interface NavigationDrawerProps {
    opened: boolean;
    toggleNavigationDrawer: () => void;
    userLoggedIn: boolean;
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
    opened,
    toggleNavigationDrawer,
    userLoggedIn,
}) => {
    return (
        <Drawer anchor="right" open={opened} onClose={toggleNavigationDrawer}>
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
                <SignInUpOut
                    variant="vertical"
                    username={undefined}
                    closeDrawer={toggleNavigationDrawer}
                />
            </Box>
        </Drawer>
    );
};
export default NavigationDrawer;
