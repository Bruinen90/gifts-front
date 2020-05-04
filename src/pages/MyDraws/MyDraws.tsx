import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";

// MUI
import {
    Typography,
    Box,
    Grid,
    Snackbar,
    Card,
    CircularProgress,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

// Components
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import DrawRow from "../../components/DrawRow/DrawRow";

// Interfaces
import { State } from "../../types/State";
import { DrawInterface } from "../../types/Draw";
import { User } from "../../types/User";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

const MyDraws: React.FC = () => {
    const location = useLocation();
    const [usersDraws, userId, shoppingList] = useSelector((state: State) => [
        state.draw.usersDraws,
        state.auth._id,
        state.wish.shoppingList,
    ]);
    const loadingState = useSelector((state: State) => state.loading);
    const dispatch = useDispatch();

    // Fetching all draws
    useEffect(() => {
        dispatch({
            type: "WATCH_GET_USER_DRAWS_LIST",
            payload: { userId: userId },
        });
    }, [dispatch, userId, usersDraws]);

    // Snackbar
    const [snackbar, setSnackbar] = useState({ opened: false, message: "" });

    const handleCloseSnackbar = () => {
        setSnackbar({ opened: false, message: "" });
    };

    // Create new draw snackbar
    useEffect(() => {
        const locState = location.state as {
            drawTitle?: string;
            edit?: boolean;
        };
        if (locState && locState.drawTitle) {
            setSnackbar({
                opened: true,
                message: `Poprawnie ${
                    locState.edit
                        ? "zapisano zmiany w losowaniu "
                        : "utworzono losowanie "
                } ${locState.drawTitle}`,
            });
        }
    }, [location.state]);

    // Delete draw
    const dispatchDeleteDraw = (drawId: string, drawTitle: string) => {
        dispatch({
            type: "DELETE_DRAW_WATCHER",
            payload: { drawId: drawId },
        });
        setSnackbar({
            opened: true,
            message: `Poprawnie usunięto losowanie ${drawTitle}`,
        });
    };

    // Exit draw
    const dispatchExitDraw = (drawId: string, drawTitle: string) => {
        dispatch({
            type: "EXIT_DRAW_WATCHER",
            payload: { drawId: drawId },
        });
        setSnackbar({
            opened: true,
            message: `Opuszczono losowanie ${drawTitle}`,
        });
    };

    // Run draw
    const dispatchRunDraw = (drawId: string, drawTitle: string) => {
        dispatch({ type: "RUN_DRAW_WATCHER", payload: { drawId: drawId } });
        setSnackbar({
            opened: true,
            message: `Losowanie ${drawTitle} odbyło się poprawnie`,
        });
    };

    // Archive draw
    const dispatchArchiveDraw = (drawId: string, drawTitle: string) => {
        dispatch({
            type: "ARCHIVE_DRAW_WATCHER",
            payload: { drawId: drawId },
        });
        setSnackbar({
            opened: true,
            message: `Oznaczono losowanie ${drawTitle} jako archiwalne`,
        });
    };
    return (
        <>
            <PageWrapper>
                <Typography variant="h4" component="h2" align="center">
                    Moje losowania
                </Typography>
                <LoadingSpinner type="general">
                    <Grid container spacing={2}>
                        {loadingState.loading &&
                            loadingState.category === "draws" &&
                            loadingState.type === "new-record" && (
                                <Grid item xs={12} lg={6}>
                                    <Card
                                        style={{
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <CircularProgress size={90} />
                                    </Card>
                                </Grid>
                            )}

                        {usersDraws &&
                            usersDraws.map((draw: DrawInterface) => {
                                if (draw.results) {
                                    return (
                                        <DrawRow
                                            title={draw.title}
                                            date={draw.date as Date}
                                            _id={draw._id}
                                            key={draw._id}
                                            results={draw.results}
                                            creator={draw.creator as User}
                                            participants={
                                                draw.participants as [User]
                                            }
                                            adminMode={
                                                draw.creator._id === userId
                                            }
                                            price={draw.price}
                                            deleteDraw={dispatchDeleteDraw}
                                            exitDraw={dispatchExitDraw}
                                            runDraw={dispatchRunDraw}
                                            archiveDraw={dispatchArchiveDraw}
                                            status={draw.status}
                                            gifts={shoppingList?.filter(
                                                (listItem) =>
                                                    listItem.forDraw &&
                                                    listItem.forDraw ===
                                                        draw._id
                                            )}
                                        />
                                    );
                                } else {
                                    return (
                                        <DrawRow
                                            title={draw.title}
                                            date={draw.date as Date}
                                            _id={draw._id}
                                            key={draw._id}
                                            creator={draw.creator as User}
                                            participants={
                                                draw.participants as [User]
                                            }
                                            adminMode={
                                                draw.creator._id === userId
                                            }
                                            price={draw.price}
                                            deleteDraw={dispatchDeleteDraw}
                                            exitDraw={dispatchExitDraw}
                                            runDraw={dispatchRunDraw}
                                            archiveDraw={dispatchArchiveDraw}
                                            status={draw.status}
                                        />
                                    );
                                }
                            })}
                    </Grid>
                </LoadingSpinner>
            </PageWrapper>
            {/* Confirmation snackbar when redirected from creating new draw */}
            <Snackbar
                open={snackbar.opened}
                autoHideDuration={7000}
                onClose={handleCloseSnackbar}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseSnackbar}
                    severity="success"
                >
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </>
    );
};
export default MyDraws;
