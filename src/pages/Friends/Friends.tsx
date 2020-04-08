import React from "react";
import { useSelector } from "react-redux";

// Components
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { FriendBox } from "../../components/FriendBox/FriendBox";
import { CenteredCard } from "../../components/CenteredCard/CenteredCard";
import FindUser from "../../components/FindUser/FindUser";

// MUI
import { Box, Typography, Button, List } from "@material-ui/core";

// Types
import { StateInterface, User } from "../../interfaces/interfaces";

// Images
import Subscriptions from "../../img/subscripions.svg";
import { Search } from "@material-ui/icons";
import InvitationBox from "../../components/InvitationBox/InvitationBox";

export const Friends: React.FC = () => {
    const friendsList = useSelector((state: StateInterface) => state.friends);

    const findUserRef = React.createRef<HTMLInputElement>();

    const handleSendInvitation = (user: User) => {
        console.log(user);
    };

    const handleClickedSearchForFriends = () => {
        console.log("searching in");
        findUserRef!.current!.focus();
        findUserRef!.current!.scrollIntoView({
            behavior: "smooth",
            inline: "center",
        });
    };

    return (
        <PageWrapper>
            <Typography variant="h2" align="center">
                Znajomi
            </Typography>
            <CenteredCard>
                <Typography variant="h4" align="center">
                    Zaproszenia
                </Typography>
                <List>
                    <InvitationBox
                        _id="124"
                        username="Helenka"
                        email="helenka@gmail.com"
                        invited={true}
                    />
                    <InvitationBox
                        _id="124"
                        username="Helenka"
                        email="helenka@gmail.com"
                        invited={false}
                    />
                </List>
            </CenteredCard>
            <CenteredCard padding={6}>
                <Typography variant="h4" align="center">
                    Zaproś znajomych
                </Typography>
                <FindUser
                    handleUserClicked={handleSendInvitation}
                    removedFromResults={friendsList}
                    ref={findUserRef}
                />
            </CenteredCard>
            <CenteredCard>
                <Typography variant="h4" align="center">
                    Twoi znajomi
                </Typography>
                <Box
                    textAlign="center"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    margin="2rem auto"
                >
                    {friendsList && friendsList.length > 0 ? (
                        <List>
                            {friendsList.map((friend) => (
                                <FriendBox
                                    _id={friend._id}
                                    username={friend.username}
                                    email={friend.email}
                                />
                            ))}
                        </List>
                    ) : (
                        <>
                            <Typography style={{ opacity: "0.5" }}>
                                Nie masz jeszcze żadnych znajomych
                            </Typography>
                            <img
                                alt=""
                                src={Subscriptions}
                                style={{
                                    width: "20%",
                                    maxWidth: "180px",
                                    opacity: "0.5",
                                    margin: "2rem",
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Search />}
                                onClick={handleClickedSearchForFriends}
                            >
                                Szukaj znajomych
                            </Button>
                        </>
                    )}
                </Box>
            </CenteredCard>
        </PageWrapper>
    );
};
