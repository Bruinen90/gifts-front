import React, { useState } from "react";
import { useHistory } from "react-router";

// Date-fns
import { format } from "date-fns";
import plLocale from "date-fns/locale/pl";

// Mui
import {
    Grid,
    IconButton,
    Menu,
    MenuItem,
    ListItemText,
    ListItemIcon,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    List,
    ListItem,
} from "@material-ui/core";

// Icons
import {
    MoreVert,
    Edit,
    Delete,
    ExitToApp,
    Event,
    People,
    VpnKey,
    MonetizationOn,
} from "@material-ui/icons";

// Types
import { DrawRowProps } from "../../types/Draw";

// Components
import DrawResults from "../DrawResults/DrawResults";
import { ButtonWithLoader } from "../ButtonWithLoader/ButtonWithLoader";

const DrawRow: React.FC<DrawRowProps> = ({
    title,
    date,
    _id,
    results,
    gifts,
    creator,
    adminMode,
    price,
    participants,
    deleteDraw,
    exitDraw,
    runDraw,
    archiveDraw,
    status,
}) => {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    type DrawFunction = (event: React.MouseEvent<HTMLElement>) => void;

    interface ConfirmationDialogInterface {
        opened: boolean;
        title: string;
        description: string;
        acceptText: string;
        cancelText: string;
        confirmFunction?: DrawFunction;
    }

    const [confirmationDialog, setConfirmationDialog] = useState<
        ConfirmationDialogInterface
    >({
        opened: false,
        title: "Czy na pewno chcesz wykonać wybraną akcję?",
        description: "Może to doprowadzić do nieodwracalnych skutków",
        acceptText: "Akceptuj",
        cancelText: "Anuluj",
    });

    const openConfirmationDialog = ({
        title,
        description,
        confirmFunction,
        acceptText,
        cancelText,
    }: {
        title: string;
        description: string;
        cancelText: string;
        acceptText: string;
        confirmFunction: DrawFunction;
    }) => {
        setConfirmationDialog({
            opened: true,
            title: title,
            description: description,
            confirmFunction: confirmFunction,
            cancelText: cancelText,
            acceptText: acceptText,
        });
    };

    const handleCloseConfirmationDialog = () => {
        setConfirmationDialog({
            ...confirmationDialog,
            opened: false,
        });
    };

    const handleDeleteDraw = () => {
        const confirmed = () => {
            deleteDraw(_id as string, title);
            handleCloseConfirmationDialog();
        };

        openConfirmationDialog({
            title: "Czy na pewno chcesz usunąć losowanie?",
            description:
                "Po usunięciu losowanie nie będzie możliwości jego przywrócenia, wszystkie związane z nim ustawienia oraz informacjie zostaną bezpowrotnie utracone",
            acceptText: "Usuń",
            cancelText: "Anuluj",
            confirmFunction: confirmed,
        });
    };

    const handleExitDraw = () => {
        const confirmed = () => {
            exitDraw(_id as string, title);
            handleCloseConfirmationDialog();
        };
        openConfirmationDialog({
            title: "Czy na pewno chcesz opuścić losowanie?",
            description:
                "Po opuszczeniu losowania nie ma możliwości powrotu innej niż dodanie użytkownika ponownie przez twórcę losowania",
            acceptText: "Opuść losowanie",
            cancelText: "Anuluj",
            confirmFunction: confirmed,
        });
    };

    const handleRunDraw = () => {
        const confirmed = () => {
            runDraw(_id!, title);
            handleCloseConfirmationDialog();
        };
        openConfirmationDialog({
            title: "Czy na pewno chcesz przeprowadzić losowanie teraz?",
            description:
                "Po przeprowadzeniu losowanie wszyscy jego uczestnicy poznają jego wyniki i nie będzie możliwości jego edycji, w tym dodania kolejnych uczestników",
            acceptText: "Przeprowadź losowanie teraz",
            cancelText: "Anuluj",
            confirmFunction: confirmed,
        });
    };

    const handleArchiveDraw = () => {
        const confirmed = () => {
            archiveDraw(_id!, title);
            handleCloseConfirmationDialog();
        };
        openConfirmationDialog({
            title: "Czy na pewno chcesz oznaczyć losowanie jako archiwalne?",
            description:
                "Zaleca się oznaczenie losowania jako archwialnego dopiero po rozdaniu prezentów. Losowania archiwalne są widoczne dla uczestników, ale nie ma możliwości sprawdzania listy życzeń ani oznaczania deklaracji zakupu.",
            acceptText: "Oznacz losowanie jako archiwalne",
            cancelText: "Anuluj",
            confirmFunction: confirmed,
        });
    };

    const handleEditDraw = () => {
        history.push("/edytuj-losowanie", {
            editing: true,
            originalData: {
                _id: _id,
                title: title,
                price: price,
                participants: participants,
                date: date,
            },
        });
    };

    return (
        <Grid item xs={12} lg={6}>
            <Card
                style={{
                    height: "100%",
                    opacity: status === "archived" ? 0.5 : 1,
                }}
            >
                <CardHeader
                    title={title}
                    action={
                        adminMode &&
                        !results && (
                            <div>
                                <IconButton
                                    edge="end"
                                    aria-label="dodaj uczetników/edytuj/usuń losowanie"
                                    onClick={handleOpenMenu}
                                >
                                    <MoreVert fontSize="large" />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleEditDraw}>
                                        <ListItemIcon>
                                            <Edit />
                                        </ListItemIcon>
                                        <ListItemText>
                                            Edytuj losowanie
                                        </ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={handleDeleteDraw}>
                                        <ListItemIcon>
                                            <Delete />
                                        </ListItemIcon>
                                        <ListItemText>
                                            Usuń losowanie
                                        </ListItemText>
                                    </MenuItem>
                                </Menu>
                            </div>
                        )
                    }
                />
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <Event />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={format(date, "d MMMM yyyy", {
                                            locale: plLocale,
                                        })}
                                        secondary="data losowania"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <People />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={participants.length}
                                        secondary="liczba uczestników"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <MonetizationOn />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={price + " zł"}
                                        secondary="maksymalna cena prezentu"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <VpnKey />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={creator.username}
                                        secondary="administrator"
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                        {results !== undefined && (
                            <Grid item xs={12} md={6}>
                                <DrawResults
                                    _id={results._id}
                                    username={results.username}
                                    drawId={_id!}
                                    gifts={gifts}
                                    drawStatus={status}
                                />
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
                {status !== "archived" && (
                    <CardActions>
                        {results ? (
                            <ButtonWithLoader
                                onClick={handleArchiveDraw}
                                color="secondary"
                                loadingCategory="draws"
                                loadingType="edited-record"
                                recordId={_id}
                                style={{ minWidth: "120px" }}
                            >
                                Archiwizuj
                            </ButtonWithLoader>
                        ) : adminMode ? (
                            <>
                                <ButtonWithLoader
                                    onClick={handleRunDraw}
                                    variant="contained"
                                    color="primary"
                                    loadingCategory="draws"
                                    loadingType="edited-record"
                                    recordId={_id}
                                    operationType="accept"
                                    style={{ minWidth: "120px" }}
                                >
                                    Losuj teraz
                                </ButtonWithLoader>
                                <Button
                                    startIcon={<Edit />}
                                    color="primary"
                                    onClick={handleEditDraw}
                                >
                                    Edytuj
                                </Button>
                                <ButtonWithLoader
                                    startIcon={<Delete />}
                                    color="secondary"
                                    onClick={handleDeleteDraw}
                                    loadingCategory="draws"
                                    loadingType="edited-record"
                                    recordId={_id}
                                    operationType="cancel"
                                    style={{ minWidth: "120px" }}
                                >
                                    Usuń
                                </ButtonWithLoader>
                            </>
                        ) : (
                            <Button
                                startIcon={<ExitToApp />}
                                color="secondary"
                                onClick={handleExitDraw}
                            >
                                Wypisz się
                            </Button>
                        )}
                    </CardActions>
                )}
            </Card>
            {/* Delete draw confirmation box */}
            <Dialog
                open={confirmationDialog.opened}
                onClose={handleCloseConfirmationDialog}
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {confirmationDialog.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {confirmationDialog.description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={confirmationDialog.confirmFunction!}
                        color="primary"
                    >
                        {confirmationDialog.acceptText}
                    </Button>
                    <Button
                        onClick={handleCloseConfirmationDialog}
                        color="secondary"
                    >
                        {confirmationDialog.cancelText!}
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};
export default DrawRow;
