import React from "react";
import { Link } from "react-router-dom";

// Components
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

interface NavigationItemProps {
    target: string;
    icon?: JSX.Element;
    text: string;
    hideDrawer?: () => void;
}

const NavigationItem = ({
    target,
    icon,
    text,
    hideDrawer,
}: NavigationItemProps) => (
    <Link
        to={target}
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={hideDrawer}
    >
        <ListItem button style={{paddingLeft: "0.8vw", paddingRight: "0.8vw"}}>
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

export default NavigationItem;
