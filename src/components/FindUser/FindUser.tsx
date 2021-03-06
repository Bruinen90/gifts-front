import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

// Styles
import * as Styled from "./stylesFindUser";

// MUI
import {
    Box,
    CircularProgress,
    TextField,
    Typography,
} from "@material-ui/core";
import { Search, SentimentVeryDissatisfied, Block } from "@material-ui/icons";

// Components
import { UsersList } from "../UsersList/UsersList";

// Types
import { User, SearchState, UsersListType } from "../../types/User";
import { State } from "../../types/State";

interface FindUserProps {
    handleUserClicked: (user: User) => void;
    removedFromResults: User[] | undefined;
    header?: string;
    alreadyOnListError?: string;
}

export const FindUser = React.forwardRef(
    (
        {
            handleUserClicked,
            removedFromResults,
            header,
            alreadyOnListError,
        }: FindUserProps,
        ref
    ) => {
        const loggedUserId = useSelector((state: State) => state.auth._id);
        const [searchPhrase, setSearchPhrase] = useState("");
        const [searchResults, setSearchResults] = useState<UsersListType>([]);
        const [searchState, setSearchState] = useState<SearchState>(
            "too-short"
        );
        const [searchBoxOutput, setSearchBoxOutput] = useState<any>();

        const onStopTyping = useCallback(async () => {
            if (searchPhrase.length < 3) {
                setSearchState("too-short");
            } else {
                setSearchState("loading");
                const graphqlQuery = {
                    query: `
                    {findUser(searchPhrase: "${searchPhrase}") { _id username email }}
                `,
                };
                try {
                    const response = await axios.post("graphql", graphqlQuery);
                    const foundUsers: User[] = response.data.data.findUser;
                    const filteredUsers = removedFromResults
                        ? foundUsers.filter(
                              (user) =>
                                  !removedFromResults.some(
                                      (removedUser) =>
                                          removedUser._id === user._id
                                  )
                          )
                        : foundUsers;
                    if (filteredUsers.length > 0) {
                        setSearchResults(filteredUsers);
                        setSearchState("display-results");
                    } else if (
                        foundUsers.length > 0 &&
                        (foundUsers.length !== 1 ||
                            foundUsers[0]._id !== loggedUserId)
                    ) {
                        setSearchState("results-already-added");
                    } else {
                        setSearchState("no-results");
                    }
                } catch (err) {
                    console.log(err);
                    setSearchState("error");
                }
            }
        }, [loggedUserId, searchPhrase]);

        useEffect(() => {
            if (searchResults.length === 0) {
                setSearchState("no-results");
            }
        }, [searchResults]);

        useEffect(() => {
            let typingTimeout = 0;
            window.clearTimeout(typingTimeout);
            typingTimeout = window.setTimeout(onStopTyping, 350);
            return () => window.clearTimeout(typingTimeout);
        }, [onStopTyping, searchPhrase]);

        const handleInputChange = (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            setSearchPhrase(event.target.value);
        };

        useEffect(() => {
            setSearchResults((prev: UsersListType) => {
                if (!removedFromResults) {
                    return prev;
                }
                return prev.filter(
                    (user) =>
                        !removedFromResults.some(
                            (removedUser) => removedUser._id === user._id
                        )
                );
            });
        }, [removedFromResults]);

        useEffect(() => {
            switch (searchState) {
                case "error":
                    setSearchBoxOutput(
                        <Typography>
                            Wystąpił błąd, poczekaj chwilę i spróbuj ponownie
                        </Typography>
                    );
                    break;
                case "too-short":
                    setSearchBoxOutput(
                        <>
                            <Search fontSize="large" />
                            <Typography>Wpisz co najmniej 3 znaki</Typography>
                        </>
                    );
                    break;
                case "loading":
                    setSearchBoxOutput(<CircularProgress />);
                    break;
                case "no-results":
                    setSearchBoxOutput(
                        <>
                            <Block fontSize="large" />
                            <Typography align="center">
                                Nie odnaleziono żadnego użytkownika
                            </Typography>
                        </>
                    );
                    break;
                case "results-already-added":
                    setSearchBoxOutput(
                        <>
                            <SentimentVeryDissatisfied fontSize="large" />
                            <Typography align="center">
                                {alreadyOnListError
                                    ? alreadyOnListError
                                    : `Wszyscy znalezieni użytkownicy zostali już przez
							Ciebie wybrani`}
                            </Typography>
                        </>
                    );
                    break;
                case "display-results":
                    setSearchBoxOutput(
                        <UsersList
                            usersList={searchResults}
                            handleUserClicked={handleUserClicked}
                            listType="addingUsers"
                        />
                    );
            }
        }, [alreadyOnListError, handleUserClicked, searchResults, searchState]);
        return (
            <Box display="flex" flexDirection="column">
                {header && (
                    <Typography
                        variant="h6"
                        component="h6"
                        style={{ marginTop: "1rem" }}
                    >
                        {header}
                    </Typography>
                )}
                <TextField
                    label="Nazwa użytkownika lub email"
                    onChange={handleInputChange}
                    value={searchPhrase}
                    // Chrome ignores "off" so "nope" :-)
                    autoComplete="nope"
                    inputRef={ref}
                />
                {/* Search results box */}
                <Styled.SearchResultsBox searchState={searchState}>
                    {searchBoxOutput}
                </Styled.SearchResultsBox>
            </Box>
        );
    }
);
