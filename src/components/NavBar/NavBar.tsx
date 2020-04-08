import React, { useState } from "react";
import { useSelector } from "react-redux";

// Types
import { StateInterface } from "../../interfaces/interfaces";

// MUI
import { AppBar, Box, IconButton, Theme, Hidden } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";

//Styles
import * as Styled from "./stylesNavBar";

// Components
import NavigationDrawer from "../NavigationDrawer/NavigationDrawer";
import SignInUpOut from "../SignInUpOut/SignInUpOut";
import NavigationList from "../NavigationList/NavigationList";
import LogoBox from "../LogoBox/LogoBox";

const NavBar = () => {
    const minScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.up("lg")
    );

    const username = useSelector((state: StateInterface) => state.username);

    const [navOpened, setNavOpened] = useState(false);
    const handleToggleDrawer = () => {
        setNavOpened((prev) => !prev);
    };
    return (
        <AppBar position="sticky">
            <Styled.ToolbarCont>
                <LogoBox />

                <Box display="flex" alignItems="center">
                    {minScreen ? (
                        <NavigationList
                            view="horizontal"
                            userLoggedIn={username !== undefined}
                        />
                    ) : (
                        <>
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
                                username={username}
                            />
                        </>
                    )}
                    <Hidden mdDown>
                        <SignInUpOut username={username} variant="horizontal" />
                    </Hidden>
                </Box>
            </Styled.ToolbarCont>
        </AppBar>
    );
};
export default NavBar;
