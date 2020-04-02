import React, { useState } from "react";
import { useSelector } from "react-redux";

// Types
import { StateInterface } from "../../interfaces/interfaces";

// MUI
import { AppBar, Box, IconButton, Theme } from "@material-ui/core";
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
    const minMediumScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.up("md")
    );

    const username = useSelector((state: StateInterface) => state.username);

    const [navOpened, setNavOpened] = useState(false);
    const handleToggleDrawer = () => {
        setNavOpened(prev => !prev);
    };
    return (
        <AppBar position="sticky">
            <Styled.ToolbarCont>
                {!minMediumScreen ? (
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
                            userLoggedIn={username !== undefined}
                        />
                    </>
                ) : (
                    <LogoBox />
                )}
                <Box display="flex" alignItems="center">
                    {minMediumScreen && (
                        <NavigationList
                            view="horizontal"
                            userLoggedIn={username !== undefined}
                        />
                    )}
                    <SignInUpOut username={username} />
                </Box>
            </Styled.ToolbarCont>
        </AppBar>
    );
};
export default NavBar;
