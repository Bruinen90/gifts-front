import React from "react";
import { HashLink as Link } from "react-router-hash-link";

// MUI
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

interface NavigationItemProps {
    target: string;
    icon?: JSX.Element;
    text: string;
    hideDrawer?: () => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
    target,
    icon,
    text,
    hideDrawer,
}) => (
    <Link
        to={target}
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={hideDrawer}
    >
        <ListItem
            button
            style={{ paddingLeft: "0.8vw", paddingRight: "0.8vw" }}
        >
            {icon && (
                <ListItemIcon style={{ color: "inherit", minWidth: "35px" }}>
                    {icon}
                </ListItemIcon>
            )}
            <ListItemText
                primaryTypographyProps={{
                    variant: "button",
                    style: { fontSize: "0.8rem" },
                }}
            >
                {text}
            </ListItemText>
        </ListItem>
    </Link>
);
