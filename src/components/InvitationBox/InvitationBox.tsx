import React from "react";
import { useDispatch } from "react-redux";
import * as watcherTypes from "../../store/actions/watcherTypes";

// MUI
import { ListItem, Grid, ListItemText, Button } from "@material-ui/core";
import { Close, Check } from "@material-ui/icons";

interface InvitationBoxProps {
    _id: string;
    username: string;
    email: string;
    invited: boolean;
}

const InvitationBox: React.FC<InvitationBoxProps> = ({
    username,
    email,
    invited,
}) => {
    const dispatch = useDispatch();
    const handleAcceptInvitation = () => {
        dispatch({
            type: watcherTypes.WATCH_SET_INVITATION_DECISION,
            payload: { decision: "accept" },
        });
    };

    const handleRejectInvitation = () => {
        dispatch({
            type: watcherTypes.WATCH_SET_INVITATION_DECISION,
            payload: { decision: "reject" },
        });
    };
    return (
        <ListItem>
            <Grid container alignItems="center">
                <Grid item xs={12} sm={6}>
                    <ListItemText primary={username} secondary={email} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                >
                    {invited ? (
                        <>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleAcceptInvitation}
                                startIcon={<Check />}
                                size="small"
                                style={{ marginRight: "8px" }}
                            >
                                Akceptuj
                            </Button>
                            <Button
                                color="secondary"
                                onClick={handleRejectInvitation}
                                startIcon={<Close />}
                                size="small"
                            >
                                Odrzuć
                            </Button>
                        </>
                    ) : (
                        <Button
                            color="secondary"
                            startIcon={<Close />}
                            size="small"
                        >
                            Anuluj
                        </Button>
                    )}
                </Grid>
            </Grid>
        </ListItem>
    );
};
export default InvitationBox;
