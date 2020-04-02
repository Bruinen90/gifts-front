import React, { useState } from "react";
import { useSelector } from "react-redux";

// Types
import { StateInterface } from "../../interfaces/interfaces";

// MUI
import { AppBar, Box, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

//Styles
import * as Styled from "./stylesNavBar";

// Components
import NavigationDrawer from "../NavigationDrawer/NavigationDrawer";
import SignInUpOut from "../SignInUpOut/SignInUpOut";
import NavigationList from "../NavigationList/NavigationList";

const NavBar = () => {
    const username = useSelector((state: StateInterface) => state.username);

    const [navOpened, setNavOpened] = useState(false);
    const handleToggleDrawer = () => {
        setNavOpened(prev => !prev);
    };
    return (
        <AppBar position="sticky">
            <Styled.ToolbarCont>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleToggleDrawer}
                >
                    <MenuIcon />
                </IconButton>
                <NavigationDrawer
                    opened={navOpened}
                    toggleNavigationDrawer={handleToggleDrawer}
                    userLoggedIn={username !== undefined}
                />
                <Box display="flex" alignItems="center">
                    <NavigationList
                        view="horizontal"
                        userLoggedIn={username !== undefined}
                    />
                    <SignInUpOut username={username} />
                </Box>
            </Styled.ToolbarCont>
        </AppBar>
    );
};
export default NavBar;
