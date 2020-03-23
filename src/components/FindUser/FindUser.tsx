import React, { useState, useEffect } from "react";
import axios from "axios";

// Styles
import * as Styled from "./stylesFindUser";

// MUI
import { CircularProgress, TextField, Typography } from "@material-ui/core";

// Icons
import { Search } from "@material-ui/icons";

// Types
import { User, SearchState, UsersListType } from "../../interfaces/interfaces";
import UsersList from "../UsersList/UsersList";

interface FindUserProps {
    handleAddUserToDraw: (user: User) => void;
    removedFromResults: User[];
}

const FindUser = ({
    handleAddUserToDraw,
    removedFromResults
}: FindUserProps) => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [searchResults, setSearchResults] = useState<UsersListType>([]);
    const [searchState, setSearchState] = useState<SearchState>("too-short");
    const [searchBoxOutput, setSearchBoxOutput] = useState<any>();

    let typingTimeout: number;
    const onStopTyping = async () => {
        if (searchPhrase.length < 3) {
            setSearchState("too-short");
        } else {
            setSearchState("loading");
            const graphqlQuery = {
                query: `
                    {findUser(searchPhrase: "${searchPhrase}") { _id username email }}
                `
            };
            try {
                const response = await axios.post("graphql", graphqlQuery);
                const foundUsers : User[] = response.data.data.findUser;
                const filteredUsers = foundUsers.filter(
                    user =>
                        !removedFromResults.some(
                            removedUser => removedUser._id === user._id
                        )
                );
                if (filteredUsers.length > 0) {
                    setSearchResults(filteredUsers);
                    setSearchState("display-results");
                } else {
                    setSearchState("no-results");
                }
            } catch (err) {
                console.log(err.response.data.errors[0]);
                setSearchState("error");
            }
        }
    };
    useEffect(() => {
        if (searchResults.length === 0) {
            setSearchState("no-results");
        }
    }, [searchResults]);

    useEffect(() => {
        window.clearTimeout(typingTimeout);
        typingTimeout = window.setTimeout(onStopTyping, 700);
        return () => window.clearTimeout(typingTimeout);
    }, [searchPhrase]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPhrase(event.target.value);
    };

    useEffect(() => {
        setSearchResults((prev: UsersListType) =>
            prev.filter(
                user =>
                    !removedFromResults.some(
                        removedUser => removedUser._id === user._id
                    )
            )
        );
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
                    <Typography>Nie znaleziono żadnego użytkownika</Typography>
                );
                break;
            case "display-results":
                setSearchBoxOutput(
                    <UsersList
                        usersList={searchResults}
                        handleUserClicked={handleAddUserToDraw}
                        listType="addingUsers"
                    />
                );
        }
    }, [handleAddUserToDraw, searchResults, searchState]);
    return (
        <>
            <Typography
                variant="h6"
                component="h6"
                style={{ marginTop: "1rem" }}
            >
                Dodaj uczestników
            </Typography>
            <TextField
                label="Nazwa użytkownika lub email"
                onChange={handleInputChange}
                value={searchPhrase}
            />
            {/* Search results box */}
            <Styled.SearchResultsBox searchState={searchState}>
                {searchBoxOutput}
            </Styled.SearchResultsBox>
        </>
    );
};
export default FindUser;
