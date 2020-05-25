import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as watcherTypes from "../../store/actions/watcherTypes";

// Components
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { FriendBox } from "../../components/FriendBox/FriendBox";
import { CenteredCard } from "../../components/CenteredCard/CenteredCard";
import { FindUser } from "../../components/FindUser/FindUser";
import { InvitationBox } from "../../components/InvitationBox/InvitationBox";

// MUI
import {
    Box,
    Typography,
    Button,
    List,
    CircularProgress,
} from "@material-ui/core";

// Images
import Subscriptions from "../../img/subscripions.svg";
import { Search } from "@material-ui/icons";

// Types
import { State } from "../../types/State";
import { User } from "../../types/User";

export const Friends: React.FC = () => {
    const dispatch = useDispatch();
    const friendsList = useSelector((state: State) => state.friends.friends);
    const loggedUser = useSelector((state: State) => state.auth as User);
    const loadingStatus = useSelector((state: State) => state.loading);

    const loadingFriends =
        loadingStatus.category === "friends" &&
        loadingStatus.type === "fetching-records";

    const [
        sentInvitations,
        receivedInvitations,
    ] = useSelector((state: State) => [
        state.friends.invitations?.sent,
        state.friends.invitations?.received,
    ]);

    const findUserRef = React.createRef<HTMLInputElement>();

    const handleSendInvitation = (user: User) => {
        dispatch({
            type: watcherTypes.WATCH_SEND_INVITATION,
            payload: { invitedUser: user },
        });
    };

    const handleClickedSearchForFriends = () => {
        findUserRef!.current!.focus();
        findUserRef!.current!.scrollIntoView({
            behavior: "smooth",
            inline: "center",
        });
    };

    // Move to useEffect!
    let unInvitable = [loggedUser];
    if (friendsList) {
        unInvitable = [loggedUser, ...friendsList];
    }
    if (
        (receivedInvitations && receivedInvitations.length > 0) ||
        (sentInvitations && sentInvitations.length > 0)
    ) {
        if (receivedInvitations) {
            const alreadyInvited = receivedInvitations.map(
                (invitation) => invitation.sender
            );
            unInvitable = [...unInvitable, ...alreadyInvited];
        }
        if (sentInvitations) {
            const alreadyInvited = sentInvitations.map(
                (invitation) => invitation.receiver
            );
            unInvitable = [...unInvitable, ...alreadyInvited];
        }
    }

    return (
        <PageWrapper>
            <Typography variant="h2" align="center">
                Znajomi
            </Typography>

            {(loadingFriends ||
                ((receivedInvitations || sentInvitations) &&
                    ((receivedInvitations && receivedInvitations.length > 0) ||
                        (sentInvitations && sentInvitations.length > 0)))) && (
                <CenteredCard style={{ textAlign: "center" }}>
                    <Typography variant="h4" align="center">
                        Zaproszenia
                    </Typography>
                    {loadingFriends && (
                        <Box
                            display="flex"
                            justifyContent="center"
                            flex={1}
                            marginY={3}
                        >
                            <CircularProgress size={60} />
                        </Box>
                    )}
                    {receivedInvitations && (
                        <List>
                            {receivedInvitations.map((invitation) => (
                                <InvitationBox
                                    key={invitation._id}
                                    _id={invitation._id}
                                    username={invitation.sender.username}
                                    email={invitation.sender.email!}
                                    invited={true}
                                />
                            ))}
                        </List>
                    )}
                    {sentInvitations && (
                        <List>
                            {sentInvitations.map((invitation) => (
                                <InvitationBox
                                    key={invitation._id}
                                    _id={invitation._id}
                                    username={invitation.receiver.username}
                                    email={invitation.receiver.email!}
                                    invited={false}
                                />
                            ))}
                        </List>
                    )}
                </CenteredCard>
            )}
            <CenteredCard padding={6}>
                <Typography variant="h4" align="center">
                    Zaproś znajomych
                </Typography>
                <FindUser
                    handleUserClicked={handleSendInvitation}
                    removedFromResults={unInvitable}
                    ref={findUserRef}
                    alreadyOnListError="Wszyscy znalezieni użytkownicy są już Twoimi znajomymi lub oczekują na akceptację"
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
                    {loadingFriends ? (
                        <Box
                            display="flex"
                            justifyContent="center"
                            flex={1}
                            marginY={3}
                        >
                            <CircularProgress size={60} />
                        </Box>
                    ) : friendsList && friendsList.length > 0 ? (
                        <List style={{ width: "100%" }}>
                            {friendsList.map((friend) => (
                                <FriendBox
                                    key={friend._id}
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
