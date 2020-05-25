import React from "react";

// MUI
import {
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    ListItem,
} from "@material-ui/core";
import { PersonAdd, PersonAddDisabled } from "@material-ui/icons";

// Styles
import * as Styled from "./stylesUsersList";

// Components
import { LoadingOverlay } from "../LoadingOverlay/LoadingOverlay";

// Types
import { UsersListType, User, UsersListTypesType } from "../../types/User";

interface UserSearchResultsProps {
    usersList: UsersListType;
    listType: UsersListTypesType;
    handleUserClicked: (user: User) => void;
}

export const UsersList: React.FC<UserSearchResultsProps> = ({
    usersList,
    handleUserClicked,
    listType,
}) => (
    <Styled.UsersList
        dense={true}
        style={{ width: "100%" }}
        disablePadding
        listType={listType}
    >
        {usersList.length > 0 && <Divider />}
        {(usersList as User[]).map((user: User) => (
            <React.Fragment key={user._id}>
                <ListItem
                    button
                    onClick={() => handleUserClicked(user)}
                    style={{ position: "relative" }}
                >
                    <LoadingOverlay recordId={user._id} indicatorSize={20} />
                    <ListItemText
                        primary={user.username}
                        secondary={user.email}
                    />
                    <ListItemSecondaryAction>
                        {listType === "addingUsers" ? (
                            <PersonAdd color="primary" />
                        ) : (
                            <PersonAddDisabled />
                        )}
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
            </React.Fragment>
        ))}
    </Styled.UsersList>
);
