import React from "react";

// MUI
import {
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    ListItem
} from "@material-ui/core";

// Icons
import { PersonAdd, PersonAddDisabled } from "@material-ui/icons";

// Types
import {
    UsersListType,
    User,
    UsersListTypesType
} from "../../interfaces/interfaces";

// Styles
import * as Styled from "./stylesUsersList";

interface UserSearchResultsProps {
    usersList: UsersListType;
    listType: UsersListTypesType;
    handleUserClicked: (user: User) => void;
}

const UsersList = ({
    usersList,
    handleUserClicked,
    listType
}: UserSearchResultsProps) => (
    <Styled.UsersList
        dense={true}
        style={{ width: "100%" }}
        disablePadding
        listType={listType}
    >
        {usersList.length > 0 && <Divider />}
        {(usersList as User[]).map((user: User) => (
            <React.Fragment key={user._id}>
                <ListItem button onClick={() => handleUserClicked(user)}>
                    <ListItemText
                        primary={user.username}
                        secondary={user.email}
                    />
                    <ListItemSecondaryAction>
                        {listType === "addingUsers" ? (
                            <PersonAdd />
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

export default UsersList;
