import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as watcherTypes from "../../store/actions/watcherTypes";

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
    const dispatch = useDispatch();
    const friendsList = useSelector((state: StateInterface) => state.friends);
    const invitations = useSelector(
        (state: StateInterface) => state.invitations
    );

    const findUserRef = React.createRef<HTMLInputElement>();

    const loggedUser: User = useSelector((state: StateInterface) => ({
        _id: state.userId!,
        username: state.username!,
        email: state.email!,
    }));

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
    if (invitations) {
        if (invitations.received) {
            const alreadyInvited = invitations.received.map(
                (invitation) => invitation.sender
            );
            unInvitable = [...unInvitable, ...alreadyInvited];
        }
        if (invitations.sent) {
            const alreadyInvited = invitations.sent.map(
                (invitation) => invitation.receiver
            );
            unInvitable = [...unInvitable, ...alreadyInvited];
        }
    }

    useEffect(() => {
        console.log("rerender");
    });

    return (
        <PageWrapper>
            <Typography variant="h2" align="center">
                Znajomi
            </Typography>
            {invitations &&
                ((invitations.received && invitations.received.length > 0) ||
                    (invitations.sent && invitations.sent.length < 0)) && (
                    <CenteredCard>
                        <Typography variant="h4" align="center">
                            Zaproszenia
                        </Typography>
                        {invitations.received && (
                            <List>
                                {invitations.received.map((invitation) => (
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
                        {invitations.sent && (
                            <List>
                                {invitations.sent.map((invitation) => (
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
